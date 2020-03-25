import Project from '@anrel/project'
import Logger from '@anrel/logger'
import Git from '@anrel/git'
import Pm from '@anrel/pm'

export default class Command {
  protected logger: Logger
  protected project: Project
  protected git: Git
  protected pm: Pm

  constructor() {
    this.logger = new Logger()
    this.project = new Project()
    this.git = new Git()
    this.pm = new Pm()
  }
}
