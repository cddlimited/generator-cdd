// PAGID.com scripts

(function ($, window, document, undefined) {

  'use strict';

  if (!window.console) { window.console = { log: function() {} }; }

  // global skrollr 

  // Constructor  **---------------------------------------------------

  function PAGIDdotcom() {

    // App config
    var that = this;
    this.domElements = {
      menuButton:   $('#toggle-main'),
      menu :        $('#main-nav'),
      pagidForm :   $('.pagid-form input[type="text"]')
    };


    // Function to change active country in the map screen (contact us and about pages)

    this.changeCountry = function(target) {

      console.log(target);
      console.log(that);

    };

  }




  // Document.ready ---------------------------------------------------


  $(function () {

    var PagidApp = new PAGIDdotcom();

    console.log(PagidApp);



    /* -------------------------------------------- */

    // Custom scroll functions for homepage only

    var screenWidth = $(window).width();
    var currentPage = $('.main.home-page');
    var tabletCheck = $('html').hasClass('touch');

    if (screenWidth > 1100 && currentPage.length && !tabletCheck ) {

      console.log('home page!');

      $('.scroller.down').scrollToAnimate({ start: 0, stop: 300, attribute: 'opacity', startVal: '1.0', stopVal: '0.0' });

      $('article.products').scrollToAnimate({ start: 0, stop: 900, attribute: 'background-position', startVal: 'center 0px', stopVal: 'center 600px' });
      $('article.professional').scrollToAnimate({ start: 0, stop: 1800, attribute: 'background-position', startVal: 'center -770px', stopVal: 'center 800px' });
      $('article.proud-to-fit').scrollToAnimate({ start: 800, stop: 2300, attribute: 'background-position', startVal: 'center -500px', stopVal: 'center 300px' });
      $('article.pagid-25-25').scrollToAnimate({ start: 1600, stop: 2500, attribute: 'background-position', startVal: 'center -300px', stopVal: 'center 0px' });

      $('article.products .grid').scrollToAnimate({ start: 0, stop: 900, attribute: 'padding-top', startVal: '21em', stopVal: '60em' });
      $('article.products').scrollToAnimate({ start: 400, stop: 900, attribute: 'opacity', startVal: '1.0', stopVal: '0.2' });
      $('article.professional .grid').scrollToAnimate({ start: 100, stop: 1800, attribute: 'padding-top', startVal: '0em', stopVal: '45em' });
      $('article.professional').scrollToAnimate({ start: 0, stop: 500, attribute: 'opacity', startVal: '0.1', stopVal: '1' });
      $('article.proud-to-fit .grid').scrollToAnimate({ start: 1000, stop: 2500, attribute: 'padding-top', startVal: '0em', stopVal: '45em' });
      $('article.proud-to-fit').scrollToAnimate({ start: 800, stop: 1200, attribute: 'opacity', startVal: '0.2', stopVal: '1' });
      $('article.pagid-25-25 .grid').scrollToAnimate({ start: 1600, stop: 2200, attribute: 'padding-top', startVal: '0em', stopVal: '15em' });
      $('article.pagid-25-25').scrollToAnimate({ start: 1700, stop: 1900, attribute: 'opacity', startVal: '0.2', stopVal: '1' });

      // $('article.products').scrollToAnimate({ start: 0, stop: 900, attribute: 'background-position', startVal: 'center 0px', stopVal: 'center 600px' });
      // $('article.professional').scrollToAnimate({ start: 900, stop: 1800, attribute: 'background-position', startVal: 'center 0px', stopVal: 'center 600px' });
      // $('article.proud-to-fit').scrollToAnimate({ start: 1800, stop: 2700, attribute: 'background-position', startVal: 'center 0px', stopVal: 'center 600px' });
      // $('article.pagid-25-25').scrollToAnimate({ start: 2700, stop: 3000, attribute: 'background-position', startVal: 'center 0px', stopVal: 'center 200px' });

      // $('article.products .grid').scrollToAnimate({ start: 0, stop: 900, attribute: 'padding-top', startVal: '21em', stopVal: '60em' });
      // $('article.products').scrollToAnimate({ start: 400, stop: 900, attribute: 'opacity', startVal: '1.0', stopVal: '0.2' });
      // $('article.professional .grid').scrollToAnimate({ start: 900, stop: 1800, attribute: 'padding-top', startVal: '21em', stopVal: '60em' });
      // $('article.professional').scrollToAnimate({ start: 1300, stop: 1800, attribute: 'opacity', startVal: '1.0', stopVal: '0.2' });
      // $('article.proud-to-fit .grid').scrollToAnimate({ start: 1800, stop: 2700, attribute: 'padding-top', startVal: '21em', stopVal: '60em' });
      // $('article.proud-to-fit').scrollToAnimate({ start: 2100, stop: 2500, attribute: 'opacity', startVal: '1.0', stopVal: '0.2' });

    }

    $('a[href="#top"]').click(function() {
      $('html, body').animate({ scrollTop: 0 }, 2000);
      return false;
    });

    /* -------------------------------------------- */

    // Main menu toggle function

    $('#toggle-main').on('click', function(e){
      e.preventDefault();

      $(this).toggleClass('close');
      $('#main-nav').toggleClass('open');
    });

    // Subnav toggle function

    $('#main-nav a').on('click', function(e){

      var target = e.currentTarget;
      var submenu =  $(target).next('ul');

      if (submenu.length > 0) {
        e.preventDefault();
        submenu.slideToggle();
      }
    });

    /* -------------------------------------------- */

    // Contact Form value clear on click - return value on blur

    PagidApp.domElements.pagidForm.each(function(){
      $(this).attr('placeholder', $(this).val());
    });

    PagidApp.domElements.pagidForm.focus(function() {
      var el = $(this);
      if(el.val() === el.attr('placeholder')) { 
        el.val('');
      }
    }).blur(function() {
      var el = $(this);
      if(!el.val()) { 
        el.val(el.attr('placeholder'));
      }
    });

    /* -------------------------------------------- */

    // Contact Form - modify markup and update yes/no buttons on click

    $('input[type="radio"]').parent('.option').addClass('show-tablet').after('<span class="toggle-button hidden-tablet"></span>');
    $('input[type="radio"]:checked').parent('.option').next('.toggle-button').addClass('checked');

    // set values
    $('input[value="yes"]').parent('.option').next('.toggle-button').addClass('yes');
    $('input[value="no"]').parent('.option').next('.toggle-button').addClass('no');

    $('.toggle-button').on('click', function(){

      var el = $(this);
      var group = el.closest('.webform-component').find('.toggle-button');
      var target = el.prev('.option').children('input[type="radio"]');

      if (target[0].checked === false) {
        target.prop('checked', true);
        group.removeClass('checked');
        el.addClass('checked');
      }

      $('input[value="yes"]').prev('.option').next('.toggle-button').addClass('yes');
      $('input[value="no"]').prev('.option').next('.toggle-button').addClass('no');

    });
  });


})(jQuery, window, document);