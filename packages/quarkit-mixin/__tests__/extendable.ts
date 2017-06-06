import { mixin, Extendable } from '../src/quarkit-mixin'


describe('Extendable', () => {

  it('class Extendable init collections', () => {
    //create mixin
    let mx = mixin('X',{})

    //create instance
    let ie:any = new Extendable
    expect(ie.Extensions).toBeDefined()
    expect(ie.Constructors).toBeDefined()

    expect(ie.Extensions).toHaveLength(0)
    expect(ie.Constructors).toHaveLength(0)
  })

})


  


