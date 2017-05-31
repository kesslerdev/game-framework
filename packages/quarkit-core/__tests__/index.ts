import { GameObject } from '../src/quarkit-core'

describe('start', () => {
  it('class Start can say hello world', () => {
    const go = new GameObject('hello')

    expect(go.Slug).toBe('hello')

  })
})