// const API_KEY = 'ddadc918507c482b89eef25415c9f885';

// // Function to fetch fixtures for a specific league
// const fetchFixtures = async (leagueId) => {
//     try {
//       const response = await fetch(`https://api.football-data.org/v2/competitions/${leagueId}/matches`, {
//         headers: {
//           'X-Auth-Token': API_KEY,
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   };
  
//   // Function to fetch results for a specific league
//   const fetchResults = async (leagueId) => {
//     try {
//       const response = await fetch(`https://api.football-data.org/v2/competitions/${leagueId}/matches`, {
//         headers: {
//           'X-Auth-Token': API_KEY,
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   };
  
//   // Function to fetch team information
//   const fetchTeam = async (teamId) => {
//     try {
//       const response = await fetch(`https://api.football-data.org/v2/teams/${teamId}`, {
//         headers: {
//           'X-Auth-Token': API_KEY,
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   };
  
//   export const fetchTopCleanSheetTeams = async () => {
//     try {
//       // Fetch fixtures and results for each league
//       const leagues = [2014, 2019, 2002, 2015, 2021]; // Replace with actual league IDs
//       const fixturesPromises = leagues.map((leagueId) => fetchFixtures(leagueId));
//       console.log('Fixture Promises: ', fixturesPromises);
// const fixturesResponses = await Promise.all(fixturesPromises);
// console.log('Fixtures responses:', fixturesResponses); // Add this line
// const fixturesData = fixturesResponses.map((response) => response.data);
// console.log('Fixtures data:', fixturesData); // Add this line

// const resultsPromises = leagues.map((leagueId) => fetchResults(leagueId));
// const resultsResponses = await Promise.all(resultsPromises);
// const resultsData = resultsResponses.map((response) => response.data);
// console.log('Results data:', resultsData); 
  
//       // Iterate through matches and calculate clean sheets
//       const cleanSheetCount = {};
  
//       for (let i = 0; i < leagues.length; i++) {
//         const leagueId = leagues[i];
//         console.log('Fixtures data:', fixturesData[i]); // Add this line
//   const fixtures = fixturesData[i]?.fixtures || []; // Update this line
//   const results = resultsData[i]?.results || [];
//         for (let j = 0; j < fixtures.length; j++) {
//           const fixture = fixtures[j];
//           const result = results.find((r) => r.fixture.id === fixture.id);
  
//           if (result && result.score.fullTime.homeTeam === 0 && result.score.fullTime.awayTeam === 0) {
//             // Clean sheet for both home and away teams
//             const homeTeamId = fixture.homeTeam.id;
//             const awayTeamId = fixture.awayTeam.id;
  
//             if (cleanSheetCount[homeTeamId]) {
//               cleanSheetCount[homeTeamId]++;
//             } else {
//               cleanSheetCount[homeTeamId] = 1;
//             }
  
//             if (cleanSheetCount[awayTeamId]) {
//               cleanSheetCount[awayTeamId]++;
//             } else {
//               cleanSheetCount[awayTeamId] = 1;
//             }
//           }
//         }
//       }
  
//       // Sort teams based on clean sheet count
//       const teams = Object.keys(cleanSheetCount).map((teamId) => {
//         return {
//           teamId,
//           cleanSheets: cleanSheetCount[teamId],
//         };
//       });
  
//       teams.sort((a, b) => b.cleanSheets - a.cleanSheets);
  
//       // Retrieve team information for the top teams
//       const topTeams = teams.slice(0, 20);
//       const teamPromises = topTeams.map((team) => fetchTeam(team.teamId));
//       const teamResponses = await Promise.all(teamPromises);
//       const teamData = teamResponses.map((response) => response.data);
  
//       const topTeamsWithInfo = topTeams.map((team, index) => {
//         const teamInfo = teamData[index];
//         return {
//           rank: index + 1,
//           teamId: team.teamId,
//           cleanSheets: team.cleanSheets,
//           name: teamInfo.name,
//           crestUrl: teamInfo.crestUrl,
//         };
//       });
  
//       return topTeamsWithInfo;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   };
  
//   // Example usage
//   fetchTopCleanSheetTeams()
//     .then((topTeams) => {
//       console.log(topTeams);
//       // Render the data in your component
//     })
//     .catch((error) => {
//       console.error(error);
//     });
  