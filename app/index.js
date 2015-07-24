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

        var prompts = [
            {
                type: 'input',
                name: 'appName',
                message: 'What is the name of the project?',
                default: 'myApp' // Default to current folder name
            }, {
                type: 'list',
                message: 'What type of project is this?',
                name: 'appType',
                choices: [
                    {
                        name: 'No Platform',
                        value: 'blank'
                    },
                    {
                        name: 'perch',
                        value: 'perch'
                    }
                ]
            }, {
                type: 'list',
                message: 'Would you like to include babel? (to compile es6)',
                name: 'esVersion',
                choices: [
                    {
                        name: 'No thanks',
                        value: 'es5'
                    },
                    {
                        name: 'yeah!',
                        value: 'es6'
                    }
                ]
            }, {
                type: 'checkbox',
                message: 'Optional settings',
                name: 'features',
                choices: [
                    {
                        name: 'jQuery 2',
                        value: 'includeJquery'
                    },

                    {
                        name: 'jQuery 1.9.X (IE 6/7/8 support)',
                        value: 'includeJqueryLegacy'
                    },

                    {
                        name: 'Modernizr',
                        value: 'includeModernizr'
                    },

                    {
                        name: 'Legacy tools for <IE9 (Respond.js, html5shiv)',
                        value: 'includeLegacy'
                    }
                ]
            }
        ];

        this.prompt(prompts, function(props) {

            var features = props.features;

            function hasFeature (feat) {
                return features.indexOf(feat) !== -1;
            }

            this.log(props.appName);

            this.appName = props.appName;
            this.appType = props.appType;
            this.esVersion = props.esVersion;

            this.includeJquery = hasFeature('includeJquery');
            this.includeJqueryLegacy = hasFeature('includeJqueryLegacy');
            this.includeModernizr = hasFeature('includeModernizr');
            this.includeLegacy = hasFeature('includeLegacy');

            // Generate bower.json
            this.dependencies = {};

            if ( this.includeJquery ) { this.dependencies["jquery"] = '~2.1.1'; }
            if ( this.includeJqueryLegacy ) { this.dependencies["jquery"] = "~1.9.1"; }
            if ( this.includeModernizr ) { this.dependencies["modernizr"] = "latest"; }
            if ( this.includeLegacy ) { 
                this.dependencies["respond"] = "~1.4.2"; 
                this.dependencies["html5shiv"] = "~3.7.3"; 
            }

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

            if ( this.appType !== 'perch' ) {
                this.fs.copyTpl(
                    this.templatePath('_index.html'),
                    this.destinationPath('app/index.html'),
                    this
                );
            } else {
                this.mkdir('app/perch');
                this.directory('perch', 'app/perch');
            }

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