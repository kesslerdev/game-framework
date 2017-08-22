import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as login from '../actions/player'

import Main from './Main'

const mapStateToProps = (state) => ({ state })

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...login,
  }, dispatch),
})

const App = connect(mapStateToProps, mapDispatchToProps)(Main)

export default App