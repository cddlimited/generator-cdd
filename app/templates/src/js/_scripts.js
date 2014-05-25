
(function ($, window, document, undefined) {

  'use strict';

  if (!window.console) { window.console = { log: function() {} }; }


  // Constructor  ---------------------------------------------------


  function AppName() {

    // App config
    var that = this;
    this.domElements = {
      el:   $('#selector')
      // ...
    };


    // Description of function

    this.someFunction = function() {

      console.log(that + 'is radical!');
    };

  }


  // Document.ready ---------------------------------------------------


  $(function () {

    var App = new AppName();

    console.log(App);

  });


})(jQuery, window, document);