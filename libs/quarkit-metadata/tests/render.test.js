import stampit from '@stamp/it'
import {
  stampNameRenderer,
  stringRenderer,
  funcArgsRenderer,
  arrayRenderer,
  objectRenderer,
} from '../src/render'

const baseStamp = stampit()
const stamp = baseStamp.compose({ name: 'myName' })

describe('render', () => {
  test('stampNameRenderer behavior', () => {
    expect(stampNameRenderer(baseStamp)).toBe('Stamp')
    expect(stampNameRenderer(stamp)).toBe('myName')
  })

  test('stringRenderer behavior', () => {
    expect(stringRenderer({})).toBe('[object Object]')
    expect(stringRenderer([])).toBe('')
    expect(stringRenderer(() => 'h')).toBe("() => 'h'")
  })

  test('funcArgsRenderer behavior', () => {
    expect(funcArgsRenderer(() => 'h')).toEqual([])
    expect(funcArgsRenderer((a, b) => 'h')).toEqual(['a', 'b'])
  })

  test('arrayRenderer behavior', () => {
    expect(arrayRenderer({})).toEqual([])
    expect(arrayRenderer()).toEqual([])

    expect(arrayRenderer([1, { c: 3, d: ['4'] }, (f, g) => f + g])).toEqual([
      '1',
      { c: '3', d: ['4'] },
      {
        args: ['f', 'g'],
        hash:
          '720c059ea9354d2dd2b3a2f48b80e8f07d01bcb0db14b1b1b0af7b78fc00ca34',
        name: '',
        type: 'function',
      },
    ])
  })

  test('objectRenderer behavior', () => {
    // array is an object
    expect(objectRenderer(['gg'])).toEqual({ 0: 'gg' })
    expect(objectRenderer()).toEqual({})
    expect(
      objectRenderer({ a: 1, b: { c: 3, d: ['4'] }, e: (f, g) => f + g }),
    ).toEqual({
      a: '1',
      b: { c: '3', d: ['4'] },
      e: {
        args: ['f', 'g'],
        hash:
          '720c059ea9354d2dd2b3a2f48b80e8f07d01bcb0db14b1b1b0af7b78fc00ca34',
        name: 'e',
        type: 'function',
      },
    })
  })
})
