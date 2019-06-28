const minimist = require('minimist');

module.exports = () => {
  const args = minimist(process.argv.slice(2));

  let cmd = args._[0] || 'run';

  if (args.version || args.v) {
    cmd = 'version'
  }

  if (args.help || args.h) {
    cmd = 'help'
  }

  switch (cmd) {
    case 'version':
      require('./cmd/version')();
      break;

    case 'help':
      require('./cmd/help')();
      break;

    case 'run':
      require('./cmd/run')(args);
      break;

    default:
      console.error(`"${cmd}" is not a valid command.`)
      break
  }
}
