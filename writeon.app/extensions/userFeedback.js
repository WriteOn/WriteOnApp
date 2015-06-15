define([
    "jquery",
    "classes/Extension",
    "text!html/buttonUserFeedback.html",
], function($, Extension, buttonUserFeedbackHTML) {

    var buttonUserFeedback = new Extension("buttonUserFeedback", 'Feedback & Support', false, true);
    buttonUserFeedback.settingsBlock = '<p>Adds a convenient "Feedback/Support" button.</p>';

    buttonUserFeedback.onCreatePreviewButton = function() {
        /* jshint ignore:start */
        
        // Include the UserVoice JavaScript SDK (only needed once)
            UserVoice=window.UserVoice||[];
            (function(){
            var uv=document.createElement('script');
            uv.type='text/javascript';
            uv.async=true;
            uv.src='//widget.uservoice.com/9ETh8LB2ADPn5Iwpgytg.js';
            var s=document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(uv,s);
        })();

        //
        // UserVoice Javascript SDK developer documentation:
        // https://www.uservoice.com/o/javascript-sdk
        //

        // Set colors
        UserVoice.push(['set', {
          accent_color: '#808283',
          trigger_color: 'white',
          trigger_background_color: 'rgba(46, 49, 51, 0.6)'
        }]);

        // Identify the user and pass traits
        // To enable, replace sample data with actual user traits and uncomment the line
        UserVoice.push(['identify', {
          //email:      'john.doe@example.com', // User’s email address
          //name:       'John Doe', // User’s real name
          //created_at: 1364406966, // Unix timestamp for the date the user signed up
          //id:         123, // Optional: Unique id of the user (if set, this should not change)
                  //type:       'Owner', // Optional: segment your users by type
          //account: {
          //  id:           123, // Optional: associate multiple users with a single account
          //  name:         'Acme, Co.', // Account name
          //  created_at:   1364406966, // Unix timestamp for the date the account was created
          //  monthly_rate: 9.99, // Decimal; monthly rate of the account
          //  ltv:          1495.00, // Decimal; lifetime value of the account
          //  plan:         'Enhanced' // Plan name for the account
          //}
        }]);

        // Custom trigger:
        UserVoice.push(['addTrigger', '#send-feedback', { mode: 'smartvote' }]);
        UserVoice.push(['addTrigger', '#say-hello', { mode: 'contact' }]);
        UserVoice.push(['addTrigger', '#get-help', { mode: 'contact' }]);
        UserVoice.push(['addTrigger', '#button-help', { mode: 'contact' }]);
        UserVoice.push(['addTrigger', '#rate-app', { mode: 'satisfaction' }]);

        // Autoprompt for Satisfaction and SmartVote (only displayed under certain conditions)
        UserVoice.push(['autoprompt', {}]);
        
        /* jshint ignore:end */

        return buttonUserFeedbackHTML;
    };

    return buttonUserFeedback;

});