import { GameObject } from '../src/quarkit-core'

describe('start', () => {
  it('class Start can say hello world', () => {
    const go = GameObject.createGameObject('hello')

    expect(go.slug).toBe('hello')

  })
  
  it('GameObject Equality', () => {
    class go extends GameObject{}

    const GOh = GameObject.createGameObject('hello')
    const GOh2 = GameObject.createGameObject('hello')
    const GOhw = GameObject.createGameObject('hello_world')

    const goh = go.createGameObject('hello')
    const goh2 = go.createGameObject('hello')
    const gohw = go.createGameObject('hello_world')

    //same type, same slug
    expect(GOh.equals(GOh2)).toBe(true)
    expect(goh.equals(goh2)).toBe(true)

    //same type, different slug
    expect(GOh.equals(GOhw)).toBe(false)
    expect(goh.equals(gohw)).toBe(false)

    //different type, different slug
    expect(GOh.equals(gohw)).toBe(false)

  })
})