import { Quark } from '../src'

describe('Quark', () => {
  const Resource = Quark.createQuark('Resource').init(function (_) {
    this.opts = {
      name: 'abc',
    }
  })

  test('quark, quarks names', () => {
    expect(Resource.quark).toBe('Resource')
    expect(Resource.quarks).toEqual(
      expect.arrayContaining(['Resource', 'Quark']),
    )
  })

  test('Quark getter', () => {
    expect(Resource().getQuark()).toBe(Resource)
  })

  test('instance of', () => {
    expect(Resource() instanceof Quark).toBe(true)
    expect(Resource() instanceof Resource).toBe(true)
    expect(Quark() instanceof Resource).toBe(false)
  })

  test('clone', () => {
    const res = Resource({ async: true })

    expect(res.clone() === res).toBe(false)
    expect(res.clone().initArg).toMatchObject(res.initArg)
    expect(res.clone().initArg === res.initArg).toBe(false)
    expect(res.clone().clone().opts).toMatchObject(res.opts)
    expect(res.clone().opts === res.opts).toBe(false)

    expect(
      Resource()
        .clone()
        .getQuark(),
    ).toBe(Resource)
    expect(Resource().clone() instanceof Quark).toBe(true)
  })
})
