import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as Humanize from 'humanize-plus'

import { getGameObject } from '../../../selectors'
import './ResourceSlot.css'

const ResourceSlot = ({ resourceRef, value, resource }) => (
  <span className={'ResourceSlot' + (resource.premium ? ' ResourceSlot-premium':'')}>
    {resource.slug}: {Humanize.intComma(value)}
  </span>
)

ResourceSlot.propTypes = {
  //name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  premium: PropTypes.bool
}


const mapStateToProps = (state, props) => {
  return {
    // WARNING: THE FOLLOWING SELECTOR DOES NOT CORRECTLY MEMOIZE
    resource: getGameObject(state, props.resourceRef)
  }
}

const DataResourceSlot = connect(
  mapStateToProps
)(ResourceSlot)
 //
export default DataResourceSlot