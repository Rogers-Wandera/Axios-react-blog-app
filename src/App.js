import React,{useState,useEffect} from 'react';
import { Route,Routes,useNavigate } from 'react-router-dom';

// components
import Header from './component/Header';
import Nav from './component/Nav';
import Footer from './component/Footer';
import Home from './component/Home';
import NewPost from './component/NewPost';
import PostPage from './component/PostPage';
import About from './component/About';
import Missing from './component/Missing';
import EditPost from './component/EditPost';
import { format } from 'date-fns';
import api from './api/posts';


function App() {
  const [search,setSearch] = useState("");
  const [blogpost,setBlogPosts] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [searhresults,setSearchResults]= useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        console.log(response);
        setBlogPosts(response.data)
      } catch (err) {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        }else {
          console.log('Error', err.message);
        }
      }
    }
    fetchPosts();
  },[])

  useEffect(() => {
    const filterResults = blogpost.filter(post => 
      (post.body).toLowerCase().includes(search.toLowerCase()) || 
      (post.title).toLowerCase().includes(search.toLowerCase()))

      setSearchResults(filterResults.reverse())
  },[blogpost,search])

  const handleDelete = async (id) => {
    const filterPosts = blogpost.filter((post) => post.id !== id);
    await api.delete(`/posts/${id}`);
    setBlogPosts(filterPosts);
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = blogpost.length ? blogpost[blogpost.length -1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = {id, title:postTitle, datetime, body:postBody};
    try {
      const response = await api.post("/posts", newPost)
      const newAddedPost = [...blogpost, response.data];
      setBlogPosts(newAddedPost);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      console.log('Error', err.message);
    }
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const editPost = {id, title:editTitle, datetime, body:editBody};
    try {
      const response = await api.put(`/posts/${id}`,editPost);
      setBlogPosts(blogpost.map((blog) => 
        blog.id === id ? {...response.data} : blog
      ))
      setEditBody("")
      setEditTitle("")
      navigate("/")
    } catch (err) {
      console.log('Error', err.message);
    }
  }

  return (
    <div className='app'>
      <Header title="Our Blog"/>
      <Nav search={search} setSearch={setSearch}/>
      <Routes>
        <Route path='/' element={<Home posts={searhresults}/>} />
        <Route path='/post' element={<NewPost 
          postTitle={postTitle}
          setPostTitle={setPostTitle}
          postBody={postBody}
          setPostBody={setPostBody}
          handleSubmit={handleSubmit}
        />} />
        <Route path='/edit/:id' element={<EditPost 
          editTitle={editTitle}
          editBody={editBody}
          setEditTitle={setEditTitle}
          setEditBody={setEditBody}
          handleEdit={handleEdit}
          blogpost={blogpost}
        />} />
        <Route path='/post/:id' element={<PostPage posts={blogpost}handleDelete={handleDelete}/>} />
        <Route path='/about' element={<About /> } />
        <Route path='*' element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
