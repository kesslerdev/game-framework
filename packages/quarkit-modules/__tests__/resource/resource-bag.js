import { mix } from 'quarkit-mixin'

import { ResourceMixin, ResourceBagMixin, ResourceSlotMixin, ResourceSlot } from '../../src/resource'


describe('Resource Bag Mixin ', () => {

  const Resource = class extends mix().with(ResourceMixin) {}
  const resource = new Resource()

  it('Resource Bag Mixin Use default slot if not provided', () => {

    const ResourceBag = class extends mix().with(ResourceBagMixin) {}
    
    expect(ResourceBag.ResourceSlotClass).toBe(ResourceSlot)

  })

  it('a Resource Slot should be initilized to zero.', () => {

    const ResourceBag = class extends mix().with(ResourceBagMixin) {}

    const myBag = new ResourceBag()
    

    myBag.addResourceSlot(resource)
    
    expect(ResourceBag.ResourceSlotClass).toBe(ResourceSlot)

  })

  it('a Resource Slot can be overrided.', () => {

    const ResourceBag = class extends mix().with(ResourceBagMixin) {}
    const OtherResourceBag = class extends mix().with(ResourceBagMixin) {}
    const NewResourceSlot = class extends mix().with(ResourceSlotMixin) {}

    ResourceBag.ResourceSlotClass = NewResourceSlot

    expect(ResourceBag.ResourceSlotClass).toBe(NewResourceSlot)
    expect(OtherResourceBag.ResourceSlotClass).toBe(ResourceSlot)

  })
})
