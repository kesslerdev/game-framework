import React from 'react'
import ResourceSlot from './ResourceSlot'
//import './Resource.css'

class ResourceBag extends React.Component {
  
  componentDidMount() {
    this.interval = setInterval( () =>
    {
      if(!this.props.player)
        return

      this.props.player.PossessionsObjects.map((go) => {
        if(go.applyProduction !== undefined){
          go.applyProduction(this.props.player)
        }
      })
      
      this.forceUpdate();
    }, 1000)
  }
    
  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <p>
        {this.props.bag.map((v, i) =>
          <ResourceSlot key={i.toString()} name={v.Resource.slug} value={v.Amount} premium={v.Resource.isPremium}/>
        )}
      </p>
    );
  }
}

export default ResourceBag