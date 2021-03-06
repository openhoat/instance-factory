'use strict';

var util = require('util')
  , log = require('hw-logger').log
  , objectFactory;

objectFactory = {
  createClass: function (name, classDesc) {
    var constructor, clazz = null, internal;
    log.trace('creating class : %s', name);
    if (typeof classDesc === 'function') {
      classDesc = classDesc();
    }
    classDesc = classDesc || {};
    if (typeof classDesc.constructor === 'function') {
      constructor = classDesc.constructor;
    }
    internal = function () {
      var that = this;
      that.clazz = clazz;
      if (classDesc.parent) {
        classDesc.parent.apply(that, arguments);
        that.parent = clazz.super_.prototype;
      }
      if (typeof classDesc.defaults === 'object' && classDesc.defaults) {
        log.trace('class desc has default values');
        Object.keys(classDesc.defaults).forEach(function (key) {
          that[key] = classDesc.defaults[key];
        });
      }
      if (constructor) {
        constructor.apply(that, arguments);
      }
    };
    eval(util.format('clazz = function %s() {return internal.apply(this,arguments); }', name));
    if (classDesc.parent) {
      log.trace('inherits methods from parent');
      util.inherits(clazz, classDesc.parent);
    }
    if (typeof classDesc.static === 'object' && classDesc.static) {
      log.trace('class desc has static members');
      Object.keys(classDesc.static).forEach(function (key) {
        clazz[key] = classDesc.static[key];
      });
    }
    if (typeof classDesc.methods === 'object' && classDesc.methods) {
      log.trace('class desc has methods');
      Object.keys(classDesc.methods).forEach(function (key) {
        if (typeof classDesc.methods[key] === 'function') {
          clazz.prototype[key] = classDesc.methods[key];
        }
      });
    }
    if (typeof classDesc.init === 'function') {
      classDesc.init.call(null, clazz);
    }
    return clazz;
  }
};

exports = module.exports = objectFactory;