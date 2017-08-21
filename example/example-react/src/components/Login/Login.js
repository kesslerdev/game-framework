import React from 'react'
import PropTypes from 'prop-types'

const Login = ({ onClick }) => (
  <button onClick={onClick}>
      Login
  </button>
)

Login.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default Login