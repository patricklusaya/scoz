// apiService.js

const API_KEY = 'ddadc918507c482b89eef25415c9f885'; // Replace with your actual API key from football-data.org

export const fetchBundesligaStandings = (year) => {
  return fetch(`https://api.football-data.org/v2/competitions/BL1/standings?season=${year}`, {
    headers: {
      'X-Auth-Token': API_KEY,
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log("Standings", data);

      if (data.standings && data.standings.length > 0 && data.standings[0].table) {
        return data.standings[0].table;
      } else {
        throw new Error('Failed to fetch standings');
      }
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
};


export const fetchBundesligaScorers = (year) => {
  return fetch(`https://api.football-data.org/v2/competitions/BL1/scorers?season=${year}`, {
    headers: {
      'X-Auth-Token': API_KEY,
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log("Scorers", data); 
      return data.scorers;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
};
