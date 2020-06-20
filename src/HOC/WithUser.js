import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../store/actions/userActions'

const WithUser = WrappedComponent => {
  class HocComp extends Component {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapStateToProps = ({ user }) => ({ ...user })

  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })

  return connect(mapStateToProps, mapDispatchToProps)(HocComp)
}

export default WithUser