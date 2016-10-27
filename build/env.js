/**
 * @author xiaojue
 * @date 20161027
 */
var minimist = require('minimist');

var argv = minimist(process.argv.slice(2));

module.exports = argv.env || 'production';
