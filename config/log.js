///**
// * Built-in Log Configuration
// * (sails.config.log)
// *
// * Configure the log level for your app, as well as the transport
// * (Underneath the covers, Sails uses Winston for logging, which
// * allows for some pretty neat custom transports/adapters for log messages)
// *
// * For more information on the Sails logger, check out:
// * http://sailsjs.org/#!/documentation/concepts/Logging
// */

//module.exports.log = {

//  /***************************************************************************
//  *                                                                          *
//  * Valid `level` configs: i.e. the minimum log level to capture with        *
//  * sails.log.*()                                                            *
//  *                                                                          *
//  * The order of precedence for log levels from lowest to highest is:        *
//  * silly, verbose, info, debug, warn, error                                 *
//  *                                                                          *
//  * You may also set the level to "silent" to suppress all logs.             *
//  *                                                                          *
//  ***************************************************************************/

//  // level: 'info'

//};

// var winston = require('winston');
// var path = require('path');
// var customLogger = new winston.Logger({
//     transports: [
//         new (winston.transports.File)({
//             name:'error-file',
//             level: 'error',
//             filename: path.join(__dirname, '../assets/logger/error.log') 
//         }),
//         new (winston.transports.File)({
//             name:'debug-file',
//             level: 'debug',
//             filename: path.join(__dirname, '../assets/logger/debug.log') 
//         }),
//         new (winston.transports.File)({
//             name:'warn-file',
//             level: 'warn',
//             filename: path.join(__dirname, '../assets/logger/warn.log') 
//         })
//     ],
// });

// module.exports.log = {
//     colors: false,  // To get clean logs without prefixes or color codings
//     custom: customLogger   
// };