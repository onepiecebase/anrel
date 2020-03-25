const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
const flattenDeep = require('lodash/flattenDeep')
const fromPairs = require('lodash/fromPairs')

async function findScopePaths() {
  const rootPath = process.cwd()
  const json = await fs.readJSON(path.join(rootPath, 'lerna.json'))
  const promises = json.packages.map(pattern => {
    return new Promise((resolve, reject) => {
      glob(pattern, { cwd: rootPath }, (error, matches) => {
        error ? reject(error) : resolve(matches)
      })
    })
  })

  const files = await Promise.all(promises).then((...files) => flattenDeep(files))
  const folders = files.filter(file => fs.statSync(file).isDirectory() && fs.existsSync(path.join(file, 'package.json')))
  const packages = folders.map(folder => [path.join(rootPath, folder), folder])
  return fromPairs(packages)
}

function runPrefix(callback) {
  return async filenames => {
    const scopePaths = await findScopePaths()
    const folders = Object.keys(scopePaths)

    const scopes = {}
    filenames.forEach(filename => {
      const scope = folders.find(folder => filename.search(folder) === 0)
      if (!Array.isArray(scopes[scope])) {
        scopes[scope] = []
      }

      scopes[scope].push(filename)
    })

    const commands = Object.keys(scopes).map(name => {
      const packages = scopes[name]
      const prefix = scopePaths[name]
      return callback(prefix, packages)
    })

    return commands.join(' && ')
  }
}

function run(command) {
  return runPrefix((prefix, packages) => {
    return `npm run ${command} ${prefix ? `--prefix ${prefix}` : ''} ${packages.join(' ')}`
  })
}

module.exports = {
  '**/*.{md,json,yml}': async filenames => {
    const format = run('lint-stage:format')
    const command = await format(filenames)
    return [command, `git add ${filenames.join(' ')}`]
  },
  '**/*.{ts,tsx,d.ts}': async filenames => {
    const lint = run('lint-stage:lint:ts')
    const command = await lint(filenames)
    return [command, `git add ${filenames.join(' ')}`]
  },
}
