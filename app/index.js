'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    initializing: function() {
        this.pkg = require('../package.json');
    },

    prompting: function() {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the ' + chalk.red('CDD') + ' generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'appName',
            message: 'What is the name of the project?',
            default: 'myApp' // Default to current folder name
        }];

        this.prompt(prompts, function(props) {

            this.log(props.appName);
            this.appName = props.appName;

            done();
        }.bind(this));
    },

    writing: {
        gulpfile: function() {
            this.template('gulpfile.js');
        },

        structure: function() {
            this.mkdir('app');
            this.mkdir('app/scripts');
            this.mkdir('app/styles');
            this.mkdir('app/images');
            this.mkdir('app/fonts');
        },

        scripts: function() {
            this.directory('scripts/modules', 'app/scripts/modules');
            this.copy('scripts/main.js', 'app/scripts/main.js');
            this.copy('scripts/myApp.js', 'app/scripts/myApp.js');
        },

        styles: function() {
            this.mkdir('app/styles/scss');
            this.directory('styles/core', 'app/styles/core');
            this.directory('styles/foundation', 'app/styles/foundation');
            this.directory('styles/modules', 'app/styles/modules');
            this.directory('styles/mixins', 'app/styles/mixins');
            this.directory('styles/vendor', 'app/styles/vendor');
            this.copy('styles/_inbox.scss', 'app/styles/_inbox.scss');
            this.template('styles/_main.scss', 'app/styles/main.scss');
        },

        git: function() {
            this.copy('gitignore', '.gitignore');
        },

        app: function() {
            this.fs.copyTpl(
                this.templatePath('_index.html'),
                this.destinationPath('app/index.html'),
                this
            );
            this.fs.copyTpl(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'),
                this
            );
            this.fs.copyTpl(
                this.templatePath('_bower.json'),
                this.destinationPath('bower.json'),
                this
            );
        },

        projectfiles: function() {
            this.fs.copy(
                this.templatePath('editorconfig'),
                this.destinationPath('.editorconfig')
            );
            this.fs.copy(
                this.templatePath('jshintrc'),
                this.destinationPath('.jshintrc')
            );
        }
    },

    install: function() {
        this.installDependencies({
            skipInstall: this.options['skip-install']
        });
    }
});