import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as login from '../actions/player'
import * as go from '../actions/game-object'

import Main from './Main'

const mapStateToProps = (state) => ({ state })

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...login,
    ...go,
  }, dispatch),
})

const App = connect(mapStateToProps, mapDispatchToProps)(Main)

export default App