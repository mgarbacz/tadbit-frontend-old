var config, env;

env = (function() {
    switch (window.location.hostname) {
        case "localhost":
        case "127.0.0.1":
            return "development";
        case "tadbit.michalgarbacz.com":
            return "production";
        default:
            return "production";
    }
})();

config = {
    development: {
        appRoot: '/',
        apiUrl: 'http://localhost:8124/cards'
    },
    production: {
        appRoot: '/',
        apiUrl: 'http://tadbit.herokuapp.com/cards'
    }
};

module.exports = config[env];
