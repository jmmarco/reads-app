import React, { Component } from 'react'


class EditPostForm extends Component {

  render() {
    console.log("Props for EditPostForm are: ", this.props)
    const { post, handleSubmit, handleChange} =  this.props
    return(
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={post.value}
            onChange={handleChange}
            placeholder={post.title}
          />
        </label>
        <br/>
        <input type="submit" value="Submit"/>
      </form>

    )

  }
}

export default EditPostForm
