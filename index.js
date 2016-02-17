#!/usr/bin/env node
var currentDir = process.cwd();
var request = require('request');
var async = require('async');
var argv = require('yargs').argv;
var fs = require('fs');
var swagger;
var exec = require('child_process').exec;
var mkdirp = require('mkdirp');
var cmd = `swagger-codegen generate -i ${currentDir}/swagger.json -l ${argv.l} -o ${currentDir}/sdk`;
var client = require('swagger-client');
if (argv.l != 'javascript') {
    async.series([
        (callback) => {
            request.get({
                url: (argv.url) ? argv.url : 'http://localhost:8000/swagger.json'
            }, (err, res, body) => {
                if (argv.f) {
                    var cmd = `swagger-codegen generate -i ${currentDir}/${argv.f} -l ${argv.l} -o ${currentDir}/sdk`;
                    callback();
                }
                else {
                    fs.writeFile(currentDir + '/swagger.json', body, (err) => {
                        if (err) {
                            console.log('Error writing swagger file');
                        }
                        else {
                            callback();
                        }
                    })
                }
            })
        },
        (callback) => {
            mkdirp(`${currentDir}/sdk`, (err) => {
                exec(cmd, (error, stdout, stderr) => {
                    if (stdout) {
                        console.log(stdout);
                    }
                    if (error) {
                        console.log(error);
                    }
                    if (stderr) {
                        console.log(stderr);
                    }
                    return callback();
                });
            });

        }
    ])
    ;
} else {
    var file;
    async.series([
        (callback) => {
            request.get({
                url: (argv.url) ? argv.url : 'http://localhost:8000/swagger.json'
            }, (err, res, body) => {
                if (argv.f) {
                    file = `${currentDir}/${argv.f}`;
                    callback();
                }
                else {
                    file = `${currentDir}/swagger.json`
                    ;
                    fs.writeFile(`${currentDir}/swagger.json`, body, (err) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            callback();
                        }
                    })
                }
            })
        },
        (callback) => {
            var CodeGen = require('swagger-js-codegen').CodeGen;
            var swagger = JSON.parse(fs.readFileSync(file, 'UTF-8'));
            var nodejsSourceCode = CodeGen.getNodeCode({
                className: (argv.classname) ? argv.classname : 'classname',
                swagger: swagger
            });
            mkdirp(`${currentDir}/sdk`, (err) => {
                fs.writeFile('sdk/index.js', nodejsSourceCode, (err, r) => {
                    if (err) {
                        console.log(err)
                    }
                    return callback();
                });
            });
        }
    ]);
}





