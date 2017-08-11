import { mix } from 'quarkit-mixin'

import { ResourceMixin} from '../../src/resource'


describe('Resource Mixin ', () => {


  it('Resource Mixin are not premium by default', () => {

    const Resource = class extends mix().with(ResourceMixin) {}
    
    const resource = new Resource()

    expect(resource.isPremium).toBeFalsy()
  })
})
