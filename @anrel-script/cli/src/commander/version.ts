import program from 'commander'
import Version from '@anrel/version'

const version = () => {
  const command = new Version()
  command.exec()
}

program
  .command('version')
  .description('')
  .action(version)
