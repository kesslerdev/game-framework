import React from 'react'
import './ResourceSlot.css'

class ResourceSlot extends React.Component {
  render() {
    return (
      <span className={'ResourceSlot' + (this.props.premium ? ' ResourceSlot-premium':'')}>{this.props.name}: {this.props.value}</span>
    );
  }
}

export default ResourceSlot