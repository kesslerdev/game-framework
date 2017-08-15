import React from 'react'
import './ResourceSlot.css'

import * as Humanize from 'humanize-plus'

class ResourceSlot extends React.Component {
  render() {
    return (
      <span className={'ResourceSlot' + (this.props.premium ? ' ResourceSlot-premium':'')}>
        {this.props.name}: {Humanize.intComma(this.props.value)}
      </span>
    );
  }
}

export default ResourceSlot