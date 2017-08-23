import React from 'react'
import PropTypes from 'prop-types'

import ResourceSlot from './ResourceSlot'

const ResourceBag = ({ bag }) => (
  <div>
    {bag.map((v, i) =>
      <ResourceSlot key={i.toString()} name={v.resource.slug} value={v.amount} premium={false}/>
    )}
  </div>
)

ResourceBag.propTypes = {
  bag: PropTypes.array.isRequired
}
 //
export default ResourceBag