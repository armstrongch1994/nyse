import axios from 'axios'
import history from '../history'

const GET_COMPANIES = 'GET_COMPANIES'
const getCompanies = companies => ({
  type: GET_COMPANIES,
  companies
})

//initial state
const initialState = {
  companies: []
}

export const getCompaniesThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/companies')
    dispatch(getCompanies(data))
  } catch (err) {
    console.error(err)
  }
}

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPANIES:
      return {...state, companies: action.companies}
    default:
      return state
  }
}

export default companyReducer
