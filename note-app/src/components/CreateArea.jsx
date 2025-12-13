import React, { useState } from "react";

export const CreateArea = ({ onAdd }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const submitNote = (event) => {
    event.preventDefault();

    if (note.title.trim() || note.content.trim()) {
      onAdd(note);
      setNote({ title: "", content: "" });
      setIsExpanded(false);
    }
  };

  const expand = () => setIsExpanded(true);

  const contentPlaceholder = "Write your notes here...";

  return (
    <div className="relative z-10 mx-auto max-w-2xl">
      <form
        className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ease-in-out border border-gray-100 ${
          isExpanded
            ? "p-6 ring-4 ring-indigo-50/80 scale-100"
            : "p-4 flex items-center hover:shadow-2xl"
        }`}
        onSubmit={submitNote}
      >
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
            className="w-full text-xl font-bold text-gray-800 placeholder-gray-300 mb-4 outline-none bg-transparent"
            autoComplete="off"
            autoFocus
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder={isExpanded ? contentPlaceholder : "Take a note..."}
          className={`w-full text-gray-600 placeholder-gray-400 outline-none resize-none text-lg leading-relaxed bg-transparent ${
            isExpanded ? "min-h-[140px]" : "min-h-[28px] overflow-hidden"
          }`}
          rows={isExpanded ? 3 : 1}
        />

        <div
          className={`flex justify-end mt-4 pt-2 transition-all duration-500 ${
            isExpanded
              ? "opacity-100 max-h-20"
              : "opacity-0 max-h-0 overflow-hidden"
          }`}
        >
          <button
            type="button"
            onClick={() => {
              setIsExpanded(false);
              setNote({ title: "", content: "" });
            }}
            className="px-5 py-2 mr-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer font-bold"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!note.title.trim() || !note.content.trim()}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
          >
            <span>Add</span>
          </button>
        </div>
      </form>
    </div>
  );
};
