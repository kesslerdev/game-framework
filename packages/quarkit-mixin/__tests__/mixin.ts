import { inspect } from 'util'
import { mixin, Extendable } from '../src/quarkit-mixin'


describe('mixin', () => {

  it('should create Properties needed if not present', () => {
    //create mixin
    let mx = mixin('X',{})
    class cx {}
    //apply mixin
    mx(cx)

    //create instance
    let ix:any = new cx
    expect(ix.Extensions).toBeDefined()
    expect(ix.Constructors).toBeDefined()
  });

  it('should create Properties', () => {
    //create mixin
    let mx = mixin('X',{
      get value() : boolean {
        return true
      }
      
    })
    class cx {}
    //apply mixin
    mx(cx)

    //create instance
    let ix:any = new cx
    expect(ix.value).toBeDefined()
    expect(ix.value).toBe(true)
  });

  it('do not replace a property if exists', () => {
    //create mixin
    let mx = mixin('X',{
      get value() : boolean {
        return true
      }
      
    })
    class cx {
      get value(){
        return false
      }
    }
    //apply mixin
    mx(cx)

    //create instance
    let ix:any = new cx
    expect(ix.value).toBe(false)
  });

  it('an instance of a class decorated by a mixin should have instance of mixin', () => {
    //create mixin
    let mx = mixin('X',{})
    let my = mixin('Y',{})
    class cx {}
    //apply mixin
    mx(cx)

    //create instance
    let ix = new cx
    expect(ix instanceof mx).toBe(true)
    expect(ix instanceof my).toBe(false)
  });

  it('a mixin can declare an another mixin required', () => {
    //create mixin
    let mx = mixin('X',{},null,{
      dependencies:['Y']
    })

    let my = mixin('Y',{})

    class cx {}

    //apply mixin with error
    expect(_=>{
      mx(cx)
    }).toThrow()

    // Apply first my then apply mx
    my(cx)
    mx(cx)
    //create instance
    let ix = new cx
    expect(ix instanceof mx).toBe(true)
    expect(ix instanceof my).toBe(true)
  });

  it('a mixin cannot be applyed twice', () => {
    //create mixin
    let mx = mixin('X',{})

    class cx {}

    mx(cx)
    
    //apply mixin with error
    expect(_=>{
      mx(cx)
    }).toThrow()
  });

  it('mixin have theses constructor linked to decorated class', () => {
    
    //create mixin
    let mx = mixin('X', {}, _ => {
    })

    class cx {}

    mx(cx)

    //create instance
    let ix:any = new cx

    //apply mixin with error
    //console.log(typeof ix.Constructors)

    expect(ix.Constructors.length).toEqual(1)
  });

  it('decorated class have to call constructors ', () => {

    //create mixin
    let mx = mixin('X', {}, _ => {
      _.called = true
    })

    let my = mixin('Y', {}, _ => {
      _.called = true
    })

    class cx {}

    class cy extends Extendable {
    }

    mx(cx)
    my(cy)

    //create instance
    let ix:any = new cx
    let iy:any = new cy

    //apply mixin with error
    //console.log(typeof ix.Constructors)

    expect(ix.called).toBeFalsy()
    expect(iy.called).toBe(true)
  });

});