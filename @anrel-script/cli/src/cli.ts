import program from 'commander'

import './commander/version'
import './commander/bootstrap'

const argv = process.argv
program.parse(argv)
