// apiService.js

const API_KEY = 'ddadc918507c482b89eef25415c9f885'; // Replace with your actual API key from football-data.org

export const fetchEflStandings = (year) => {
  return fetch(`https://api.football-data.org/v2/competitions/ELC/standings?season=${year}`, {
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


export const fetchEflScorers = (year) => {
  return fetch(`https://api.football-data.org/v2/competitions/ELC/scorers?season=${year}`, {
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


export const fetchTopScorers = async (leagueCode, year) => {
    const response = await fetch(`https://api.football-data.org/v2/competitions/${leagueCode}/scorers?season=${year}`, {
      headers: {
        'X-Auth-Token': API_KEY,

      },
    });
    const data = await response.json();
    return data.scorers;
  };
  
  export const fetchTopScorersAcrossLeagues = async (year) => {
    const leagues = ['PL', 'BL1', 'SA', 'PD', 'FL1']; // Top five European leagues
    const topScorers = [];
  
    for (const league of leagues) {
      const scorers = await fetchTopScorers(league, year);
      topScorers.push(...scorers);
    }
  
    // Sort the scorers by number of goals in descending order
    topScorers.sort((a, b) => b.numberOfGoals - a.numberOfGoals);
  
    // Return the top 20 scorers
    return topScorers.slice(0, 20);
  };
  

// export const fetchTopScorersAcrossLeagues = async (year) => {
//     const leagues = ['PL', 'BL1', 'SA', 'PD', 'FL1']; // Top five European leagues
//     const topScorers = [];
  
//     for (const league of leagues) {
//       const scorers = await fetchTopScorers(league, year);
//       if (scorers) {
//         topScorers.push(...scorers);
//       }
//     }
   
  
//     // Sort the scorers by number of goals in descending order
//     topScorers.sort((a, b) => b.numberOfGoals - a.numberOfGoals);
  
//     // Return the top 20 scorers
//     return topScorers.slice(0, 20);
//   };
  