/**
 * Config file with base variables.
 *
 * To load variables into file just include this file. e.g.
 *
 * import config from './config.js';
 * console.log(config.src);
 */

/**
 * Base variables
 *
 * Path relative to path where gulp is executed. Probably root directory
 */
let src = './lib';
let dist = './dist';

let gulpPath = './tasks';

let jsWatchGlob = [ src + '/**/*.js', gulpPath + '/**/*.js' ];

/**
 * Watch options
 */

let watchOptions = {
    interval: 100,
    debounceDelay: 5000
};


let config = {
    src,
    dist,

    gulpPath,

    jsWatchGlob,
};

export default config;
