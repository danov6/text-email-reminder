let aws = require('aws-sdk');
aws.config.update({
    "accessKeyId": "",
    "secretAccessKey": "",
    "region": ""
});
module.exports = (function () {
    return aws;
})();