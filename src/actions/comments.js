import { api, headers } from '../utils/ReadbleAPI'

export const COMMENTS_FETCH_SUCCESS = 'COMMENTS_FETCH_SUCCESS'
export const COMMENT_UPVOTE = 'COMMENT_UPVOTE'
export const COMMENT_DOWNVOTE = 'COMMENT_DOWNVOTE'


// I need action creators
export function commentsFetchSuccess(comments) {
  return {
    type: COMMENTS_FETCH_SUCCESS,
    comments
  }
}

export function commentUpVote(comment) {
  return {
    type: COMMENT_UPVOTE,
    voteScore: comment.voteScore,
    id: comment.id
  }
}

export function commentDownVote(comment) {
  return {
    type: COMMENT_DOWNVOTE,
    voteScore: comment.voteScore,
    id: comment.id
  }
}


// API Stuff
export function fetchComments(id) {
  console.log("Inside fetchComments")
  return (dispatch) => {
    fetch(`${api}/posts/${id}/comments`, {
      headers,
      method: 'GET'
    })
    .then((response) => {
      return response.json()
    })
    .then((comments) => {
      console.log(comments)
      dispatch(commentsFetchSuccess(comments))
    })
    .catch((error) => {
      console.log("Something went wrong when fetching comments: ", error)
    })
  }
}

export function upVote(comment) {

  console.log("inside downVote action")

  return (dispatch) => {
    console.log("Dispatching....")
    fetch(`${api}/comments/${comment.id}`, {
      headers
    })
    .then((response) => {
      return response.json()
    })
    .then((comment) => {
      dispatch(commentUpVote(comment))
    })
    .catch((error) => {
      console.log("Something went wrong with downvote: ", error)
    })
  }

}

export function downVote(comment) {

  console.log("inside downVote action")

  return (dispatch) => {
    console.log("Dispatching....")
    fetch(`${api}/comments/${comment.id}`, {
      headers
    })
    .then((response) => {
      return response.json()
    })
    .then((comment) => {
      dispatch(commentDownVote(comment))
    })
    .catch((error) => {
      console.log("Something went wrong with downvote: ", error)
    })
  }

}
