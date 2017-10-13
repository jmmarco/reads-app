import React, { Component } from 'react'
import { fetchComments, upVote, downVote, deleteComment } from '../actions/comments'
import { connect } from 'react-redux'
import ArrowUp from 'react-icons/lib/fa/arrow-circle-o-up'
import ArrowDown from 'react-icons/lib/fa/arrow-circle-o-down'
import Edit from 'react-icons/lib/fa/edit'
import Trash from 'react-icons/lib/fa/trash'

class Comment extends Component {

  componentDidMount() {
    const { post } = this.props
    this.props.fetchComments(post.id)
  }


  render() {

    const { comments } = this.props

    if (this.props.comments) {
      return (
        <div>
          <h3>Comments</h3>
          <ul className="list comments-box">
            { comments.map((comment, i) => {
              return (
                <li key={i} className="comment">
                  <p>{comment.body}</p>
                  <p>Score: {comment.voteScore} | Date: {new Date(comment.timestamp).toDateString()}</p>
                  <p>By: {comment.author}</p>
                  <div className="comment-control">
                    <button onClick={() => this.props.deleteComment(comment)}>
                      <Trash size={25}/>
                    </button>
                    <button>
                      <Edit size={25}/>
                    </button>
                    <button
                      onClick={() => this.props.upVote(comment)}>
                      <ArrowUp size={25}/>
                    </button>
                    <button
                      onClick={() => this.props.downVote(comment)}>
                      <ArrowDown size={25}/>
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
          <button className="button-comment" onClick={this.props.toggleAddComment}>Add Comment</button>
        </div>
      )
    }

    if (this.props.comments === undefined) {
      return (
        <div>
          Sorry, no comments for this post yet!
        </div>
      )
    }

  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments
  }
}



function mapDispatchToProps (dispatch) {
  return {
    upVote: (data) => dispatch(upVote(data)),
    downVote: (data) => dispatch(downVote(data)),
    deleteComment: (data) => dispatch(deleteComment(data)),
    fetchComments: (data) => dispatch(fetchComments(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)