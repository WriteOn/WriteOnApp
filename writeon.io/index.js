/**
 * WriteOn App.
 * User: thinq4yourself
 * Date: 2015-05-17
 * Time: 11:32 PM
 * NOTES:
 * This overrides anything set in writeon.server or prior for http server
 * 
 */
module.exports = function(app) {

/* ****************************************************
 * The below is a simple badass express based router 
 * middleware (rewrites) for html5Mode angular apps - 
 * Fedora style 
 * ****************************************************
*/

/* Load the prerender engine for Angular - using prerender.io */
app.use(require('prerender-node').set('prerenderToken', 'Rkc1v2erHMhjziNu5gbC'));

/* VIEW ENGINE. A keep it simple view-based http server.
 * Serve meta pages (static resources) that are isolated from the core application middleware
 * and all of its dependencies. We also serve the web static pages that are pulling
 * in the app for loading and download in the browser [(]via serverStatic() below]
 * 

app.set('views', __dirname + '/writeon.io/dist/views');
app.use(serveStatic(__dirname + '/writeon.io/dist'));
*/ 

// Load Angular App Uing Gzip Compression ======================================================================

app.use(morgan('app'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));

};