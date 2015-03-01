[![NPM version](https://badge.fury.io/js/instance-factory.svg)](http://badge.fury.io/js/instance-factory)
[![Build Status](https://travis-ci.org/openhoat/instance-factory.png?branch=master)](https://travis-ci.org/openhoat/instance-factory)
[![Coverage Status](https://coveralls.io/repos/openhoat/instance-factory/badge.svg)](https://coveralls.io/r/openhoat/instance-factory)

## Instance factory

Create classes for nodejs the easy way

## Getting started

Instance factory provides a 'createClass' method that builds an object instance based on the given description.

## Use cases

### Simple class :

```javascript
var instanceFactory = require('instance-factory')
  , Clazz, o;

Clazz = instanceFactory.createClass('Clazz', {
  static: {
    config: {
      z: 'z'
    }
  },
  constructor: function () {
    this.a = 3;
    this.b = 4;
  },
  methods: {
    getA: function () {
      return this.a;
    }
  }
});
o = new Clazz();
console.log(o instanceof Clazz);
console.log(Clazz.config);
console.log(o.getA());
console.log(o.a);
```

### Subclass :

```javascript
var instanceFactory = require('instance-factory')
  , Clazz, Subclazz, o;

Clazz = instanceFactory.createClass('Clazz', {
  constructor: function () {
    this.a = 3;
    this.b = 4;
  },
  methods: {
    getA: function () {
      return this.a;
    }
  }
});
Subclazz = instanceFactory.createClass('Subclazz', {
  parent: Clazz,
  defaults: {b: 5},
  methods: {
    getB: function () {
      return this.b;
    }
  }
});
o = new Subclazz();
console.log(o instanceof Subclazz);
console.log(o instanceof Clazz);
console.log(o.getA());
console.log(o.getB());
```

### Subclass of a subclass :

```javascript
var instanceFactory = require('instance-factory')
  , Clazz, Subclazz, Child, o;

Clazz = instanceFactory.createClass('Clazz', {
  constructor: function () {
    this.a = 3;
    this.b = 4;
  },
  methods: {
    getA: function () {
      return this.a;
    }
  }
});
Subclazz = instanceFactory.createClass('Subclazz', {
  parent: Clazz,
  defaults: {b: 5},
  methods: {
    getB: function () {
      return this.b;
    }
  }
});
Child = instanceFactory.createClass('Child', function () { // class desc can also be specified with a function
  return {
    parent: Subclazz,
    defaults: {c: 6},
    methods: {
      getA: function () {
        return this.parent.getA.apply(this) * 2;
      },
      getC: function () {
        return this.c;
      },
      getSum: function () {
        return this.a + this.b + this.c;
      }
    }
  };
});
o = new Child();
console.log(o instanceof Child);
console.log(o instanceof Subclazz);
console.log(o instanceof Clazz);
console.log(o.getA());
console.log(o.getB());
console.log(o.getC());
console.log(o.getSum());
```

Enjoy !