import React from 'react'
import Feed from './Feed'

const Home = ({posts}) => {
  return (
    <main className='Home'>
      {
        posts.length > 0 ? (
          <Feed posts={posts}/>
        ) : (
          <p style={{margin:'2rem 0 0 0'}}>
            No Posts to show
          </p>
        )
      }
    </main>
  )
}

export default Home