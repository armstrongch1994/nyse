import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCompaniesThunk} from '../store/companies'

class ListView extends Component {
  componentDidMount() {
    this.props.getCompanies()
  }
  render() {
    console.log('all companies', this.props.allCompanies)
    return (
      <div className="all-companies-list">
        {this.props.allCompanies.map(companies => {
          return (
            <div key={companies.id}>
              {companies.companyName}
              {companies.sharePrice}
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    allCompanies: state.companyReducer.companies
  }
}
const mapDispatch = dispatch => ({
  getCompanies: () => {
    dispatch(getCompaniesThunk())
  }
})

export default connect(mapState, mapDispatch)(ListView)
