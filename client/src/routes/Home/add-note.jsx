import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';



const AddNote = () => {
    const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/v1/notes`;
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("");
    const [submitted, setSubmitted] = useState(false)

    const addNote = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(baseUrl, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    title,
                    description,
                }),
            });
            if(response.ok) {
                setTitle("")
                setDescription("")
                setSubmitted(true);
                setTimeout(() => setSubmitted(false), 2000)
            }
            else {
                console.log("Failed to submit the data")
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
          <Link to ="/" className="back-button" >
            👈 back
          </Link> 
          <form action="" onSubmit= {addNote}>
              <div className="single-note">
                  <div>
                      <input 
                        type="text"
                        value={title} 
                        onChange={(e) =>setTitle(e.target.value)} 
                        placeholder="Title"
                        className="title"/>
                        
                  </div>
                  <div>
                      <textarea 
                        value={description}
                        onChange={(e) =>setDescription(e.target.value)}
                        placeholder="Description"
                        cols="50" 
                        rows="4"
                        className="description">

                        </textarea>
                  </div>
              </div>
              <input 
                 type="submit"
                 value={submitted?"saving note...": "💾 Save Note"}
                 disabled={submitted}
                />
             
        <div className="text-center">
          {submitted && (
            <p className="success-message">Note has been added!</p>
          )}
        </div>

          </form>
        </div>
    )
}

export default AddNote;
