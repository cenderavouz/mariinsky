// Copyright (c) 2012 Joe Yates
// Licensed under the MIT license.
//
// For more information, the home page:
// https://github.com/joeyates/jasmine-rhino-reporters
//
// Jasmine Rhino Reporters, commit Aug.22.2012


// ----------------------------load("lib/jasmine.rhino.timer_patch.js");
// Jasmine expects global timer methods to exist.
// See http://stackoverflow.com/questions/2261705/how-to-run-a-javascript-function-asynchronously-without-using-settimeout
var setTimeout,
    clearTimeout,
    setInterval,
    clearInterval;

(function() {
    setTimeout = function(fn, delay) {
        fn();
        return 0;
    };

    clearInterval = clearTimeout = function(id) {};
    setInterval = function(fn, delay) {};
})();


function jasmineRhino(testScript, testSpec) {
    // ---------------------------- load("lib/jasmine-1.3.1/jasmine.js");;
    // ---------------------------- load("helloworld.js");
    testScript();

    // ---------------------------- load("helloworld-spec.js")
    testSpec();

    jasmine.getEnv().execute();
    jasmine.getEnv().updateInterval = 1;

    var fullName = function(spec) {
        var parts = [];
        var suite = spec.suite;
        while (suite) {
            parts.unshift(suite.description);
            suite = suite.parentSuite;
        }
        parts.push(spec.description);
        return parts;
    };

    var runner = jasmine.getEnv().currentRunner();
    var specs = 0;
    var errors = [];
    for (var i in runner.specs()) {
        specs++;
        var spec = runner.specs()[i];
        var items = spec.results().getItems();
        var spec_errors = [];
        for (var j in items) {
            var item = items[j];
            if (!item.passed())
                spec_errors.push(item.message);
            if (spec_errors.length > 0)
                errors.push({ title: fullName(spec).join(" "), errors: spec_errors });
        }
    }

    message(specs + " specs, " + errors.length + " errors"); //
    for (var k in errors) {
        var error = errors[k];
        message(error.title); //
        for (var l in error.errors)
            message("  " + error.errors[l]); //
    }
}