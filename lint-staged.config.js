const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
const flattenDeep = require('lodash/flattenDeep')
const fromPairs = require('lodash/fromPairs')

const scopeCache = {}

const findScopePaths = async () => {
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

const matchScopes = async (filenames, cache) => {
  if (cache && scopeCache[cache]) {
    return scopeCache[cache]
  }

  const scopePaths = await findScopePaths()
  const folders = Object.keys(scopePaths)

  const scopes = {}
  const discharge = []

  filenames.forEach(filename => {
    const scope = folders.find(folder => filename.search(folder) === 0)
    if (scope) {
      if (!Array.isArray(scopes[scope])) {
        scopes[scope] = []
      }

      scopes[scope].push(filename)
    } else {
      discharge.push(filename)
    }
  })

  const data = { scopes, discharge }
  if (cache) {
    scopeCache[cache] = data
  }

  return data
}

const runEachScope = (command) => {
  return async filenames => {
    const { scopes } = await matchScopes(filenames)
    const commands = Object.keys(scopes).map(name => {
      const packages = scopes[name]
      const prefix = scopePaths[name]
      return `npm run ${command} ${prefix ? `--prefix ${prefix}` : ''} ${packages.join(' ')}`
    })

    return commands.join(' && ')
  }
}

const runDischarge = (command) => {
  return async filenames => {
    const { discharge } = await matchScopes(filenames)
    return `npm run ${command} ${discharge.join(' ')}`
  }
}

const run = (command) => {
  return async (filenames) => {
    const scopeCommand = await runEachScope(command)(filenames)
    const dischargeCommand = await runDischarge(command)(filenames)
    return [scopeCommand, dischargeCommand].filter(Boolean).join(' && ')
  }
}

~(async filenames => {
  const format = run('lint-stage:format')
  const command = await format(filenames)
  console.log([command, `git add ${filenames.join(' ')}`])
})(['/Users/zhongjiahao/Develop/utils/anrel/scripts/lerna/command/add.ts'])

module.exports = {
  '**/*.{md,json,yml}': async filenames => {
    const format = run('lint-stage:format')
    const formatComand = await format(filenames)
    const commands = [formatComand, `git add ${filenames.join(' ')}`]
    console.log(commands)
    return commands
  },
  '**/*.{ts,tsx,d.ts}': async filenames => {
    const lint = run('lint-stage:lint:ts')
    const lintCommand = await lint(filenames)
    const commands = [lintCommand, `git add ${filenames.join(' ')}`]
    console.log(commands)
    return commands
  },
}
