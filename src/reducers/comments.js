import {
  COMMENTS_FETCH_SUCCESS,
  COMMENT_UPVOTE,
  COMMENT_DOWNVOTE
 } from '../actions/comments'

export function comments (state = [], action) {

  const { id } = action
  let commentToUpdate, stateWithoutComment,
      score, comments, sortedCommentsByDate

  let _ = require('lodash')

  switch (action.type) {
    case COMMENTS_FETCH_SUCCESS:
      return action.comments
    case COMMENT_UPVOTE:
      console.log("Payload is:", action)
      stateWithoutComment = state.filter((comment) => comment.id !== id )
      commentToUpdate = state.find((comment) => comment.id === id)

      score = commentToUpdate.voteScore
      commentToUpdate.voteScore = score + 1

      comments = [
        commentToUpdate,
        ...stateWithoutComment
      ]

      sortedCommentsByDate = _.sortBy(comments, 'timestamp')

      return sortedCommentsByDate
    case COMMENT_DOWNVOTE:
      console.log("Payload is:", action)
      stateWithoutComment = state.filter((comment) => comment.id !== id )
      commentToUpdate = state.find((comment) => comment.id === id)

      score = commentToUpdate.voteScore
      commentToUpdate.voteScore = score - 1

      comments = [
        commentToUpdate,
        ...stateWithoutComment
      ]

      sortedCommentsByDate = _.sortBy(comments, 'timestamp')

      return sortedCommentsByDate
    default:
      return state
  }
}
