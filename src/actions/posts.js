
export function postsHasError(bool) {
  return {
    type: 'POSTS_HAS_ERROR',
    hasError: bool
  }
}

export function postsIsLoading(bool) {
  return {
    type: 'POSTS_IS_LOADING',
    isLoading: bool
  }
}

export function postsFetchSuccess(posts) {
  return {
    type: 'POSTS_FETCH_SUCCESS',
    posts
  }
}



export function errorAfterFiveSeconds() {
  // We return a function instead of an action object
  return (dispatch) => {
    setTimeout(() => {
    // This function is able to dispatch other action creators
      dispatch(postsHasError(true))
    }, 5000)
  }
}


const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:5001'

// Generate a unique token for storing the Posts data on the backend server
let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}


export function fetchPosts() {
  return (dispatch) => {
    // Dispatch the loading action (true)
    dispatch(postsIsLoading(true))
    console.log(api)
    fetch(`${api}/posts`, {headers})
      .then((response) => {
        if (!response.ok) {
          throw Error (response.statusText)
        }
        // Since an error occurred, dispatch the loading action (false)
        dispatch(postsIsLoading(false))

        return response
      })
      // If all goes well parse the response into a JSON format
      .then((response) => response.json())
      // Dispatch the the fetch success action
      .then((posts) => dispatch(postsFetchSuccess(posts)))
      .catch((error) => {
        // If something goes wrong dispatch the error action
        dispatch(postsHasError(true))
        console.log("Something went wrong..", error)
      })
  }
}
