import { stampMetadata, diffMetadata } from '../src'
import { stamp, stampMeta } from './stamp'

describe('generation', () => {
  test('empty for non stamp', () => {
    expect(stampMetadata({})).toEqual({})
    expect(stampMetadata(stampMetadata)).toEqual({})
  })

  test('full', () => {
    expect(stampMetadata(stamp)).toEqual(stampMeta)
  })
})

describe('parents', () => {
  test('empty for no modif', () => {
    expect(diffMetadata(stamp.compose(), stamp)).toEqual({
      name: undefined,
      methods: {},
      properties: {},
      deepProperties: {},
      propertyDescriptors: {},
      initializers: [],
      staticProperties: {},
      staticDeepProperties: {},
      staticPropertyDescriptors: {},
      composers: [],
      configuration: {},
      deepConfiguration: {},
    })
  })

  test('name undefined if same as parent', () => {
    expect(diffMetadata(stamp.compose({ name: 'myName' }), stamp).name).toBe(
      undefined,
    )
  })

  test('methods redefine', () => {
    const methods = stamp.methods({
      a: a => a * a,
    })
    const meta = {
      a: {
        args: ['a'],
        hash:
          '16c8cc8f17ae0167dc58ca26e704aafc71c49d4a3575770201a0b3c63fb1b02b',
        name: 'a',
        type: 'function',
      },
    }
    expect(diffMetadata(methods, stamp).methods).toEqual(meta)

    expect(
      diffMetadata(
        methods.methods({
          debug: () => {
            /* do nothing */
          },
        }),
        stamp,
      ).methods,
    ).toEqual({
      ...meta,
      debug: {
        args: [],
        hash:
          '292681094eb2f108c6d3dc41d5f64d873a72301eede3701dee1abc8b2a202c5e',
        name: 'debug',
        type: 'function',
      },
    })
  })

  test('props redefine', () => {
    const props = stamp.props({
      defaultX: 'default',
    })

    const meta = {
      defaultX: 'default',
    }

    expect(diffMetadata(props, stamp).properties).toEqual(meta)

    expect(
      diffMetadata(
        props.props({
          defaultLog: 'empty',
        }),
        stamp,
      ).properties,
    ).toEqual({
      ...meta,
      defaultLog: 'empty',
    })
  })

  test('deep props redefine', () => {
    const meta = {
      Secrets: {
        S3: {
          newKey: 'secret',
        },
      },
    }

    const methods = stamp.deepProps(meta)

    expect(diffMetadata(methods, stamp).deepProperties).toEqual(meta)

    expect(
      diffMetadata(
        methods.deepProps({
          Secrets: {
            S3: {
              keyId: 'bkey',
            },
          },
        }),
        stamp,
      ).deepProperties,
    ).toEqual({
      ...meta,
      Secrets: {
        ...meta.Secrets,
        S3: {
          ...meta.Secrets.S3,
          keyId: 'bkey',
        },
      },
    })
  })
})
