

module.exports = function(app) {

	/* 
 	* API PROXY MIDDLEWARE. This is API proxy server middleware 
	*/	
	// Connect the proxy API middleware
	
	require('./proxy')(app);
	
	/* 
 	* API ROUTES. This is API middleware specific routing 
	*/	
	// API Views -  includes fully configured static routes for APIs (wordpress, dropbox, etc)

	require('./routes')(app);
	
};