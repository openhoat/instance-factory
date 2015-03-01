var instanceFactory = require('../lib/instance-factory')
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