var instanceFactory = require('../lib/instance-factory')
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
Child = instanceFactory.createClass('Child', {
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
});
o = new Child();
console.log(o instanceof Child);
console.log(o instanceof Subclazz);
console.log(o instanceof Clazz);
console.log(o.getA());
console.log(o.getB());
console.log(o.getC());
console.log(o.getSum());