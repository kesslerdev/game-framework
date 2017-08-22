import React from 'react'
import PropTypes from 'prop-types'

const Login = ({ onClick }) => (
  <div>
    <button onClick={onClick}>
      Login
    </button>
  </div>
)

Login.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default Login