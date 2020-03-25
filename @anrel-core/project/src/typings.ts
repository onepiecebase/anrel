export interface ProjectInterface {
  [key: string]: any;
  version: string;
  packagesScope: string[];
  repoURI: string[];
  load: (cwd?: string) => Promise<void>;
  /** 根配置文件路径 */
  rootConfigLoc: string;
  /** 项目根目录路径 */
  rootPath: string;
}
