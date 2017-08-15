import React from 'react'

class Purchase extends React.Component {  
    render() {

      return (
        <button onClick={() => this.props.onClick()}>
          Buy
        </button>
      );
    }
  }
  
  export default Purchase