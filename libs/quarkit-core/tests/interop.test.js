import { Interop, interopMethodTypes } from '../src'

describe('Interop', () => {
  test('[default] composing attendees', () => {
    const BaseEvent = Interop.createQuark('Event').createInteropMethod(
      'getAttendees',
    )
    const DevParty = BaseEvent.implementInteropMethod('getAttendees', () => [
      'kessler',
    ]).implementInteropMethod('getAttendees', () => ['otherdev'])

    expect(DevParty().getAttendees()).toContain('kessler', 'otherdev')
    expect(BaseEvent().getAttendees()).toHaveLength(0)
  })

  test('[flattenDeep] composing attendees', () => {
    const BaseEvent = Interop.createQuark('Event').createInteropMethod(
      'getAttendees',
      { type: interopMethodTypes.flattenDeep, uniq: false },
    )
    const returnKessler = () => ['kessler']
    const DevParty = BaseEvent.implementInteropMethod(
      'getAttendees',
      returnKessler,
    ).implementInteropMethod('getAttendees', returnKessler)

    expect(DevParty().getAttendees()).toEqual(
      expect.arrayContaining(['kessler', 'kessler']),
    )
    expect(DevParty().getAttendees()).toHaveLength(2)
    expect(BaseEvent().getAttendees()).toHaveLength(0)
  })

  test('[loop] composing attendees uniq', () => {
    const BaseEvent = Interop.createQuark('Event').createInteropMethod(
      'setupAttendees',
      { type: interopMethodTypes.loop },
    )
    const attendees = []
    const addOtherDev = () => attendees.push('otherdev')
    const DevParty = BaseEvent.implementInteropMethod('setupAttendees', () => attendees.push('kessler')).implementInteropMethod('setupAttendees', addOtherDev)

    const AnotherDevParty = DevParty.implementInteropMethod(
      'setupAttendees',
      () => attendees.push('kessler'), // new method
    ).implementInteropMethod('setupAttendees', addOtherDev)

    const party = AnotherDevParty()
    party.setupAttendees()
    expect(attendees).toContain('kessler', 'otherdev')
    expect(attendees).toHaveLength(3)
  })

  test('[reduce] handling list', () => {
    const Handler = Interop.createQuark('Handler').createInteropMethod(
      'handleList',
      {
        type: interopMethodTypes.reduce,
      },
    )
    const ResourceHandler = Handler.implementInteropMethod(
      'handleList',
      list => {
        if (list.resources) {
          const clone = Object.assign({}, list)
          delete clone.resources
          return clone
        }

        return list
      },
    )

    const ObjectHandler = ResourceHandler.implementInteropMethod(
      'handleList',
      list => {
        if (list.objects) {
          const clone = Object.assign({}, list)
          delete clone.objects
          return clone
        }

        return list
      },
    )

    const NothingHandler = ObjectHandler.implementInteropMethod(
      'handleList',
      _ => {},
    )

    const handleResult = NothingHandler().handleList({
      resources: ['rA', 'rB'],
      objects: ['oA', 'oB'],
      other: ['oA', 'oB'],
    })

    expect(handleResult).toMatchObject({ other: ['oA', 'oB'] })
  })
})
