import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as Humanize from 'humanize-plus'

import {gameObjectSelectors} from '../../../selectors'
import './ResourceSlot.css'

const ResourceSlot = ({ resourceRef, value, resource }) => (
  <span className={'ResourceSlot' + (resource.premium ? ' ResourceSlot-premium':'')}>
    {resource.slug}: {value ? Humanize.intComma(value): '???'}
  </span>
)

ResourceSlot.propTypes = {
  //name: PropTypes.string.isRequired,
  value: PropTypes.number,
  premium: PropTypes.bool
}


const mapStateToProps = (state, props) => {
  return {
    // WARNING: THE FOLLOWING SELECTOR DOES NOT CORRECTLY MEMOIZE
    resource: gameObjectSelectors.getGameObject(state, props.resourceRef)
  }
}

const DataResourceSlot = connect(
  mapStateToProps
)(ResourceSlot)
 //
export default DataResourceSlot
