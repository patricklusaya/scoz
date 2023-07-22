// apiService.js

const API_KEY = 'ddadc918507c482b89eef25415c9f885'; // Replace with your actual API key from football-data.org

export const fetchTodayMatches = () => {
  return fetch('https://api.football-data.org/v2/matches', {
    headers: {
      'X-Auth-Token': API_KEY,
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then(data => {
        // console.log(data); 
        return data.matches;
      })
    .catch(error => {
      console.error(error);
      throw error;
    });
};

 export const fetchMatchDetails = async (matchId) => {
  try {
    const response = await fetch(`https://api.football-data.org/v2/matches/${matchId}`, {
      headers: {
        'X-Auth-Token': API_KEY, // Replace with your football-data.org API key
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch match details');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};


export const fetchStandings = async () => {
  try {
    // Make API request to fetch standings
    const response = await fetch(
      'https://api.football-data.org/v2/competitions/PL/standings',
      {
        headers: {
          'X-Auth-Token': API_KEY,
          'Content-Type': 'application/json' 
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch standings');
    }
    
    const data = await response.json();
    console.log("Data from table", data);
  } catch (error) {
    console.log(error);
  }
};
export const fetchEplStandings = (year) => {
  return fetch(`https://api.football-data.org/v2/competitions/PL/standings?season=${year}`, {
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


export const fetchEplScorers = (year) => {
  return fetch(`https://api.football-data.org/v2/competitions/PL/scorers?season=${year}`, {
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
// export const fetchLaligaScorers = (year) => {
//   return fetch(`https://api.football-data.org/v2/competitions/PD/scorers?season=${year}
//   `, {
//     headers: {
//       'X-Auth-Token': API_KEY,
//       'Content-Type': 'application/json'
//     },
//   })
//     .then(response => response.json())
//     .then(data => {
//       console.log("Scorers", data); 
//       return data.scorers;
//     })
//     .catch(error => {
//       console.error(error);
//       setIsError(true);
//       throw error;
//     });
// };

export const fetchLaligaScorers = async (year) => {
  try {
    const response = await fetch(`https://api.football-data.org/v2/competitions/PD/scorers?season=${year}`, {
      headers: {
        'X-Auth-Token': API_KEY,
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch scorers');
    }

    const data = await response.json();
    console.log("Scorers", data);
    return data.scorers;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchSerieaScorers = async (year) => {
  try {
    const response = await fetch(`https://api.football-data.org/v2/competitions/SA/scorers?season=${year}`, {
      headers: {
        'X-Auth-Token': API_KEY,
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch scorers');
    }

    const data = await response.json();
    console.log("Scorers", data);
    return data.scorers;
  } catch (error) {
    console.error(error);
    throw error;
  }
}; 

export const fetchTeamDataFromAPI = async (teamId) => {
  try {
    const response = await fetch(`https://api.football-data.org/v2/teams/${teamId}`, {
      headers: {
        'X-Auth-Token': API_KEY,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching team data:', error);
    throw error;
  }
};


export const fetchPlayerDetails = async (playerId) => {
  try {
    const response = await fetch(
      `http://api.football-data.org/v4/persons/${playerId}`,
      {
        headers: {
          "X-Auth-Token": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
   
  } catch (error) {
    console.log(error);
  }
};

export const fetchMatchesByDate = (date) => {
  const tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formattedDate = tomorrow.toISOString().split('T')[0];

  const url = `https://api.football-data.org/v2/matches?dateFrom=${formattedDate}&dateTo=${formattedDate}`;

  return fetch(url, {
    headers: {
      'X-Auth-Token': API_KEY,
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      return data.matches.filter(match => match.utcDate.startsWith(formattedDate));
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
};

export const fetchTopScorersAcrossLeagues = async () => {
  const competitionIds = [ 2014, 2019, 2002, 2015, 2021];

  const topScorersPromises = competitionIds.map((competitionId) =>
    fetch(`https://api.football-data.org/v2/competitions/${competitionId}/scorers`, {
      headers: {
        'X-Auth-Token': API_KEY,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => data.scorers)
  );

  try {
    const topScorersResponses = await Promise.all(topScorersPromises);
    const combinedTopScorers = topScorersResponses.reduce(
      (accumulator, scorers) => accumulator.concat(scorers),
      []
    );
console.log(combinedTopScorers);
    // Sort the combined top scorers by number of goals in descending order
    const sortedTopScorers = combinedTopScorers.sort(
      (a, b) => b.numberOfGoals - a.numberOfGoals
    );

    // Take the top 20 scorers
    const top20Scorers = sortedTopScorers.slice(0, 21);

    return top20Scorers;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchTopAssistProvidersAcrossLeagues = async (competitionId) => {
  try {
    const response = await fetch(`http://api.football-data.org/v4/competitions/${competitionId}/scorers`, {
      headers: {
        'X-Auth-Token': API_KEY,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    // Get the scorers array from the response
    const scorers = data.scorers;

    // Sort the scorers by number of assists in descending order
    const sortedScorers = scorers.sort((a, b) => b.assists - a.assists);

    // Get the top assist providers
    const topAssistProviders = sortedScorers.slice(0, 10);

    return topAssistProviders;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTopCleanSheetTeams = async () => {
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;

  const competitionIds = [2014, 2019, 2002, 2015, 2021];
  const cleanSheetPromises = competitionIds.map((competitionId) =>
    fetch(`https://api.football-data.org/v2/competitions/${competitionId}/standings?season=${previousYear}&standingType=TOTAL`, {
      headers: {
        'X-Auth-Token': API_KEY,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Check the response data
        if (data.standings && data.standings.length > 0 && data.standings[0].table.length > 0) {
          return data.standings[0].table.map((entry) => ({
            teamName: entry.team.name,
            cleanSheets: entry.cleanSheets,
          }));
        }
        return []; // Return an empty array if standings data is not available
      })
  );

  const cleanSheetResponses = await Promise.all(cleanSheetPromises);
  const combinedCleanSheetTeams = cleanSheetResponses.reduce(
    (accumulator, cleanSheetTeams) => accumulator.concat(cleanSheetTeams),
    []
  );

  const sortedCleanSheetTeams = combinedCleanSheetTeams.sort((a, b) => b.cleanSheets - a.cleanSheets);

  return sortedCleanSheetTeams;
};