'use strict';

var chai = require('chai')
  , instanceFactory = require('../lib/instance-factory')
  , logger = require('hw-logger')
  , should = chai.should()
  , log = logger.log;

describe('object factory', function () {

  it('should create a simple class', function () {
    var Clazz, o;
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
    Clazz.should.have.property('config').that.eql({z: 'z'});
    o = new Clazz();
    o.should.be.an('object');
    o.should.be.an.instanceOf(Clazz);
    o.should.respondTo('getA');
    o.should.have.property('a', 3);
    o.getA().should.equal(3);
  });

  it('should create a sub class', function () {
    var Clazz, Subclazz, o;
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
    o.should.be.an('object');
    o.should.be.an.instanceOf(Subclazz);
    o.should.be.an.instanceOf(Clazz);
    o.should.respondTo('getA');
    o.should.respondTo('getB');
    o.should.have.property('a', 3);
    o.should.have.property('b', 5);
    o.getA().should.equal(3);
    o.getB().should.equal(5);
  });

  it('should create a sub class of a sub class', function () {
    var Clazz, Subclazz, Child, o;
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
    Child = instanceFactory.createClass('Child', function () {
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
    o.should.be.an('object');
    o.should.be.an.instanceOf(Child);
    o.should.be.an.instanceOf(Subclazz);
    o.should.be.an.instanceOf(Clazz);
    o.should.respondTo('getA');
    o.should.respondTo('getB');
    o.should.respondTo('getC');
    o.should.respondTo('getSum');
    o.should.have.property('a', 3);
    o.should.have.property('b', 5);
    o.should.have.property('c', 6);
    o.getA().should.equal(6);
    o.getB().should.equal(5);
    o.getC().should.equal(6);
    o.getSum().should.equal(14);
  });

});