/**
 * Created with WriteOn App.
 * User: thinq4yourself
 * Date: 2015-05-17
 * Time: 11:32 PM
 */
module.exports = function(app) {

    /* ******* VARIANT ROUTES. Static Variant Landing Pages ******* */
    app.set('variants', './public/variants');
	
    // For each new page to launch, you must configure it 
    // below with a new app.get(...)
    // NOTE: These will not work using grunt serve, only by
    // starting a Node process
	
    app.get('/for/travel-writers', function(req, res, next) {
        res.sendFile('travel-writers.html', {
            root: './public/variants'
        });
    });
    app.get('/for/ebook-authors', function(req, res, next) {
        res.sendFile('ebook-authors.html', {
            root: './public/variants'
        });
    });
		
};