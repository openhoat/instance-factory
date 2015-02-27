var instanceFactory = require('../lib/instance-factory')
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