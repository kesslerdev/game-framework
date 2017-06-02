
import { IExtendable } from './quarkit-mixin';
import { inspect } from 'util';

function mixinsAccessor(target: any) {
    return function () {
        return target.__mixins || (target.__mixins = []);
    }
}

function constructorsAccessor(target: any) {
    return function () {
        return target.__constructors || (target.__constructors = []);
    }
}


export function mixin(mixinTag: string, behaviour: any, constructor?:any, options : { dependencies?:Array<string> } = {}) {
    const instanceKeys = Reflect.ownKeys(behaviour);
    const typeTag = Symbol('quarkit-mixin');

    function _mixin(target: any): any | IExtendable {

        //# Addons IExtendable
        if (!Reflect.has(target.prototype, 'Extensions')){
            Object.defineProperty(target.prototype, 'Extensions', { get: mixinsAccessor(target.prototype) })
        }

        if (!Reflect.has(target.prototype, 'Constructors')){
            Object.defineProperty(target.prototype, 'Constructors', { get: constructorsAccessor(target.prototype) })

        }

        if(!Reflect.has(target.prototype, typeTag)) {
            Object.defineProperty(target.prototype, typeTag, { value: true })
        }

        //# Checks
        if (Reflect.has(options, 'dependencies')) {
            for (let dep in options.dependencies) {
                if(!target.prototype.Extensions.includes(options.dependencies[dep])) {
                    throw new Error(`"${mixinTag}" depend [${options.dependencies.join()}] mixins`)
                }
            }
        }
        //not twice
        if(target.prototype.Extensions.includes(mixinTag)) {
            throw new Error(`Cannot set already added mixin "${mixinTag}"`)
        } else {
            target.prototype.Extensions.push(mixinTag)
            if(typeof(constructor) == 'function') {
                target.prototype.Constructors.push(constructor)
            }
        }    
        
        //# Copy properties
        for (let property of instanceKeys) {
            //do not replace a property if exists
            if (!Reflect.has(target.prototype, property)) {
                Object.defineProperty(target.prototype, property, Object.getOwnPropertyDescriptor(behaviour, property))
            }
        }
        return target;
    }
    //for instanceof
    Object.defineProperty(_mixin, Symbol.hasInstance, {
        value: (i: any) => !!i[typeTag] && i.Extensions.includes(mixinTag)
    });

    return _mixin;
}