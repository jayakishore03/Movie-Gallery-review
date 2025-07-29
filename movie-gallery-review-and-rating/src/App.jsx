import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import "./App.css";

const originalMovies = [
  {
    title: "RRR",
    poster:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ_gA25hvAzvrTHQaotqRuOVJqQbWScm5Ig5dF4ctHmnF5bUjPpUFqKTHZRqrm8CwG-98ILbA",
  },
  {
    title: "Pushpa",
    poster:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTBd-5bCGnbljCzftILF5vP5nqTeHkj0qymiNC2ryUWSIVUj-7392h0-HB8JrfGv8G4vPgGvqetEj3XCPJ0QnKZL4u3QTFqyK_Z2l92kgM",
  },
  {
    title: "Pathaan",
    poster:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTIOHA0DTAKNAhDRUKyhxR2U6iokt9boztD3ur53XbnoOGkzBm9C-qckStDmlMnJZvYDFAM",
  },
  {
    title: "Jawan",
    poster:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3giEteXGggow1hYtpRIuy3bDLO_Z9aoximYp_tuFK0Bb0N_fnmPaChKv1l_mgBxiiOwN3",
  },
  {
    title: "KGF",
    poster:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRBac-4dlHEaK62vvEHMMcS_PboGclwBP3Bny_k530Z_s2xoSFXFM0r_EgoPXBO5DVLT8Mr",
  },
  {
    title: "Baahubali",
    poster:
      "https://m.media-amazon.com/images/S/pv-target-images/274431b8945f779acab499a1625c2a3c9ebe1054d112aed3e55cd89c7d2ce41c.jpg",
  },
  {
    title: "Animal",
    poster:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT_ucWGXsn7q9pI6kgi1ZqsI_MsylRX2yQVF0_jRw99HgAozEZIG6qfAogFeBp1jVi3c-p6",
  },
  {
    title: "Sita Ramam",
    poster:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ7tf85dhFPzs8gTFz9NfLnc0U9pWuiB8mZwFvhYl5hl_1ZNH-0LdKCdq0tDOKdFyFLXXsRxg",
  },
  {
    title: "Peddi",
    poster:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQTK-fW9FHDQBjfeE8Lq0bZF6gD7hTENSV3s8s9MmdvEmXq1CYOD-7wtZFm7VwUItkgV_Qu54NiSYqc0VznlxKI9DoDrD2uH-Va7FXCcw",
  },
];

function App() {
  const [minRating, setMinRating] = useState(0);
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const withAvg = originalMovies.map((movie) => {
      const reviews =
        JSON.parse(localStorage.getItem(`reviews-${movie.title}`)) || [];
      const avgRating =
        reviews.length > 0
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          : 0;
      return { ...movie, avgRating };
    });

    const filtered = withAvg
      .filter((movie) => movie.avgRating >= minRating)
      .filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => b.avgRating - a.avgRating);

    setMovies(filtered);
  }, [minRating, search]);

  return (
    <div className="app">
      <h1 className="heading">🎬 Movie Gallery</h1>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <label style={{ marginRight: "20px" }}>
          Minimum Rating:
          <select
            onChange={(e) => setMinRating(Number(e.target.value))}
            style={{ marginLeft: "5px" }}
          >
            <option value="0">All</option>
            <option value="1">1 ★</option>
            <option value="2">2 ★</option>
            <option value="3">3 ★</option>
            <option value="4">4 ★</option>
            <option value="5">5 ★</option>
          </select>
        </label>

        <input
          type="text"
          placeholder="Search movie title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            width: "200px",
          }}
        />
      </div>

      <div className="gallery">
        {movies.map((movie, index) => (
          <Card key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;




