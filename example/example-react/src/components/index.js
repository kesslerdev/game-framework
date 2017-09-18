import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from 'quarkit-redux/actions'

import Main from './Main'

const mapStateToProps = (state) => ({ state })

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...actions,
  }, dispatch),
})

const App = connect(mapStateToProps, mapDispatchToProps)(Main)

export default App