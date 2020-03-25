import program from 'commander'
import Bootstrap from '@anrel/bootstrap'

const bootstrap = () => {
  const command = new Bootstrap()
  command.exec()
}

program
  .command('bootstrap')
  .description('Link local packages together and install remaining package dependencies')
  .action(bootstrap)
