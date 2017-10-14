import React from 'react'
import PropTypes from 'prop-types'
import "@material/button/dist/mdc.button.css"

const Login = ({ onClick }) => (
  <div>
    <button onClick={onClick} className="mdc-button mdc-button--raised">
      Login
    </button>
  </div>
)

Login.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default Login
