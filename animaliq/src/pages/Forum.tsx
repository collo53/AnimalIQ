import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {
  Send,
  Image,
  Heart,
  MessageCircle,
  Search,
  MoreVertical,
  Camera,
  Paperclip,
  Smile,
  Settings,
  LogOut,
  Trash
} from 'lucide-react';
const Forum = () => {
  const [currentUser, setCurrentUser] = useState({
    id: '',
    name: '',
    avatar: '🦅',
    status: 'Wildlife Enthusiast',
    role:'',
    is_staff: false,
  });


  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  
  const [activeMessageId, setActiveMessageId] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
    return;
  }

  const storedUser = localStorage.getItem("user");
  let parsedUser = null;

  if (storedUser) {
    try {
      parsedUser = JSON.parse(storedUser);
      setCurrentUser({
        id: parsedUser.email || parsedUser.username || '',
        name: parsedUser.username || 'Wildlife Explorer',
        avatar: '🦅',
        status: 'Wildlife Enthusiast',
        role: parsedUser.is_staff ? 'admin' : 'user',
        is_staff: !!parsedUser.is_staff,
      });
    } catch (err) {
      console.error("Failed to parse stored user", err);
    }
  }

  axios
    .get("https://animals-production-13e6.up.railway.app/animals/messages/", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      const updatedMessages = res.data.map((msg) => ({
        ...msg,
        isLiked: msg.likes.includes(parsedUser?.email || parsedUser?.username),
        replies: 0,
      }));
      setMessages(updatedMessages);
    })
    .catch((err) => console.error("Failed to load messages", err));
}, []);


  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append("content", message);

    try {
      const res = await axios.post("https://animals-production-13e6.up.railway.app/animals/messages/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      setMessages(prev => [...prev, res.data]);
      setMessage('');
    } catch (err) {
      console.error("Error sending message", err);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("content", "Shared an image");

    axios.post("https://animals-production-13e6.up.railway.app/animals/messages/", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    }).then(res => {
      setMessages(prev => [...prev, res.data]);
    }).catch(err => {
      console.error("Image upload error", err);
    });
  };

const handleLike = async (id) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await axios.post(`https://animals-production-13e6.up.railway.app/animals/messages/${id}/like/`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const updatedLikes = res.data.likes;

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id
          ? {
              ...msg,
              isLiked: updatedLikes.includes(currentUser.id),
              likes: updatedLikes,
            }
          : msg
      )
    );
  } catch (err) {
    console.error("Failed to toggle like", err);
  }
};

const fetchComments = async (messageId) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`https://animals-production-13e6.up.railway.app/animals/messages/${messageId}/comments/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setComments(res.data);
    setActiveMessageId(messageId);

    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              replies: res.data.length,
            }
          : msg
      )
    );

  } catch (err) {
    console.error("Failed to load comments", err);
  }
};


const handleAddComment = async () => {
  if (!newComment.trim()) return;
  const token = localStorage.getItem("token");

  try {
    const res = await axios.post(
      `https://animals-production-13e6.up.railway.app/animals/messages/${activeMessageId}/comments/`,
      JSON.stringify({ text: newComment }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }
    );

    setComments((prev) => [res.data, ...prev]);
    setNewComment('');

    // Increment replies count in messages
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === activeMessageId
          ? {
              ...msg,
              replies: (msg.replies || comments.length) + 1, // increment replies
            }
          : msg
      )
    );
  } catch (err) {
    console.error("Failed to post comment", err.response?.data || err.message);
  }
};


const handleDelete = async (id) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    await axios.delete(`https://animals-production-13e6.up.railway.app/animals/messages/${id}/delete/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  } catch (err) {
    console.error("Failed to delete message", err.response?.data || err.message);
  }
};


const isAdmin = currentUser?.is_staff;

  return (
<div className="flex flex-col sm:flex-row h-screen bg-gray-100">
    <div className="w-full sm:w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
<div className="flex flex-wrap items-center justify-between space-y-2 sm:space-y-0">
            <h1 className="text-xl font-bold text-gray-800">Wildlife Chat</h1>
            <div className="flex items-center space-x-2">
             
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl">
              {currentUser.avatar}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{currentUser.name}</h3>
              <p className="text-sm text-gray-600">{currentUser.status}</p>
            </div>
            
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
         <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/login"; // Redirect to login
            }}
            className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
        </button>

        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🌍</span>
              <div>
                <h2 className="font-semibold text-gray-800">Wildlife Chat Room</h2>
                <p className="text-sm text-gray-600">Live Community Messages</p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
<div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-14rem)] sm:max-h-full">
          {messages.map((msg) => (
            <div key={msg.id} className="flex space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                {msg.avatar || "🦓"}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-gray-800">{msg.user_name}</span>
                  <span className="text-xs text-gray-500">{msg.timestamp}</span>
                </div>

                <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                  <p className="text-gray-800 mb-2">{msg.content}</p>

                  {msg.image && (
                    <div className="mt-2">
                      <img
                        src={msg.image}
                        alt="Shared content"
                        className="max-w-xs rounded-lg cursor-pointer hover:opacity-90"
                      />
                    </div>
                  )}

                  <div className="flex items-center space-x-4 mt-3 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => handleLike(msg.id)}
                      className={`flex items-center space-x-1 transition-colors ${
                        msg.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${msg.isLiked ? 'fill-current' : ''}`} />
                      <span className="text-sm">{msg.likes?.length || 0}</span>
                    </button>
                  <button
                    className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
                    onClick={() => fetchComments(msg.id)}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">{msg.replies || 0}</span>
                  </button>

                {isAdmin && (
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="text-sm text-black hover:text-red-700 flex items-center space-x-1"
                >
                  <Trash className="h-4 w-4 text-red-500 hover:text-red-700 transition-colors" />
                  <span>Delete</span>
                </button>
              )}


                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
<div className="flex flex-wrap sm:flex-nowrap items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-600"
            >
              <Paperclip className="h-5 w-5" />
            </button>

            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Share your wildlife discovery..."
                className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:border-green-500 pr-12"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full">
                <Smile className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="p-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 rounded-full text-white transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      {activeMessageId && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
      <h2 className="text-lg font-bold mb-4">Comments</h2>
      <div className="space-y-3 max-h-64 overflow-y-auto border p-2 rounded">
        {comments.length === 0 && <p className="text-sm text-gray-500">No comments yet.</p>}
        {comments.map((c) => (
          <div key={c.id} className="border-b pb-2">
            <strong className="text-gray-800">{c.user_name}</strong>
            <p className="text-gray-700 text-sm">{c.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center space-x-2">
        <input
          className="flex-1 p-2 border rounded"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          onClick={handleAddComment}
        >
          Post
        </button>
      </div>

      <button
        onClick={() => setActiveMessageId(null)}
        className="absolute top-2 right-3 text-gray-600 hover:text-red-500"
      >
        ✖
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default Forum;
