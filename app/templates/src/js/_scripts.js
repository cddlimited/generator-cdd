
(function ($, window, document, undefined) {

  'use strict';

  if (!window.console) { window.console = { log: function() {} }; }


  // Constructor  ---------------------------------------------------

  function AppName() {

    // App config
    var that = this;
    this.domElements = {
      el:   $('#selector'),
      el:   $('#selector')
    };


    // Function to change active country in the map screen (contact us and about pages)

    this.someFunction = function(target) {

      console.log('Radical!');
    };

  }


  // Document.ready ---------------------------------------------------


  $(function () {

    var App = new AppName();

    console.log(App);

  });


})(jQuery, window, document);