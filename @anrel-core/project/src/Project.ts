import * as path from 'path'
import { cosmiconfig } from 'cosmiconfig'
import log from 'npmlog'

/**
 * 项目类
 */
export default class Project {
  protected explorer: null | ReturnType<typeof cosmiconfig> = null
  protected cwd: string = ''

  public rootConfigLoc: string = ''
  public rootPath: string = ''

  constructor(cwd: string = process.cwd()) {
    this.cwd = cwd
    this.explorer = cosmiconfig('anrel', {
      searchPlaces: ['package.json', 'anrel.json'],
    })
  }

  public async load(cwd?: string) {
    try {
      let result = await this.explorer.search(this.cwd || cwd)
      if (!result) {
        result = {
          config: {},
          filepath: path.resolve(this.cwd || cwd || '.', 'anrel.json'),
        }
      }

      this.rootConfigLoc = result.filepath
      this.rootPath = path.dirname(result.filepath)
    } catch (err) {
      throw new Error(err.name)
    }
    log.verbose('rootPath', this.rootPath)
  }

  // TODO： get root package.json content
}
