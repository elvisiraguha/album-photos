import React, { useState } from "react";
import "./App.css";

function App() {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setPhotos([]);

    const link = "https://jsonplaceholder.typicode.com/albums/";

    fetch(`${link}${id}/photos`)
      .then((data) => data.json())
      .then((res) => {
        setLoading(false);
        setPhotos(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log("fetch err ===>", err);
      });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={id}
          onChange={({ target }) => setId(target.value)}
        />
        <button disabled={!Boolean(id)}>Get Album Photos By Id</button>
      </form>

      {loading ? <div className="loading"></div> : null}

      {photos.length ? (
        <div>
          <h3>Photos in the album of id {id}</h3>
          <ul>
            {photos.map((photo) => (
              <li className="photo-card" key={photo.id}>
                <span className="photo-title">{photo.title}</span>
                <span>
                  <img src={photo.thumbnailUrl} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default App;
