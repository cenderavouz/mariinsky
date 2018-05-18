// Copyright (c) 2018 Rapidfacture GmbH
// Licensed under the MIT license.
//
// For more information, the home page:
// https://github.com/RAPIDFACTURE/rf-log
//
// rf-log, version 0.1.6

function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var empty = {};
var empty$1 = /*#__PURE__*/ Object.freeze({
    default: empty
});

var fs = (empty$1 && empty) || empty$1;

var rfLog = createCommonjsModule(function(module) {
    // rf-log, a small logging lib for NodeJs
    // console colors
    // see http://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
    var blue = '',
        green = '',
        yellow = '',
        red = '';

    module.exports = {

        // allow to start the logger with a prefix
        start: function(mainPrefix) {
            module.exports.options.mainPrefix = mainPrefix;
            return module.exports;
        },


        // default logging functions
        info: function() {
            _log(arguments, blue, 'info: ');
        },

        success: function() {
            _log(arguments, green, 'success: ');
        },

        warning: function() {
            _log(arguments, yellow, 'warning: ');
        },

        error: function() {
            _log(arguments, red, 'error: ');
        },

        critical: function() {
            throw new Error(_log(arguments, red, 'critical:'));
        },

        // add custom logger instance
        customPrefixLogger: function(prefix) {
            return new _customPrefixLogger(prefix);
        },

        // add custom logging function
        addLoggingFunction: function(name, color, prefix, toFilePath, secondPrefix) {
            this[name] = function() {
                _log(arguments, color, prefix, toFilePath);
            };
        },

        options: {
            mainPrefix: '',
            time: false,
            logFile: '',
            carriageReturn: true
        }
    };

    // main log function
    function _log(argumentsArray, color, prefix, toFilePath, secondPrefix) {
        var opts = module.exports.options;
        var filePath = opts.logFile;
        if (toFilePath) filePath = toFilePath;

        var args = [].slice.apply(argumentsArray); // convert arguments to an array

        if (opts.time) {
            args.unshift(new Date().toLocaleString().slice(3, 24));
        }

        if (secondPrefix) args.unshift(secondPrefix);
        if (opts.mainPrefix) args.unshift(opts.mainPrefix);
        if (prefix) args.unshift(prefix);

        // only for console, not files
        if (!filePath) {
            args.unshift(color); // turn on colored text at the beginning;
            if (opts.carriageReturn) args.unshift('\r'); // start at the beginning of the line
            args.push(''); // reset message color to black at end;
        }

        if (filePath) {
            var string = '';
            args.forEach(function(arg) {
                string += arg;
            });
            string += '\n'; // linebreak
            try {
                var f = file(filePath);
                f.write(string);
                f.close();
            } catch (error) {
                message(error);
            }
        } else {
            var string = '';
            args.forEach(function(arg) {
                string += arg;
            });
            string += '\n'; // linebreak
            message(string);
        }
    }

    // customPrefixLogger: adds a second prefix. Output example:
    //
    // ✘ [ERP][rf-log] customLogger: no secondPrefix defined!
    //
    // idea: configure a custom logger once when starting a module of your code
    // => find errors in the corresponding module faster
    function _customPrefixLogger(secondPrefix) {
        if (!secondPrefix) logError('customLogger: no secondPrefix defined!');
        this.secondPrefix = secondPrefix;
        this.info = function() {
            _log(arguments, blue, 'info: ', null, this.secondPrefix);
        };

        this.success = function() {
            _log(arguments, green, 'success: ', null, this.secondPrefix);
        };

        this.warning = function() {
            _log(arguments, yellow, 'warning: ', null, this.secondPrefix);
        };

        this.error = function() {
            _log(arguments, red, 'error: ', null, this.secondPrefix);
        };

        this.critical = function() {
            throw new Error(_log(arguments, red, 'critical: ', null, this.secondPrefix));
        };
    }

    function logError() {
        throw new Error(_log(arguments, red, '', '[rf-log]'));
    }
});
