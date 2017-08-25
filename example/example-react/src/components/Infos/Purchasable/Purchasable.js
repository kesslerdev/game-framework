import React from 'react'
import Purchase from './Purchase'
import './Purchasable.css'

class Purchasable extends React.Component {

  getButton() {
    if(!this.isPurchased()) {
      return <Purchase onClick={() => this.purchase()} possesor={this.props.possesor}/>
    }
    return null
  }

  isPurchased() {
    return this.props.possesor.possessions.find(
      go => go.slug === this.props.purchasable.slug && go.typeName === this.props.purchasable.typeName) !== undefined
  }

  purchase() {
    this.props.purchasable.purchaseFor(this.props.possesor)
    this.forceUpdate()
  }

  render() {
    //const isPossesed = this.state.mine
    const className = 'Purchasable ' + (this.isPurchased() ? 'Purchasable-mine' :'')
    return (

      <div className={className}>
        Building : {this.props.purchasable.slug}
        {this.getButton()}
      </div>
    );
  }
}

export default Purchasable