import { api, headers } from '../utils/ReadbleAPI'

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

export function postUpvote(post) {
  return {
    type: 'POST_UPVOTE',
    post
  }
}

export function postDownvote(post) {
  return {
    type: 'POST_DOWNVOTE',
    post
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


export function fetchPosts() {
  return (dispatch) => {
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
      .then((response) => {
        let json = response.json()
        // console.log("JSON looks like this: ", json)
        return json
      })
      // Dispatch the the fetch success action
      .then((posts) => dispatch(postsFetchSuccess(posts)))
      .catch((error) => {
        // If something goes wrong dispatch the error action
        dispatch(postsHasError(true))
        console.log("Something went wrong..", error)
      })
  }
}


// Upvote function
export const upVotePost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    headers,
    method: 'post',
    body: JSON.stringify({
         option: "upVote"
       })
  })
  // I need to add dispatch actions here

  // Downvote function
  export const downVotePost = (postId) => {
    console.log("fired downvote API")
    fetch(`${api}/posts/${postId}`, {
      headers,
      method: 'post',
      body: JSON.stringify({
           option: "downVote"
         })
    })
  }
