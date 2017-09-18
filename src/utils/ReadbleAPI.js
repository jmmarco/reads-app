const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:5001'

// Generate a unique token for storing the Posts data on the backend server
let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategories = () =>
  fetch(`${api}/categories`, {
    headers
  })
  .then(res => res.json())
  .then(data => console.log(data))

  export function fetchPosts(url) {
    return (dispatch) => {
      // Dispatch the loading action (true)
      dispatch(postsIsLoading(true))
      fetch(url)
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
