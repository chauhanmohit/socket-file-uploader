/**
 * UserController
 *
 * @description :: Server-side logic for managing Drivers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Response = require('../services/Response');
var E = require('../services/error');
var bcrypt = require('bcrypt');
var fs = require('fs');
var path = require('path');
var Files = {};

module.exports = {

    Upload: function(req, res, next) { 
        var data=req.body;
        var Name = data['Name'];
        Files[Name]['Downloaded'] += data['Data'].length;
        Files[Name]['Data'] += data['Data'];
        if(Files[Name]['Downloaded'] == Files[Name]['FileSize']) //If File is Fully Uploaded
        {
            fs.write(Files[Name]['Handler'], Files[Name]['Data'], null, 'Binary', function(err, Writen){
                if (req.isSocket === true) {
                    var socketId = sails.sockets.id(req.socket);
                    sails.sockets.emit(socketId, 'Done', { 'Image   ' : "http://localhost:1337/img/"});
                }
            });
        }
        else if(Files[Name]['Data'].length > 10485760){ //If the Data Buffer reaches 10MB
            fs.write(Files[Name]['Handler'], Files[Name]['Data'], null, 'Binary', function(err, Writen){
                Files[Name]['Data'] = ""; //Reset The Buffer
                var Place = Files[Name]['Downloaded'] / 524288;
                var Percent = (Files[Name]['Downloaded'] / Files[Name]['FileSize']) * 100;
                if (req.isSocket === true) {
                    var socketId = sails.sockets.id(req.socket);
                    sails.sockets.emit(socketId, 'MoreData', { 'Place' : Place, 'Percent' :  Percent});
                }
            });
        }
        else
        {
            var Place = Files[Name]['Downloaded'] / 524288;
            var Percent = (Files[Name]['Downloaded'] / Files[Name]['FileSize']) * 100;
            if (req.isSocket === true) {
                var socketId = sails.sockets.id(req.socket);
                sails.sockets.emit(socketId, 'MoreData', { 'Place' : Place, 'Percent' :  Percent});
            }
        }
    },

    Start: function(req, res, next) { 
        var data=req.body;
        var Name = data['Name'];
        Files[Name] = {  //Create a new Entry in The Files Variable
            FileSize : data['Size'],
            Data     : "",
            Downloaded : 0
        }
        var Place = 0;
        try{
            var Stat = fs.statSync(path.join(__dirname, '../../assets/img/') +  Name);
            if(Stat.isFile())
            {
                Files[Name]['Downloaded'] = Stat.size;
                Place = Stat.size / 524288;
            }
        }
        catch(er){} //It's a New File
        fs.open(path.join(__dirname, '../../assets/img/') +  Name , "a", 0755, function(err, fd){
            if(err)
            {
                console.log(err);
            }
            else
            {
                Files[Name]['Handler'] = fd; //We store the file handler so we can write to it later
                if (req.isSocket === true) {
                    var socketId = sails.sockets.id(req.socket);
                    sails.sockets.emit(socketId, 'MoreData', { 'Place' : Place, Percent : 0 });
                }
            }
        });
    },
};