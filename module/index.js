'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    initializing: function() {
        this.log('All right, a new module!');
    },

    prompting: function() {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the ' + chalk.red('CDD') + ' generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'moduleName',
            message: 'What is the name of the module?',
            default: 'module' // Default to current folder name
        }];

        this.prompt(prompts, function(props) {

            this.log(props.moduleName);
            this.moduleName = props.moduleName;

            done();
        }.bind(this));
    },

    writing: function() {
        this.fs.copyTpl(
            this.templatePath('_module.scss'),
            this.destinationPath('app/styles/modules/_' + this.moduleName + '.scss'),
            this
        );
    }
});