import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import Button from "../components/Button";

interface Note { _id: string; title: string; content: string; }

const Dashboard: React.FC = () => {
  const auth = useContext(AuthContext)!;
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    const res = await api.get<Note[]>("/notes");
    setNotes(res.data);
    console.log("This is dashboard", AuthContext)
  };

  useEffect(() => { fetchNotes(); }, []);

  const createNote = async () => {
    await api.post<Note>("/notes",  { title, content });
   
    setTitle(""); setContent("");
    fetchNotes();
  };

  const deleteNote = async (id: string) => {
    await api.delete(`/notes/${id}`);
    fetchNotes();
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar / Welcome */}
      <div className="w-full md:w-1/4 bg-gray-100 p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome, {auth.user!.name}!</h2>
        <p className="mb-4 text-sm text-gray-700">Email: {auth.user!.email}</p>
        <Button onClick={auth.logOut}>Log Out</Button>
      </div>

      {/* Notes Area */}
      <div className="flex-1 p-6">
        <h2 className="text-xl font-semibold mb-4">Your Notes</h2>
        <div className="mb-6">
          <input
            type="text" placeholder="Title"
            className="w-full px-4 py-2 border rounded mb-2"
            value={title} onChange={e=>setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content" rows={4}
            className="w-full px-4 py-2 border rounded mb-2"
            value={content} onChange={e=>setContent(e.target.value)}
          />
          <Button onClick={createNote}>Create Note</Button>
        </div>
        <div className="space-y-4">
          {notes.map(n => (
            <div key={n._id} className="border rounded p-4 flex justify-between">
              <div>
                <h3 className="font-bold">{n.title}</h3>
                <p className="text-sm">{n.content}</p>
              </div>
              <button
                onClick={()=>deleteNote(n._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
