import TokenService from './TokenService';
import config2 from '../config2';

const SuggestionsApiService = {
    postSuggestion(park_name, location, description) {
        return fetch(`${config2.API_ENDPOINT}/suggestions`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`,
          },
          body: JSON.stringify({
            park_name,
            location,
            description
          }),
        })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          );
      },
};

export default SuggestionsApiService;