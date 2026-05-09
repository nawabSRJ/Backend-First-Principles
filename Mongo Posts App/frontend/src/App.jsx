import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // load Posts on refresh
  useEffect(() => {
    fetch('http://localhost:8080/api/post')
      .then(res => res.json())
      .then(data => {
        setPosts(data)
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [])

  const handleAddPost = async () => {
    const title = prompt('Enter title : ');
    const snippet = prompt('Enter snippet : ');
    const content = prompt('Enter content : ');

    if (!title || !snippet || !content) return;

    try {
      const res = await fetch('http://localhost:8080/api/post', {
        method: 'POST',
        body: JSON.stringify({ title, snippet, content }),
        headers: { 'Content-Type': 'application/json' },
      });

      const newPost = await res.json();
      setPosts(prev => [...prev, newPost]);
    } catch (error) {
      console.log('Error adding post', error);
    }
  }
  const deletePost = async (postId) => {
    try {
      const res = await fetch(`http://localhost:8080/api/post/${postId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setPosts(prev => prev.filter(post => post._id !== postId));
        // ! what does the above line do exactly?
        // ? answer : just filering the posts array (from usestate) as this delete function from backend does NOT send a response, so just filter on the client side
      }
    }
    catch (error) {
      console.error('Error deleting post', error);
    }
  }

  const updatePost = async (postId) => {
    const title = prompt('Enter new title: ');
    const snippet = prompt('Enter new snippet: ');
    const content = prompt('Enter new content: ');

    if (!title || !snippet || !content) return;

    try {
      const res = await fetch(`http://localhost:8080/api/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, snippet, content }),
        headers: { 'Content-Type': 'application/json' },
      });

      const updatedPost = await res.json();

      // replace the old post in state with the updated one
      setPosts(prev => prev.map(post =>
        post._id === postId ? updatedPost : post
      ));

    } catch (error) {
      console.error('Error updating post: ', error);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8">

        <div className="max-w-4xl mx-auto">

          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-rose-500">
              Here are the posts
            </h1>

            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md transition" onClick={handleAddPost}>
              Add Post
            </button>
          </div>

          <div className="space-y-6">

            {posts.map(post => (
              <div
                key={post._id}
                className="bg-white rounded-2xl shadow-md p-6 border border-gray-200"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {post.title}
                </h2>

                <h3 className="text-lg text-gray-500 mb-3">
                  {post.snippet}
                </h3>

                <h4 className="text-gray-700 leading-relaxed mb-6">
                  {post.content}
                </h4>

                <div className="flex gap-4">
                  <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium transition shadow" onClick={() => deletePost(post._id)}>
                    Delete
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition shadow" onClick={() => updatePost(post._id)}>
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
