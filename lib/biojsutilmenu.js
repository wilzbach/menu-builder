/*
 * biojs-util-menu
 * https://github.com/greenify/biojs-util-menu
 *
 * Copyright (c) 2014 greenify
 * Licensed under the Apache 2 license.
 */

/**
@class biojsutilmenu
 */


var  biojsutilmenu;
module.exports = biojsutilmenu = function(opts){
  this.el = opts.el;
  this.el.textContent = biojsutilmenu.hello(opts.text);
};

/**
 * Private Methods
 */

/*
 * Public Methods
 */

/**
 * Method responsible to say Hello
 *
 * @example
 *
 *     biojsutilmenu.hello('biojs');
 *
 * @method hello
 * @param {String} name Name of a person
 * @return {String} Returns hello name
 */


biojsutilmenu.hello = function (name) {

  return 'hello ' + name;
};

