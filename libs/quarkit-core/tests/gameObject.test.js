import { GameObject } from '../src'

describe('GameObject', () => {
  const Resource = GameObject.createQuark('Resource')

  const gold = Resource({ name: 'Gold' })

  test('name required', () => {
    expect(() => {
      Resource()
    }).toThrow()
  })

  test('no composition', () => {
    const a = GameObject({ name: 'A' })
    expect(a.slug).toBe('A::GameObject<Interop,Quark>')
    expect(gold.slug).toBe('Gold::Resource<GameObject,Interop,Quark>')
  })

  test('equality', () => {
    const cash = Resource({ name: 'Cash' })
    const cash2 = Resource({ name: 'Cash' }) // Same Name
    const cash3 = Object.assign({}, cash2)

    expect(cash.equals(gold)).toBe(false)
    expect(cash.equals(cash2)).toBe(true)
    expect(cash.equals(cash3)).toBe(true)
  })

  test('instanceof', () => {
    expect(gold instanceof Resource).toBe(true)
    expect(gold instanceof GameObject).toBe(true)
  })

  test('instanceof', () => {
    const Person = GameObject.createQuark('Person').implementInteropMethod(
      'loopRelated',
      function () {
        this.itsok = true
      },
    )
    const Meeting = GameObject.createQuark('Meeting').implementInteropMethod(
      'getRelated',
      function () {
        return this.attendees
      },
    )
    const party = Meeting({ name: 'partyA' })
    const smith = Person({ name: 'person' })
    party.attendees = [smith, 'salut']
    party.loop()
    expect(smith.itsok).toBe(true)
  })
})
