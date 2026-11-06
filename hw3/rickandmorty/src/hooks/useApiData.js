import { useEffect, useState } from 'react';
import getData from '../api/rickAndMorty';

//Share request state and cleanup across the three data pages
const useApiData = function useApiData(resource, limit = Infinity) {
  const [state, setState] = useState({ data: [], loading: true, error: '' });

  useEffect(() => {
    const controller = new AbortController();
    const loadData = async function loadData() {
      setState({ data: [], loading: true, error: '' });

      try {
        const data = await getData(resource, controller.signal, limit);

        if (!controller.signal.aborted) {
          setState({ data, loading: false, error: '' });
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setState({
            data: [],
            loading: false,
            error: error.name === 'TimeoutError'
              ? 'The API request took too long. Please try again.'
              : error.message || 'Unable to load API data.',
          });
        }
      }
    };

    loadData();

    //Cancel pending work when this page unmounts or its query changes
    return () => controller.abort();
  }, [resource, limit]);

  return state;
};

export default useApiData;
