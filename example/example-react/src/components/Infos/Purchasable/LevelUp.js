import React from 'react'
import { connect } from 'react-redux'
import { levelUp } from 'quarkit-redux/actions'
import { Registry } from 'quarkit-redux'

import "@material/button/dist/mdc.button.css"

const LevelUp = ({ possessor, upgrade, onLevelUpClick }) => {

  const canLevelUp = () => {
    return Registry.getGO(upgrade).canLevelupFor(Registry.getGO(possessor))
  }
  return (
    <button style={{ width: 'auto' }} disabled={!canLevelUp()} className="mdc-button mdc-list-item__end-detail material-icons" onClick={()=>onLevelUpClick(upgrade, possessor)}>
      LevelUp {upgrade.levelUpCost.map((cost) => `${cost.amount} ${cost.resource.slug}`)}
    </button>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onLevelUpClick: (upgrade, possessor) => {
      dispatch(levelUp(upgrade, possessor))
    }
  }
}
const DataLevelUp = connect(
  null,
  mapDispatchToProps
)(LevelUp)
 //
export default DataLevelUp
