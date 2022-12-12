import React from 'react';
import { useParams,Link } from 'react-router-dom';

const PostPage = ({posts,handleDelete}) => {
  const {id} = useParams();
  const post = posts.find((post) =>post.id === parseInt(id))
  console.log(post)
  return (
    <div className='PostPage'>
      {
        post && 
        <div>
          <h2>{post.title}</h2>
          <p>{post.datetime}</p>
          <p>{post.body}</p>
          <button className='delete-btn' onClick={() => handleDelete(post.id)}>
            Delete
          </button>
          <Link to={`/edit/${post.id}`}>
          <button className='delete-btn'>
            Edit
          </button>
          </Link>
        </div>
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

export default PostPage