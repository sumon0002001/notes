import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';


const Notes = () => {
    const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/v1/notes`;
    const [data, setData] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
           try {
              const response = await fetch(baseUrl);
              if(!response.ok) {
                  throw new Error("failed to fetch the data")
              }
              const data = await response.json()
              setData(data);
              setIsloading(false)
              console.log(data)
           } catch (error) {
               setError("Error in fetching data. Please try again")
               setIsloading(true)
           } 
        }

        fetchData()

    },[])



    

    return (
        <div>
            {/* <pre>
                {JSON.stringify(data, null, 2)}
            </pre> */}
            {isLoading? (
            <p>Loading....</p>
            ): error? (
            <P>{error}</P>
            ):(
                <ul className='notes'>
                    <li>
                        <Link to={`/add-note`}>+</Link>
                    </li>
                    {data.map((item) => (
                      <li key={item._id}>
                        <Link to = {`/note/${item._id}`}>
                          <h3>{item.title}</h3>
                          <p>
                            {item.description.length > 50 ? `${item.description.substring(0,50)}...`
                            :item.description}
                          </p>
                        </Link>
                        
                      </li>
                      
                    ))}

                </ul>
            )}
        </div>
    )
}

export default Notes
