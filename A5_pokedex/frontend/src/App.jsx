import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch pokemons from our backend
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/pokemons?search=${search}`);
        setPokemons(response.data);
      } catch (error) {
        console.error('Error fetching from local API:', error);
        // Fallback or error handling can be done here.
        // During testing without the DB hooked up properly, we might just get an error.
      }
    };

    // Add a bit of debounce to avoid spamming the backend
    const timeoutId = setTimeout(() => {
      fetchPokemons();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [search]);

  // Fetch image from PokeAPI when a pokemon is selected
  useEffect(() => {
    if (selectedPokemon) {
      setLoading(true);
      const pokeName = (selectedPokemon.name || selectedPokemon.nombre || '').toLowerCase();
      if (pokeName) {
        // Fetch from pokeapi
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
          .then(res => {
            // Get the official artwork or fallback to default sprite
            const img = res.data.sprites.other['official-artwork'].front_default || res.data.sprites.front_default;
            setImageUrl(img);
            setLoading(false);
          })
          .catch(err => {
            console.error('Error fetching image from PokeAPI', err);
            setImageUrl(''); // Not found image
            setLoading(false);
          });
      }
    } else {
      setImageUrl('');
    }
  }, [selectedPokemon]);

  return (
    <div className="pokedex-container">
      {/* Left Panel */}
      <div className="left-panel">
        <div className="top-lights">
          <div className="big-light"></div>
          <div className="small-lights">
            <div className="small-light sl-red"></div>
            <div className="small-light sl-yellow"></div>
            <div className="small-light sl-green"></div>
          </div>
        </div>

        <div className="screen-container">
          <div className="screen">
            {loading ? (
              <div className="empty-screen">CARGANDO...</div>
            ) : selectedPokemon ? (
              imageUrl ? (
                <img src={imageUrl} alt={selectedPokemon.name} className="pokemon-image" />
              ) : (
                <div className="empty-screen">IMAGEN NO ENCONTRADA</div>
              )
            ) : (
              <div className="empty-screen">SELECCIONA UN POKEMON</div>
            )}
          </div>
        </div>

        <div className="controls">
          <svg width="60" height="60" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="#333" />
            <circle cx="50" cy="50" r="40" fill="#222" />
          </svg>

          <div className="d-pad">
            <div className="d-pad-part d-center"></div>
            <div className="d-pad-part d-up"></div>
            <div className="d-pad-part d-down"></div>
            <div className="d-pad-part d-left"></div>
            <div className="d-pad-part d-right"></div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar Pokemon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="pokemon-list">
          {pokemons.length > 0 ? (
            pokemons.map((p, index) => (
              <div
                key={p.id || index}
                className={`pokemon-item ${selectedPokemon === p ? 'active' : ''}`}
                onClick={() => setSelectedPokemon(p)}
              >
                <span>{p.name || p.nombre || `Pokemon #${index}`}</span>
                <span>#{p.id || p.numero || index}</span>
              </div>
            ))
          ) : (
            <div style={{ padding: '10px' }}>No hay resultados... Asegúrate de tener la BBDD conectada en el .env.</div>
          )}
        </div>

        <div className="stats-container">
          {selectedPokemon ? (
            <>
              <div className="stat-line">NOMBRE: {selectedPokemon.name || selectedPokemon.nombre}</div>
              <div className="stat-line">INFO: {selectedPokemon.type || 'N/A'}</div>
            </>
          ) : (
            <div>DATOS DEL POKEMON...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
