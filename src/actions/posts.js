import { api, headers } from '../utils/ReadbleAPI'

export const POSTS_HAS_ERROR = 'POSTS_HAS_ERROR'
export const POSTS_IS_LOADING = 'POSTS_IS_LOADING'
export const POSTS_FETCH_SUCCESS = 'POSTS_FETCH_SUCCESS'
export const POST_UPVOTE = 'POST_UPVOTE'
export const POST_DOWNVOTE = 'POST_DOWNVOTE'
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS'
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const SORT_POSTS_BY_DATE_ASC = 'SORT_POSTS_BY_DATE_ASC'
export const SORT_POSTS_BY_DATE_DSC = 'SORT_POSTS_BY_DATE_DSC'
export const SORT_POSTS_BY_SCORE_ASC = 'SORT_POSTS_BY_SCORE_ASC'
export const SORT_POSTS_BY_SCORE_DSC = 'SORT_POSTS_BY_SCORE_DSC'

const uuid = require('uuid/v1')

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


export function updatePostSuccess(post) {
  return {
    type: UPDATE_POST_SUCCESS,
    post
  }
}

export function removePostSuccess(id) {
  return {
    type: REMOVE_POST_SUCCESS,
    id: id
  }
}

export function addPostSuccess(post) {
  return {
    type: ADD_POST_SUCCESS,
    post
  }
}

export function sortPostsByDateAsc(posts) {
  return {
    type: SORT_POSTS_BY_DATE_ASC,
    posts
  }
}

export function sortPostsByDateDsc(posts) {
  return {
    type: SORT_POSTS_BY_DATE_DSC,
    posts
  }
}

export function sortPostsByScoreAsc(posts) {
  return {
    type: SORT_POSTS_BY_SCORE_ASC,
    posts
  }
}

export function sortPostsByScoreDsc(posts) {
  return {
    type: SORT_POSTS_BY_SCORE_DSC,
    posts
  }
}

// End of action creators



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
        return json
      })
      // Dispatch the the fetch success action
      .then((posts) => dispatch(postsFetchSuccess(posts)))
      .catch((error) => {
        // If something goes wrong dispatch the error action
        dispatch(postsHasError(true))
        console.log("Something went wrong fetching posts..", error)
      })
  }
}


// Upvote function

export function downVote(post) {
  return (dispatch) => {
    fetch(`${api}/posts/${post.id}`, {
      headers,
      method: 'post',
      body: JSON.stringify({
           option: "downVote"
         })
    })
    .then((post) => {
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
  return (dispatch) => {
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

export function updatePost(post) {
  return (dispatch) => {
    fetch(`${api}/posts/${post.id}`, {
      headers,
      method: 'PUT',
      body: JSON.stringify({
           title: post.title,
           body: post.body
         })
    })
    .then((post) => {
      return post.json()
    })
    .then((post) => {
      dispatch((updatePostSuccess(post)))
    })
    .catch((error) => {
      console.log("Something went wrong with updating post")
    })
  }
}


export function deletePost(post) {
  return (dispatch) => {
    fetch(`${api}/posts/${post.id}`, {
      headers,
      method: 'DELETE',
    })
    .then((response) => {
      return response
    })
    .then((response) => {
      dispatch(removePostSuccess(post.id))
    })
    .catch((error) => {
      console.log("Something went wrong with removing post")
    })
  }
}

export function addPost(post, history) {
  return (dispatch) => {
    fetch(`${api}/posts`, {
      headers,
      method: 'POST',
      body: JSON.stringify({
           id: uuid(),
           timestamp: Date.now(),
           title: post.title,
           body: post.body,
           author: post.author,
           category: post.category
         })
    })
    .then((post) => {
      return post.json()
    })
    .then((post) => {
      history.push(`/posts/${post.id}`)
      dispatch(addPostSuccess(post))
    })
    .catch((error) => {
      console.log("Something went wrong with addPost!", error)
    })
  }
}
