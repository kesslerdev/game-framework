import React from 'react'
import PropTypes from 'prop-types'

import ResourceSlot from './ResourceSlot'

const ResourceBag = ({ bag }) => (
  <div>
    {bag.map((v, i) =>
      <ResourceSlot key={i.toString()} resourceRef={v.resource} value={v.amount}/>
    )}
  </div>
)

ResourceBag.propTypes = {
  bag: PropTypes.array.isRequired
}
 //
export default ResourceBag