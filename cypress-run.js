const {execSync} = require('child_process');
const uploadRecordings = process.env.npm_package_config_cypressUploadRecordings;
let command = "cypress run";
if(uploadRecordings) {
    command += ` --record --key ${process.env.CYPRESS_RECORD_KEY}`
}
execSync(command);
