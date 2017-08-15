import React from 'react'
import Purchasable from './Purchasable'

class PurchasableList extends React.Component {

  render() {
    return (
      <div>
         {this.props.market.map((v, i) =>
          <Purchasable key={i.toString()} purchasable={v} possesor={this.props.possesor} />
        )}
      </div>
    );
  }
}

export default PurchasableList