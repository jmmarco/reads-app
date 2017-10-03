import { api, headers } from '../utils/ReadbleAPI'

export const CATEGORIES_HAS_ERROR = 'CATEGORIES_HAS_ERROR'
export const CATEGORIES_IS_LOADING = 'CATEGORIES_IS_LOADING'
export const CATEGORIES_FETCH_SUCCESS = 'CATEGORIES_FETCH_SUCCESS'

export function categoriesHasError(bool) {
  return {
    type: CATEGORIES_HAS_ERROR,
    hasError: bool
  }
}

export function categoriesIsLoading(bool) {
  return {
    type: CATEGORIES_IS_LOADING,
    isLoading: bool
  }
}

export function categoriesFetchSuccess(categories) {
  return {
    type: CATEGORIES_FETCH_SUCCESS,
    categories
  }
}

export function fetchCategories() {
  return (dispatch) => {
    // Dispatch the loading action (true)
    dispatch(categoriesIsLoading(true))
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
