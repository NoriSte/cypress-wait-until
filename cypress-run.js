const {spawn} = require('child_process');
const uploadRecordings = process.env.npm_package_config_cypressUploadRecordings;
let command = "npm run cy:run";
if(uploadRecordings) {
    command += ` --record --key ${process.env.CYPRESS_RECORD_KEY}`
}
spawn(command);
