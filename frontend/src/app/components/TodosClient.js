'use client';

import React, { useEffect, useState } from 'react';
import Note from 'app/components/Note';
import { useRouter } from 'next/navigation';
import api from "app/api";

function TodosClient() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        const accessToken = localStorage.getItem('ACCESS_TOKEN');
        const refreshToken = localStorage.getItem('REFRESH_TOKEN');

        if (!accessToken || !refreshToken) {
            router.push('/auth/signin'); // Redirect to login page
            return;
        }

        setIsLoading(false); // Set loading to false after checking authentication
        getNotes();
    }, []);

    const getNotes = async () => {
        try {
            const res = await api.get("api/todos/");
            setNotes(res.data);
        } catch (err) {
            alert(err);
        }
    };

    const deleteNote = async (id) => {
        try {
            const res = await api.delete(`api/todos/delete/${id}/`);
            if (res.status === 204) {
                alert("Note deleted!");
                getNotes();
            } else {
                alert("Failed to delete note.");
            }
        } catch (error) {
            alert(error);
        }
    };

    const createNote = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("api/todos/", { content, title });
            if (res.status === 201) {
                alert("Note created!");
                getNotes();
            } else {
                alert("Failed to make note.");
            }
        } catch (err) {
            alert(err);
        }
    };

    if (isLoading) {
        
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                    <div>No Authorized</div>
                </div>
            </div>
        );
    }

    return (

        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Notes</h2>
                {notes.map((note) => (
                    <Note 
                        note={note} 
                        onDelete={deleteNote} 
                        key={note.id} 
                        className="mb-4 p-4 border rounded-lg shadow-md"
                    />
                ))}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Create a Note</h2>
            <form onSubmit={createNote} className="space-y-4">
                <div>
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
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <input 
                    type="submit" 
                    value="Submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                />
            </form>
        </div>

        
    );
}

export default TodosClient;
