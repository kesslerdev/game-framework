import React from 'react'
import PropTypes from 'prop-types'
import * as Humanize from 'humanize-plus'

import './ResourceSlot.css'

const ResourceSlot = ({ name, value, premium }) => (
  <span className={'ResourceSlot' + (premium ? ' ResourceSlot-premium':'')}>
    {name}: {Humanize.intComma(value)}
  </span>
)

ResourceSlot.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  premium: PropTypes.bool
}
 //
export default ResourceSlot