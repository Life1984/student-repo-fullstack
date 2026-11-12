import useApiData from '../hooks/useApiData';
import { groupByField } from '../utils/data';

const Locations = function Locations() {
  const { data: locations, loading, error } = useApiData('location');

  if (loading) {
    return <p role="status">Loading all locations...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  const groups = groupByField(locations, 'type');

  return (
    <section>
      <h2>Locations by Type</h2>
      <p>{`Total locations: ${locations.length}`}</p>
      {groups.length === 0 && <p>No locations were returned.</p>}
      <div className="grid">
        {groups.map(({ label, members }) => (
          <article className="card" key={label}>
            <h3>{label}</h3>
            <p>{`Number of locations: ${members.length}`}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Locations;
