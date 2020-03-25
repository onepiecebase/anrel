import program from 'commander'
import Publish from '@anrel/publish'

const publish = () => {
  const command = new Publish()
  command.exec()
}

program
  .command('publish')
  .description('Link local packages together and install remaining package dependencies')
  .action(publish)
