import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as login from '../actions/player'
import * as actions from 'quarkit-redux/actions'

import Main from './Main'

const mapStateToProps = (state) => ({ state })

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...login,
    ...actions,
  }, dispatch),
})

const App = connect(mapStateToProps, mapDispatchToProps)(Main)

export default App