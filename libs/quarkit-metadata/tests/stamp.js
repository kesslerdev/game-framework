/* istanbul ignore file */

import stampit from '@stamp/it'

const stamp = stampit()
  .compose({ name: 'myName' })
  .methods({
    debug: function myDebug(l) {
      console.log(`[${this.defaultLog}] ${l}`)
    },
  })
  .props({
    defaultLog: 'default',
  })
  .deepProps({
    Secrets: {
      S3: {
        keyId: 'akey',
        secret: 'asecret',
      },
    },
  })
  .propertyDescriptors({
    key: {
      configurable: false,
      writable: false,
    },
  })
  .init(function myInitializer({ level = 50 }) {
    this.level = level
  })
  .statics({
    allowFactorSetter: true,
  })
  .deepStatics({
    Types: {
      String,
      Number,
      Array,
    },
  })
  .staticPropertyDescriptors({
    x: { value: 'MyStamp' },
  })
  .composers(({ stamp, composables }) => {
    // console.log(`Stamp ${stamp} was composed of ${composables}`)
  })
  .conf({
    apiKey: process.env.API_KEY,
  })
  .deepConf({
    Kue: {
      name: 'kue',
      priority: 'normal',
      attempts: 3,
      delay: 500,
      ttl: 5,
      events: false,
    },
  })

const stampMeta = {
  composers: [
    {
      args: ['{stamp,composables}'],
      hash: 'bc91b1b5048a73ef115144ebcdf615b8564b277fa116dac414f875f2f8521712',
      name: '',
      type: 'function',
    },
  ],
  configuration: { apiKey: undefined },
  deepConfiguration: {
    Kue: {
      attempts: '3',
      delay: '500',
      events: 'false',
      name: 'kue',
      priority: 'normal',
      ttl: '5',
    },
  },
  deepProperties: { Secrets: { S3: { keyId: 'akey', secret: 'asecret' } } },
  initializers: [
    {
      args: ['{level=50}'],
      hash: 'dd3dcd7fee7a957092c1728a372ce135c43a2b1c543db5941df9713c3f1c923e',
      name: 'myInitializer',
      type: 'function',
    },
  ],
  methods: {
    debug: {
      args: ['l'],
      hash: 'ecbc6198206b3b4fb560155209a53ccadd4b63f57cb87cae6887aab9832f1558',
      name: 'myDebug',
      type: 'function',
    },
  },
  name: 'myName',
  properties: { defaultLog: 'default' },
  propertyDescriptors: {
    key: { configurable: 'false', writable: 'false' },
  },
  staticDeepProperties: {
    Types: {
      Array: {
        args: [],
        name: 'Array',
        hash:
          '08f8164f9dadaaffb8e711e82b0556486e4dde0e02aec483a8a6bbe362a6f4d6',
        type: 'function',
      },
      Number: {
        args: [],
        name: 'Number',
        hash:
          'aaad838e3936983743cbe7f9ba803b290368ee5348687817843d62a5c66417ce',
        type: 'function',
      },
      String: {
        args: [],
        hash:
          '165421a5ddea98fdd4ea7e583947daf6bc0df5352ec6c4bed6678e03dee41eee',
        name: 'String',
        type: 'function',
      },
    },
  },
  staticProperties: { allowFactorSetter: 'true' },
  staticPropertyDescriptors: { x: { value: 'MyStamp' } },
}

export { stamp, stampMeta }
