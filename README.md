
# CDD Generator v2

## Features

A basic gulp build-kit, including our in-house scss starter template, based on the [generator-gulp-webapp](https://github.com/yeoman/generator-gulp-webapp)

Same features as [generator-gulp-webapp](https://github.com/yeoman/generator-gulp-webapp):

* CSS Autoprefixing
* BrowserSync
* [libsass](http://libsass.org)
* jslint
* Image optimization
* [Bower](http://bower.io)
* + [pixrem](https://github.com/gummesson/gulp-pixrem) for automatic rem -> px fallback!

## Getting Started

~~npm install -g generator-fed-up~~ (Not added to yeoman community generators as of yet)

(First time only): To use this generator, from the fed-up folder, run the following as sudo:
  
    npm link

Then, start the generator with yo: 

    yo cdd

If you get any errors, you might have to re-run npm install with sudo!

## Developing

When you start the build you need to tell gulp-pixrem the base font size, so that it can automatically generate px fallback values for <IE8. Look for the pixrem task and update to match your base font size.

Once this is done, use the following commands when developing:

- Run `gulp serve` to preview and watch for changes
- Run `bower install --save <package>` to install frontend packages using Bower
- Run `gulp` to minify and build your application into the /dist folder

## License

MIT
