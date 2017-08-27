import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as login from '../actions/player'
import * as go from '../actions/game-object'
import * as resource from '../actions/resource'

import Main from './Main'

const mapStateToProps = (state) => ({ state })

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...login,
    ...go,
    ...resource,
  }, dispatch),
})

const App = connect(mapStateToProps, mapDispatchToProps)(Main)

export default App