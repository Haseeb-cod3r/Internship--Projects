import { Trash2 } from "lucide-react";

export const NoteCard = ({ id, title, content, onDelete }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-gray-100 p-6 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex-1 mb-4">
        {title && (
          <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight tracking-tight">
            {title}
          </h3>
        )}
        <p className="text-gray-600 text-base leading-relaxed whitespace-pre-wrap break-words">
          {content || <span className="text-gray-300 italic">Empty note</span>}
        </p>
      </div>

      <div className="flex justify-end gap-1 mt-auto pt-4 border-t border-dashed border-gray-100 transition-opacity duration-200 translate-y-2">
        <button
          onClick={() => onDelete(id)}
          className="p-2.5 rounded-xl text-gray-400 hover:text-red-500 transition-all duration-200 cursor-pointer"
          title="Delete note"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};
