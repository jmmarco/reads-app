import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {

  render() {

    return (
      <header className="app-header">
        <h1><Link to={`/`}>My Reads App</Link></h1>
      </header>
    )

  }

}

export default Header
