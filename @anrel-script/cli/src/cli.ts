import program from 'commander'

import './commander/bootstrap'
import './commander/version'
import './commander/publish'

const argv = process.argv
program.parse(argv)
