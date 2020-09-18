
const chalk = require('chalk');
const speedTest = require('../speedCoreMgmnt');

const speedServices = {};
const statuses = {
  Ping: true,
  Download: false,
  Upload: false,
};

function speedText(speed) {
  let bits = speed * 8;
  const units = ['', 'K', 'M', 'G', 'T'];
  const places = [0, 1, 2, 3, 3];
  let unit = 0;
  while (bits >= 2000 && unit < 4) {
    unit++;
    bits /= 1000;
  }
  return `${bits.toFixed(places[unit])} ${units[unit]}bps`;
}

const options = {};

let paramError = null;
for (let i = 2; i < process.argv.length; i++) {
  console.log("------------------>");
  const arg = process.argv[i];
  const next = process.argv[i + 1];
  if (i >= 2) {
    if (arg === '--help' || arg === '-h') {
      console.log(
        `Usage: ${process
          .argv[1]} [-h|--help] [--accept-license] [--accept-gdpr] [--server-id <id>] [--source-ip <ip>]`
      );
      console.log('-h  --help            Help');
      console.log(
        '    --accept-license  Accept the Ookla EULA, TOS and Privacy policy. '
      );
      console.log('    --accept-gdpr     Accepts the Ookla GDPR terms. ');
      console.log(
        '                      The terms only need to be accepted once.'
      );
      console.log(
        '    --server-id <id>  Test using a specific server by Ookla server ID'
      );
      console.log(
        '    --source-ip <ip>  Test a specific network interface identified by local IP'
      );
      process.exit(0);
    } else if (arg === '--accept-license') {
      options.acceptLicense = true;
    } else if (arg === '--accept-gdpr') {
      options.acceptGdpr = true;
    } else if (arg === '--server-id') {
      if (next !== undefined) {
        i++;
        options.serverId = next;
      } else {
        paramError = 'Error: bad parameters';
      }
    } else if (arg === '--source-ip') {
      if (next !== undefined) {
        i++;
        options.sourceIp = next;
      } else {
        paramError = 'Error: bad parameters';
      }
    }
  }
}
if (paramError) {
  console.error();
  console.error(chalk.red(paramError));
  console.error();
  process.exit(1);
}
//TODO: belove is the event syntax for ping
//  {
//   type: 'ping',
//   timestamp: 2020-09-16T18:14:46.000Z,
//   ping: { jitter: 0, latency: 3.194, progress: 0.2 },
//   progress: 0.017391304347826087
// }
var ping = '';
var download = '';
var upload = '';
const speedDetails = {};
function updateData() {
  ping = statuses.Ping ? statuses.Ping : '';
  download = statuses.Download ? statuses.Download : '';
  upload = statuses.Upload ? statuses.Upload : '';

  speedDetails.ping = ping;
  speedDetails.download = download;
  speedDetails.upload = upload;
  console.log('Ping:', ping, '  Download:', download, '  Upload:', upload);
}

speedServices.speed = async () => {
  try {
    setInterval(updateData, 100);
    await speedTest({
      ...options,
      progress: event => {
        const content = event[event.type] || {};
        switch (event.type) {
          case 'ping':
            statuses.Ping = content.latency.toFixed(1) + ' ms';
            break;
          case 'download':
            statuses.Download = speedText(content.bandwidth);
            break;
          case 'upload':
            statuses.Upload = speedText(content.bandwidth);
            break;
        }
      },
    });
  } catch (err) {
    if (err.message.test(/acceptLicense/)) {
      console.error(
        err.message.replace('acceptLicense: true', '--accept-license')
      );
    } else {
      console.error(err.message.replace('acceptGdpr: true', '--accept-gdpr'));
    }
    process.exit(1);
  } finally {
    process.exit(0);
  }
};

module.exports = speedServices;
