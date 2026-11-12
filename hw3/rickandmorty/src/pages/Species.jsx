import useApiData from '../hooks/useApiData';
import { getText, groupByField } from '../utils/data';

const Species = function Species() {
  const { data: characters, loading, error } = useApiData('character');

  if (loading) {
    return <p role="status">Loading all characters to count their species...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  const groups = groupByField(characters, 'species');

  return (
    <section>
      <h2>Characters by Species</h2>
      <p>{`Total characters: ${characters.length}`}</p>
      {groups.length === 0 && <p>No species were returned.</p>}
      <div className="grid">
        {groups.map(({ label, members }) => (
          <article className="card" key={label}>
            <h3>{label}</h3>
            <p>{`Number of characters: ${members.length}`}</p>
            <ul>
              {members.map((character) => (
                <li key={character.displayKey}>
                  {getText(character.name, 'Unnamed character')}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Species;
