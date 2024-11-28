import React, { useState, useEffect } from 'react'; // Import useState and useEffect from React
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom


const ShowDetails = () => {
    const { id } = useParams(); // Get the id from the URL
    const [show, setShow] = useState(null); // Initialize a state to store the show details
    const [error, setError] = useState(false); // Initialize a state to store any error messages
    const [playEpisode, setPlayEpisode] = useState(false); // Initialize a state to store whether to play an episode


    //Fetch the show details from the API
    useEffect(() => {
        const fetchShowDetails = async () => {
            try {
                const response = await fetch(`https://podcast-api.netlify.app/id/${id}`); //API URL
                const data = await response.json(); // Parse the response data to json
                setShow(data); // Update the show state with the fetched data

            }catch (error) {
                console.error("Error fetching show details:", error);
                setError(true); // Set the error state to true if there's an error
            }
        };
        fetchShowDetails(); // Call the fetchShowDetails function
    }), [id]; // The dependency array is set to [id] so that the effect is re-run

    if (error) return <div className="error">Error loading show details</div>; // If there's an error, display an error message
    if (!show) return <div className="loading">Loading...</div>; // If the show data is not available

    // play an episode
    const playingEpisode = (episode) => {
        setPlayEpisode(episode); // Set the playEpisode state to true
    }
    return (
        <div className="show-details">
        <div className="details-container">
          <div className="header">
            <img
              src={show.image}
              alt={show.title}
              className="show-image"
            />
            <div className="info">
              <h1>{show.title}</h1>
              <p>{show.description}</p>
              <p><strong>Total Seasons:</strong> {show.seasons.length}</p>
              <p><strong>Last Updated:</strong> {new Date(show.updated).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="seasons">
            <h2>Seasons</h2>
            {show.seasons.map((season, seasonIndex) => (
              <div key={seasonIndex} className="season">
                <h3>{season.title}</h3>
                <ul>
                  {season.episodes.map((episode, episodeIndex) => (
                    <li key={episodeIndex} className="episode">
                      <span>{episode.title}</span>
                      <button onClick={() => playEpisode(episode)} className="play-button">
                        Play
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        {playingEpisode && (
          <div className="audio-player">
            <div className="audio-info">
              <h3>{playingEpisode.title}</h3>
              <audio controls autoPlay>
                <source src={playingEpisode.file} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
            <button
              onClick={() => setPlayEpisode(null)}
              className="close-button"
            >
              Close
            </button>
          </div>
        )}
      </div>
    )
};
export default ShowDetails; // Export the component as the default export