'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var CddbaseGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askForDetails: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log('Welcome, Pilgrim! You\'re using the fantastic ' + chalk.magenta('CDDbase generator!\n'));

    var prompts = [
    {
      name: 'projectName',
      message: chalk.green('[General]') + ' - Name your project/site'
    },
    {
      name: "includeJquery",
      type: "confirm",
      default: true,
      message: chalk.green('[Includes]') + ' - Would you like to include jQuery?'
    },
    {
      name: "includeModernizr",
      type: "confirm",
      default: true,
      message: chalk.green('[Includes]') + ' - Would you like to include Modernizr?'
    },
    {
      name: "legacyRespond",
      type: "confirm",
      default: "false",
      message: chalk.green('[Polyfills]') + ' - Do you want to include respond.js? (Media queries for IE 6 - 8)'
    },
    {
      name: "legacyHtml5Shiv",
      type: "confirm",
      default: "false",
      message: chalk.green('[Polyfills]') + ' - Do you want to include HTML5shiv? (HTML5 element support for IE 6 - 9)'
    },
    {
      name: "mobileFirst",
      type: "confirm",
      default: true,
      message: chalk.green('[SASS]') + ' - Do you want Mobile-First (min-width) breakpoints?'
    }];

    this.prompt(prompts, function (props) {

      // `props` is an object passed in containing the response values, named in
      // accordance with the `name` property from your prompt object. So, for us:

      //date helper

      var today = new Date();

      var prefix = today.getUTCMonth() + 1;
      prefix += "-" + today.getDate();
      prefix += "-" + today.getFullYear();

      this.currentDate = prefix;

      // User choices

      this.projectName = props.projectName;
      this.includeJquery = props.includeJquery;
      this.includeModernizr = props.includeModernizr;
      this.legacyRespond = props.legacyRespond;
      this.legacyHtml5Shiv = props.legacyHtml5Shiv;
      this.mobileFirst = props.mobileFirst;

      done();
    }.bind(this));
  },

  askForModules: function () {
    var cb = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'sassModules',
      message: 'Which SASS modules would you like to include?',
      choices: [{
        name: 'Grid Module ' + chalk.cyan('(Simple yet robust grid system. See top of file for usage)') ,
        value: 'sass-grid',
        checked: true
      }, {
        name: 'Breakpoints Mixin ' + chalk.cyan('(Common breakpoints mixin. See top of file for usage)') ,
        value: 'sass-breakpoints',
        checked: true
      }, {
        name: 'Blueprints Module ' + chalk.cyan('(Collection of useful element blueprints. See top of file for usage)') ,
        value: 'sass-blueprints',
        checked: true
      }, {
        name: 'Helpers Mixin ' + chalk.cyan('(Collection of useful helper functions. See top of file for usage)') ,
        value: 'sass-helpers',
        checked: true
      }]
    }];

    this.prompt(prompts, function (props) {
      var hasMod = function (mod) { return props.sassModules.indexOf(mod) !== -1; };
      this.sassGrid = hasMod('sass-grid');
      this.sassBreakpoints = hasMod('sass-breakpoints');
      this.sassBlueprints = hasMod('sass-blueprints');
      this.sassHelpers = hasMod('sass-helpers');

      var sassModules = [];

      if (this.sassGrid) {
        sassModules.push("'sass-grid'");
      }
      if (this.sassBreakpoints) {
        sassModules.push("'sass-breakpoints'");
      }
      if (this.sassBlueprints) {
        sassModules.push("'sass-blueprints'");
      }
      if (this.sassHelpers) {
        sassModules.push("'sass-helpers'");
      }

      if (sassModules.length) {
        this.env.options.sassModules = '\n    ' + sassModules.join(',\n    ') + '\n  ';
      }

      cb();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/assets');

    this.mkdir('src');
    this.mkdir('src/scss');

    this.template('src/scss/_style.scss', 'src/scss/style.scss');

    // this.directory('scripts', 'scripts'); // script is folder name

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = CddbaseGenerator;