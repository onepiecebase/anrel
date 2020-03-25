import Command, { CommandInterface } from '@anrel/command'

export default class Version extends Command implements CommandInterface {
  public async exec(): Promise<void> {
    // nothing todo...
  }
}
