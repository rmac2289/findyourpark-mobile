import config2 from '../config2';


const ParkApiService = {
    getParks() {
        return fetch(`${config2.API_ENDPOINT}/data`, {
          headers: {
          },
        })
        .then(response => {
            if(!response.ok){
                return response.json().then(e => Promise.reject(e))
            }
            return response.json();
        })
      },
};

export default ParkApiService;