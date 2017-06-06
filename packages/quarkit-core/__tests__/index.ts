import { GameObject } from '../src/quarkit-core'

describe('start', () => {
  it('class Start can say hello world', () => {
    const go = new GameObject('hello')

    expect(go.Slug).toBe('hello')

  })
  
  it('GameObject Equality', () => {
    class go extends GameObject{}

    const GOh = new GameObject('hello')
    const GOh2 = new GameObject('hello')
    const GOhw = new GameObject('hello_world')

    const goh = new go('hello')
    const goh2 = new go('hello')
    const gohw = new go('hello_world')

    //same type, same slug
    expect(GOh.Equals(GOh2)).toBe(true)
    expect(goh.Equals(goh2)).toBe(true)

    //same type, different slug
    expect(GOh.Equals(GOhw)).toBe(false)
    expect(goh.Equals(gohw)).toBe(false)

    //different type, different slug
    expect(GOh.Equals(gohw)).toBe(false)

  })
})