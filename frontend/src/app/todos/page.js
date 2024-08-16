'use client'
import { useState, useEffect } from 'react';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "app/constants";
import Note from 'app/components/Note';
import { useRouter } from 'next/navigation';
import api from "app/api";
import { jwtDecode } from "jwt-decode";
import Button  from 'app/components/buttons/Button'

function Todos() {

    const router = useRouter()

    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [status, setStatus] = useState(false);
    const [user, setUser] = useState({})
    const [title, setTitle] = useState("");  
    const [isloading, setIsloading] = useState(false);

    const [authenticated, setAuthenticated] = useState(false);
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    

    
    useEffect(() => {
        if (accessToken && refreshToken) {

            getUser(accessToken)

            setAuthenticated(true)
            getNotes();
        }

    }, [
        authenticated,
    ]); 

    const getUser = async (token) => {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user_id; 


        await api
            .get(`api-auth/users/${userId}`)
            .then((res) => res.data)
            .then((data) => {
                console.log(data);
                setUser(data)
            })
            .catch((err) => {
                console.log(err);
                
            });
    };

    const getNotes = async () => {
        await api
            .get("api/todos/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);

            })
            .catch((err) => {
                // alert(err)
            });
    };

    const deleteNote = (id) => {
        api
            .delete(`api/todos/${id}/`)
            .then((res) => {
                if (res.status === 204);
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        setIsloading(true);
        e.preventDefault();
        setTitle("")
        api
            .post("api/todos/", { content, title })
            .then((res) => {
                if (res.status === 201) setIsloading(false);
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };

    const onUpdate = (updatedNote) => {

        const {
            title,
            status,
             id
        } = updatedNote;
        api
        .put(`api/todos/${id}/`, { title, status }) // Update the note using PUT request
        .then((res) => {
            if (res.status === 200) { // Check for success status
                alert("Note updated successfully!");
                setIsloading(false);
                getNotes(); // Refresh the notes after updating
            } else {
                alert("Failed to update note.");
                setIsloading(false);
            }
        })
        .catch((err) => {
            alert(err);
            setIsloading(false);
        });

    }

        
    if (!accessToken && !refreshToken) {
        router.push('/auth/signin');
        return;
    }

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome, {user.username}!</h1>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Todos</h2>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Create a Todo</h2>
            <form onSubmit={createNote} className="space-y-4" style={{ display: 'flex' }}>
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
                <Button isLoading={isloading} btnType="submit" btnValue="Sign In"  />
            </form>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Notes</h2>
                {notes.map((note) => (
                    <Note 
                        note={note} 
                        onDelete={deleteNote} 
                        onUpdate={onUpdate}
                        key={note.id} 
                        className="mb-4 p-4 border rounded-lg shadow-md"
                    />
                ))}
            </div>

        </div>
    );
    
}

export default Todos;