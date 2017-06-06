import { inspect } from 'util'
import { mixin, Extendable, classAsMixin } from '../src/quarkit-mixin'


describe('classAsMixin', () => {

  it('classAsMixin should only works with a constructor', () => {
    class X{}

    let ix = new X

    //create mixin with error
    expect(_=>{
       classAsMixin(ix)
    }).toThrow()
  });

  it('should create Properties needed if not present', () => {
    class X{}
    //create mixin
    let mx = classAsMixin(X)

    class cx {}
    //apply mixin
    mx(cx)

    //create instance
    let ix:any = new cx
    expect(ix.Extensions).toBeDefined()
    expect(ix.Constructors).toBeDefined()
  });

  it('should create Properties', () => {
    class X{
      get value() : boolean {
        return true
      }
    }
    //create mixin
    let mx = classAsMixin(X)

    class cx {}
    //apply mixin
    mx(cx)

    //create instance
    let ix:any = new cx
    expect(ix.value).toBeDefined()
    expect(ix.value).toBe(true)
  });

  it('do not replace a property if exists', () => {
    class X{
      get value() : boolean {
        return true
      }
    }
    //create mixin
    let mx = classAsMixin(X)

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
    class X{}
    class Y{}
    //create mixin
    let mx = classAsMixin(X)
    let my = classAsMixin(Y)
    
    class cx {}
    //apply mixin
    mx(cx)

    //create instance
    let ix = new cx
    expect(ix instanceof mx).toBe(true)
    expect(ix instanceof my).toBe(false)
  });

  it('a mixin can declare an another mixin required', () => {
    class X{}
    class Y{}
    //create mixin
    let mx = classAsMixin(X,{
      dependencies:['Y']
    })
    let my = classAsMixin(Y)

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
    class X{}
    //create mixin
    let mx = classAsMixin(X)

    class cx {}

    mx(cx)
    
    //apply mixin with error
    expect(_=>{
      mx(cx)
    }).toThrow()
  });

  it('mixin have theses constructor linked to decorated class', () => {
    
    class X{
      initialize() {
        this.x = 1
      }
    }
    //create mixin
    let mx = classAsMixin(X)

    class cx {}

    mx(cx)

    //create instance
    let ix:any = new cx

    //apply mixin with error
    //console.log(typeof ix.Constructors)

    expect(ix.Constructors.length).toEqual(1)
  });

  it('decorated class have to call constructors ', () => {

    class X{
      initialize(){
        this.called = true
      }
    }
    class Y{
      initialize(){
        this.called = true
      }
    }
    //create mixin
    let mx = classAsMixin(X)
    let my = classAsMixin(Y)

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

  it('a class mixin cannot not have a constructor', () => {
    
    class X{
    }
    class Y{
      constructor(){

      }
    }
    let mx = classAsMixin(X)
    //create mixin with error
    //TODO: this line should thorw an error
    let my = classAsMixin(Y)
  });
});