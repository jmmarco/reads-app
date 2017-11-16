import React, { Component } from 'react'
import { fetchComments, upVote, downVote, deleteComment, updateComment } from '../actions/comments'
import { connect } from 'react-redux'
import ArrowUp from 'react-icons/lib/fa/arrow-circle-o-up'
import ArrowDown from 'react-icons/lib/fa/arrow-circle-o-down'
import Edit from 'react-icons/lib/fa/edit'
import Trash from 'react-icons/lib/fa/trash'
import FaPlus from 'react-icons/lib/fa/plus'
import EditCommentForm from './EditCommentForm'

class Comment extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      comment: null,
    }


    this.toggleEdit = this.toggleEdit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  toggleEdit(comment) {
    this.setState({
      comment: comment,
      isEditing: !this.state.isEditing,
    })
  }

  handleChange(event) {
    const field = event.target.name
    const comment = this.state.comment

    comment[field] = event.target.value

    return this.setState({
      comment: comment
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateComment(this.state.comment)
    this.setState({
      isEditing: false
    })

  }


  render() {
    const { comments, post } = this.props
    const { comment } = this.state

    const filteredComments = comments.filter((comment) => post.id === comment.parentId)


    if (this.state.isEditing && comment !== null) {
      return (
        <EditCommentForm comment={this.state.comment} handleChange={this.handleChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)} toggleEdit={this.toggleEdit.bind(this)}/>
        )
    }


    // console.log(this.props.comments)
    if (filteredComments.length > 0) {
      return (
          <div>
            <h3>Comments: {filteredComments.length}</h3>


            <ul className="list comments-box">
              { filteredComments.map((comment, i) => {
                return (
                  <li key={i} className="comment">
                    <p>{comment.body}</p>
                    <p>Score: {comment.voteScore} | Date: {new Date(comment.timestamp).toDateString()}</p>
                    <p>By: {comment.author}</p>
                    <div className="comment-control">
                      <button onClick={() => this.props.deleteComment(comment)}>
                        <Trash size={25}/>
                      </button>
                      <button onClick={() => this.toggleEdit(comment)}>
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

            <button className="button-comment" onClick={this.props.toggleAddComment}><FaPlus size={30}/></button>



          </div>
        )
    }

      return (
        <div>
          <p>Sorry, no comments for this post yet!</p>
          <button className="button-comment" onClick={this.props.toggleAddComment}><FaPlus size={30}/></button>
        </div>

      )


  }
}

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    comments: state.comments
  }
}



function mapDispatchToProps (dispatch) {
  return {
    upVote: (data) => dispatch(upVote(data)),
    downVote: (data) => dispatch(downVote(data)),
    updateComment:(data) => dispatch(updateComment(data)),
    deleteComment: (data) => dispatch(deleteComment(data)),
    fetchComments: (data) => dispatch(fetchComments(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
