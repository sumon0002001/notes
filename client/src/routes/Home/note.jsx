import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';



const UpdateNote = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/v1/notes/${id}`;
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("");
    const [submitted, setSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
           try {
              const response = await fetch(baseUrl);
              if(!response.ok) {
                  throw new Error("failed to fetch the data")
              }
              const data = await response.json()
              setTitle(data.title);
              setDescription(data.description)

              setIsLoading(false)
           } catch (error) {
               setError("Error in fetching data. Please try again")
               setIsLoading(true)
           } 
        }

        fetchData()

    },[])

    const updateNote = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(baseUrl, {
                method: "PUT",
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
    const removeNote = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch(baseUrl, {
            method: "DELETE"
          });
    
          if(response.ok) {
            navigate('/');
          }
    
        } catch (error) {
          
        }
      }
    return (
        <div>

      <div className="breadcrump-nav">
          <Link to ="/" className="back-button" >
            👈 back
          </Link> 
          <button onClick={removeNote} className="delete">
        ❌ Remove
      </button>
      </div>
          <form action="" onSubmit= {updateNote}>
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

export default UpdateNote;
