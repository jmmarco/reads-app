// import * as ReadbleAPI from '../utils/ReadbleAPI'

export function categoriesHasError(bool) {
  return {
    type: 'CATEGORIES_HAS_ERROR',
    hasError: bool
  }
}

export function categoriesIsLoading(bool) {
  return {
    type: 'CATEGORIES_IS_LOADING',
    isLoading: bool
  }
}

export function categoriesFetchSuccess(categories) {
  return {
    type: 'CATEGORIES_FETCH_SUCCESS',
    categories
  }
}

export function errorAfterFiveSeconds() {
  // We return a function instead of an action object
  return (dispatch) => {
    setTimeout(() => {
    // This function is able to dispatch other action creators
      dispatch(categoriesHasError(true))
    }, 5000)
  }
}



//  I hate that i'm repeating this code again...
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:5001'

// Generate a unique token for storing the categories data on the backend server
let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}


export function fetchCategories() {
  return (dispatch) => {
    // Dispatch the loading action (true)
    dispatch(categoriesIsLoading(true))
    console.log(api)
    fetch(`${api}/categories`, {headers})
      .then((response) => {
        if (!response.ok) {
          throw Error (response.statusText)
        }
        // Since an error occurred, dispatch the loading action (false)
        dispatch(categoriesIsLoading(false))

        return response
      })
      // If all goes well parse the response into a JSON format
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        console.log(response.categories)
        let responseArray = Object.keys(response.categories).map((k) => response.categories[k])
        console.log("the JSON array looks like: ", responseArray)

        return responseArray
      })
      // Dispatch the the fetch success action
      .then((categories) => dispatch(categoriesFetchSuccess(categories)))
      .catch((error) => {
        // If something goes wrong dispatch the error action
        dispatch(categoriesHasError(true))
        console.log("Something went wrong..", error)
      })
  }
}
