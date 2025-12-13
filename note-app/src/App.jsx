import React, { useState, useEffect } from "react";
import { Notebook } from "lucide-react";
import { NoteCard } from "./components/NoteCard";
import { CreateArea } from "./components/CreateArea";

function App() {
  const [notes, setNotes] = useState(() => {
    try {
      const savedNotes = localStorage.getItem("simple_thoughts_notes");
      return savedNotes ? JSON.parse(savedNotes) : [];
    } catch (error) {
      console.error("Couldn't read from your local storage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("simple_thoughts_notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (newNote) => {
    setNotes((prevNotes) => [
      {
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        ...newNote,
      },
      ...prevNotes,
    ]);
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const editNote = (id, updatedFields) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, ...updatedFields } : note
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] pb-20 font-sans">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300">
        <div className="px-6 h-20 flex items-center justify-center">
          <div className="flex items-center gap-3 group cursor-default">
            <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform duration-300">
              <Notebook className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
              Simple<span className="text-indigo-600">Thoughts</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-12">
          <CreateArea onAdd={addNote} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              onDelete={deleteNote}
              onEdit={editNote}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
