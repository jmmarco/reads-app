import { api, headers } from '../utils/ReadbleAPI'

export const COMMENTS_FETCH_SUCCESS = 'COMMENTS_FETCH_SUCCESS'
export const COMMENT_UPVOTE = 'COMMENT_UPVOTE'
export const COMMENT_DOWNVOTE = 'COMMENT_DOWNVOTE'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'

const uuid = require('uuid/v1')

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

export function addCommentSuccess(comment) {
  return {
    type: ADD_COMMENT_SUCCESS,
    comment
  }
}


// API Stuff
export function fetchComments(id) {
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
  return (dispatch) => {
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
      console.log("Something went wrong with upVote: ", error)
    })
  }

}

export function downVote(comment) {
  return (dispatch) => {
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

export function addComment(comment) {
  console.log("inside add comment!")
  return (dispatch) => {
    fetch(`${api}/comments`, {
      headers,
      method: 'POST',
      body: JSON.stringify({
           id: uuid(),
           timestamp: Date.now(),
           body: comment.body,
           author: comment.author,
           parentId: comment.parentId
         })
    })
    .then((response) => {
      return response.json()
    })
    .then((comment) => {
      // history.push(`/comments/${comment.id}`)
      dispatch(addCommentSuccess(comment))
    })
    .catch((error) => {
      console.log("Something went wrong with addComment: ", error)
    })
  }
}
