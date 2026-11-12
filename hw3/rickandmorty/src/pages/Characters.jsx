import { useState } from 'react';
import useApiData from '../hooks/useApiData';
import { getText } from '../utils/data';

const Characters = function Characters() {
  const { data: characters, loading, error } = useApiData('character', 100);
  const [failedImages, setFailedImages] = useState([]);

  if (loading) {
    return <p role="status">Loading the first 100 characters...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <section>
      <h2>{`Characters (${characters.length})`}</h2>
      {characters.length === 0 && <p>No characters were returned.</p>}
      <div className="grid character-grid">
        {characters.map((character) => {
          const name = getText(character.name, 'Unnamed character');
          const image = getText(character.image, '');

          return (
            <article className="card" key={character.displayKey}>
              <h3>{name}</h3>
              {image && !failedImages.includes(character.displayKey) ? (
                <img
                  src={image}
                  alt={name}
                  loading="lazy"
                  onError={() => {
                    //Switch to the fallback if a supplied URL fails to load
                    setFailedImages((previous) => [...previous, character.displayKey]);
                  }}
                />
              ) : (
                <p>Image unavailable.</p>
              )}
              <p>{`Species: ${getText(character.species)}`}</p>
              <p>{`Status: ${getText(character.status)}`}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Characters;
