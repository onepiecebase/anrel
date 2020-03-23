import { cosmiconfig } from 'cosmiconfig'
import log from 'npmlog'
import * as path from 'path'

class Project {
  private explorer: null | ReturnType<typeof cosmiconfig> = null
  private cwd: string = ''

  // TODO: config need interface
  public config: any = {}
  public rootConfigLoc: string = ''
  public rootPath: string = ''

  constructor(cwd) {
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
      this.config = result.config
      this.rootConfigLoc = result.filepath
      this.rootPath = path.dirname(result.filepath)
    } catch (err) {
      throw new Error(err.name)
    }
    log.verbose('rootPath', this.rootPath)
  }

  public get version(): string {
    return this.config.version
  }

  public set version(val: string) {
    this.config.version = this.version
  }

  /**
   * 获取packages域
   */
  public get packageScopes(): string[] {
    return this.config.packages
  }

  /**
   * 获取仓库URI
   */
  public get repoURI() {
    return this.config.repoURI
  }

  // TODO： get root package.json content
}

export default Project
