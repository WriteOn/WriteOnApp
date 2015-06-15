/**
 * Created with WriteOn App.
 * User: thinq4yourself
 * Date: 2015-05-17
 * Time: 11:32 PM
 */
module.exports = function(app) {	
	
    /* 
     * ******* ANGULAR ROUTING ENGINE. The Angular App Router Loads Last (!important) *******
     */
    // Leave this alone for the most part
    app.get('/*', function(req, res, next) {
        res.sendFile('index.html', {
            root: './public'
        });
    });
	
	
	
};