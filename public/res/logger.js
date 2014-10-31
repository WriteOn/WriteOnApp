define([], function () {
    
    // Defines the logger object
    var logger = {
        log: function () {},
        info: function () {},
        warn: function () {},
        error: function () {}
    };
    
    // We can run WriteOn with https://.../?console to print logs in the console
    return (/(\?|&)console($|&)/).test(location.search) ? console : logger;
});