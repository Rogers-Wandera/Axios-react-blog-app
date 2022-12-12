import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';

const EditPost = ({
  editTitle,setEditTitle,editBody,setEditBody,handleEdit,blogpost
}) => {

  const { id } = useParams();
  const post = blogpost.find(post => post.id === parseInt(id));

  useEffect(() => {
    if(post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  },[post,setEditTitle,setEditBody])
  return (
    <div className='NewPost'>
      {
        editTitle && 
        <>
          <h1>New Post</h1>
          <form onSubmit={(e) => e.preventDefault()}  className='form'>
            <label htmlFor="title">Title</label>
            <input 
              type="text" 
              required
              value={editTitle}
              id="title"
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="body">Body</label>
            <textarea 
              type="text" 
              value={editBody}
              id="body"
              required
              rows="5"
              onChange={(e) => setEditBody(e.target.value)}
            ></textarea>
            <button type='button'
              onClick={() => handleEdit(post.id)}
            >Edit post</button>
          </form>
        </>
      }
       {
        !post && 
        <div>
          <h2>Opps Looks like no post Found</h2>
          <p>Well that's disapointing</p>
          <p><Link to='/'>
            Visit our Posts Page
          </Link></p>
        </div>
      }
    </div>
  )
}

export default EditPost