import { api, headers } from '../utils/ReadbleAPI'

export const POSTS_HAS_ERROR = 'POSTS_HAS_ERROR'
export const POSTS_IS_LOADING = 'POSTS_IS_LOADING'
export const POSTS_FETCH_SUCCESS = 'POSTS_FETCH_SUCCESS'
export const POST_UPVOTE = 'POST_UPVOTE'
export const POST_DOWNVOTE = 'POST_DOWNVOTE'


// ACTION CREATORS

export function postsHasError(bool) {
  return {
    type: POSTS_HAS_ERROR,
    hasError: bool
  }
}

export function postsIsLoading(bool) {
  return {
    type: POSTS_IS_LOADING,
    isLoading: bool
  }
}

export function postsFetchSuccess(posts) {
  return {
    type: POSTS_FETCH_SUCCESS,
    posts
  }
}

// Remember, send as little info as required for each action
export function postUpVote(post) {
  return {
    type: POST_UPVOTE,
    voteScore: post.voteScore,
    id: post.id
  }
}

export function postDownVote(post) {
  return {
    type: POST_DOWNVOTE,
    voteScore: post.voteScore,
    id: post.id
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

export function downVote(post) {

  console.log("inside downVote action")

  return (dispatch) => {
    console.log("Dispatching....")
    fetch(`${api}/posts/${post.id}`, {
      headers,
      method: 'post',
      body: JSON.stringify({
           option: "downVote"
         })
    })
    .then((post) => {
      console.log(post)
      return post.json()
    })
    .then((post) => {
      dispatch(postDownVote(post))
    })
    .catch((error) => {
      console.log("Something went wrong with downvote: ", error)
    })
  }

}

export function upVote(post) {
  console.log("inside upVote action", post.id)
  return (dispatch) => {
    console.log("dispatching...")
    fetch(`${api}/posts/${post.id}`, {
      headers,
      method: 'post',
      body: JSON.stringify({
           option: "upVote"
         })
    })
    .then((post) => {
      return post.json()
    })
    .then((post) => {
      dispatch(postUpVote(post))
    })
    .catch((error) => {
      console.log("Something went wrong with downvote: ", error)
    })
  }

}
