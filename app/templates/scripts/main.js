// Script loader

var namespace = namespace || {};

(function($, window, document, undefined) {

    'use strict';
  
    // Initialise app 
    var myApp = new namespace.MyApp({ 'something' : 'here' });

    // Use functionality from module b
    myApp.moduleB.talk('Looking for a city');


    <% if (appType === 'perch') { %>
    // Show and hide debug table (remove for production!)
    $('body').on('click', '.perch-debug', function(e){
        if (e.offsetY < 0) { $('.perch-debug').toggleClass('perch-debug--open'); }
    });
    <% } %>
  
})(jQuery, window, document);