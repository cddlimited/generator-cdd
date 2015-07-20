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
        var greetings = [
            'Wow! Shower much?!',
            'Behold! It\'s the amazing ' + chalk.red('CDD') + ' generator!',
            'Back again huh? Can\'t get enoug of the ' + chalk.red('CDD') + ' generator?',
            chalk.green('Fun fact') + ': By the time I\'m done scaffolding, 26 million men decided to masturbate!',
            'Hi there! Don\'t forget to ' + chalk.green('contribute') + ' if you find a bug or something that needs tweaking!'
        ];

        this.log(yosay(
            greetings[Math.floor(Math.random()*greetings.length)]
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
        copyGulpfile: function() {
            this.template('gulpfile.js');
        },

        copyStructure: function() {
            this.mkdir('app');
            this.mkdir('app/scripts');
            this.mkdir('app/styles');
            this.mkdir('app/images');
            this.mkdir('app/fonts');
        },

        copyScripts: function() {
            this.directory('scripts/modules', 'app/scripts/modules');
            this.copy('scripts/main.js', 'app/scripts/main.js');
            this.copy('scripts/myApp.js', 'app/scripts/myApp.js');
        },

        copyStyles: function() {
            this.mkdir('app/styles/scss');
            this.directory('styles/core', 'app/styles/core');
            this.directory('styles/foundation', 'app/styles/foundation');
            this.directory('styles/modules', 'app/styles/modules');
            this.directory('styles/mixins', 'app/styles/mixins');
            this.directory('styles/vendor', 'app/styles/vendor');
            this.copy('styles/_inbox.scss', 'app/styles/_inbox.scss');
            this.template('styles/_main.scss', 'app/styles/main.scss');
        },

        copyGit: function() {
            this.copy('gitignore', '.gitignore');
        },

        copyApp: function() {
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

        copyProjectfiles: function() {
            this.copy('editorconfig', '.editorconfig');
            this.copy('jshintrc', '.jshintrc');
            this.copy('bowerrc', '.bowerrc');
        }
    },

    install: function() {
        this.installDependencies({
            skipInstall: this.options['skip-install']
        });
    }
});