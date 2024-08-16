"use client"
import { useState } from 'react'

function Note({ note, onDelete, onUpdate  }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(note.title);
    const [status, setStatus] = useState(note.status);

    const handleUpdate = () => {
        setIsEditing(false);
        const updatedNote = {
            title: title,
            status: note.status,
            id: note.id
        };
        onUpdate(updatedNote);
    }

    const onEdit = () => {
        setIsEditing(true);
    };


    return (
        <div className="note-container bg-white p-4 shadow-lg rounded-lg mb-4">
            { 
            isEditing ?             
            <form className="space-y-4">
                <div  >
                    <label 
                        htmlFor="title" 
                        className="block text-sm font-medium text-gray-700"
                    >
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        style={{ color: 'black' }} // Set the text color explicitly
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </form>
            : (<p className="note-title text-xl font-semibold text-gray-800 mb-2">
 {note.title}
</p>)}
                
            

            <p className="note-content text-gray-600 mb-2">
                {note.status}
            </p>
            <p className="note-date text-sm text-gray-500 mb-4">
                {formattedDate}
            </p>
            <button
                className="delete-button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => onDelete(note.id)}
            >
                Delete
            </button>
            { 
            !isEditing ?   
            <button
                className="delete-button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setIsEditing(true)}
            >
                Edit
            </button> : <div>
            <button
                className="delete-button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleUpdate(note.id)}
            >
                Save
            </button>
            <button
                className="delete-button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setIsEditing(false)}
            >
                Cancel
            </button>
            
            </div>}
        </div>
    );
    
}

export default Note