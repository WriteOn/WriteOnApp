/**
* Created with WriteOn App.
* User: thinq4yourself
* Date: 2015-05-17
* Time: 09:40 PM
* To change this template use Tools | Templates.
*/

module.exports = function(app, stormpath) {
	
	
// get us some auth middleware loaded up...docs via stormpath.com
//app.set('view engine', 'jade');
app.use(stormpath.init(app, {
    apiKeyFile: __dirname + '/apiKey.properties',
	// apiKeyId: '69ZDB6J0NHEE4LEBI81KPQP76',
	// apiKeySecret: 'oGibdMjhQn+nKRXICQEmldp+CKydCj5Q+fLslVWm7jM',
    application: 'https://api.stormpath.com/v1/applications/4SgKKI7uk6OY7vbVt8uW4c',
    secretKey: 'mgUkj8P4eFt8Gxo9B9&X4Ih9d0w#NWAlZU&vQ88RqmysRz0lC6',
    googleAnalyticsID: 'UA-56730909-3',
    googleTagContainer: 'GTM-MK3FZ3',
    enableFacebook: true,
    enableGoogle: true,
    social: {
      facebook: {
        // store these credentials in environment variables. Please don’t hard code secret credentials into our source code!
        appId: process.env.FACEBOOK_APP_ID,
        appSecret: process.env.FACEBOOK_APP_SECRET
      },
      google: {
        // store these credentials in environment variables. Please don’t hard code secret credentials into our source code!
        clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }
    },
    //sessionDomain: 'writeon.io', // Make the session cookie work on all writeon.io subdomains.
    cache: 'memory',
    /*
    cache: 'memcached',
	cacheHost: 'pub-memcache-15782.us-east-1-2.3.ec2.garantiadata.com',
	cachePort: 15782,
	cacheOptions: {
    	auth_pass: 'mvs2vcn82lddrNx1',
		auth_user: 'memcached-app31087987'
	},
	*/ 
	//enableHttps: true,
    loginUrl: '/login',
	logoutUrl: '/logout',
    redirectUrl: '/pad',
    enableAutoLogin: true,
    enableForgotPassword: true,
    enableAccountVerification: true,
    enableUsername: false,
    requireUsername: false,
    sessionDuration: 1000 * 60 * 120, // Make sessions expire after 120 minutes.
    registrationView: __dirname + '/views/register.jade',
    loginView: __dirname + '/views/login.jade',
    forgotPasswordView: __dirname + '/views/forgot.jade',
    forgotPasswordEmailSentView: __dirname + '/views/forgot_email_sent.jade',
    forgotPasswordChangeView: __dirname + '/views/forgot_change.jade',
    forgotPasswordChangeFailedView: __dirname + '/views/forgot_change_failed.jade',
    forgotPasswordCompleteView: __dirname + '/views/forgot_complete.jade',
    accountVerificationEmailSentView: __dirname + '/views/verification_email_sent.jade',
    accountVerificationCompleteView: __dirname + '/views/verification_complete.jade',
    accountVerificationFailedView: __dirname + '/views/verification_failed.jade',
    idSiteVerificationFailedView: __dirname + '/views/id_site_verification_failed.jade',
    googleLoginFailedView: __dirname + '/views/google_login_failed.jade',
    facebookLoginFailedView: __dirname + '/views/facebook_login_failed.jade',
    unauthorizedView: __dirname + '/views/unauthorized.jade',
	
}));

	
};