[![NPM version](https://badge.fury.io/js/instance-factory.svg)](http://badge.fury.io/js/instance-factory)
[![Build Status](https://travis-ci.org/openhoat/instance-factory.png?branch=master)](https://travis-ci.org/openhoat/instance-factory)
[![Coverage Status](https://coveralls.io/repos/openhoat/instance-factory/badge.svg)](https://coveralls.io/r/openhoat/instance-factory)

## Instance factory

Create classes for nodejs the easy way

## Getting started

```javascript
var instanceFactory = require('instance-factory')
  , Clazz, o;

Clazz = instanceFactory.createClass('Clazz', {
  constructor: function () {
    this.a = 3;
    this.b = 4;
  },
  config: {
    z: 'z'
  },
  methods: {
    getA: function () {
      return this.a;
    }
  }
});
o = new Clazz();
```

to be continued...