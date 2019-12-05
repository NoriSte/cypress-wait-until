const npm = require('npm')

npm.load(() => {
  const uploadRecordings = process.env.npm_package_config_cypressUploadRecordings === 'true';
  const key = process.env.CYPRESS_RECORD_KEY;
  if (uploadRecordings && !key) {
    throw "Missing Cypress record key";
  }
  const options = uploadRecordings && key ? ['--record', '--key', key] : [];
  npm.commands['run-script'](['cy:run', ...options]);
})
