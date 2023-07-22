import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import NetworkErrorCard from "./cards/NetworkErrorCard";
export default function OtherMatches({screenStyle, cardStyle}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [fixtures, setFixtures] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { backgroundColor, color, iconColor } = screenStyle;
  const { cardBackgroundColor, cardColor, cardiconColor } = cardStyle;

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
    fetchFixtures(date.dateString);
  };

  const fetchFixtures = async (date) => {
    try {
      const response = await fetch(
        `http://api.football-data.org/v2/matches?dateFrom=${date}&dateTo=${date}`,
        {
          headers: {
            "X-Auth-Token": "ddadc918507c482b89eef25415c9f885",
          },
        }
      );
      const data = await response.json();
      setFixtures(data.matches);
      setIsLoading(false)
      setIsError(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
      setIsError(true)
    }
  };

  return (
  <ScrollView contentContainerStyle={[styles.container, {backgroundColor:cardBackgroundColor}]}>
      <Calendar onDayPress={handleDateSelect} style={styles.calendarStyles} />
      {selectedDate && (
        <View>
             {isLoading ? (
        <CustomLoader/>
      ) : (
       <View>
           {isError ? (
        <NetworkErrorCard/>
      ) : (
        <View>
          <Text style={styles.fixturesHeading}>
            {" "}
            <Ionicons name="calendar-outline" color="tomato" size={22} />{" "}
            {selectedDate}
          </Text>
          {fixtures.map((fixture) => (
            <View style={[styles.matchContainer, {backgroundColor:cardBackgroundColor}]} key={fixture.id}>
              <View>
                <Text style={[styles.matchText, {color:cardColor}]}>
                  {fixture.homeTeam.name} vs {fixture.awayTeam.name}
                </Text>
                {fixture.status === "FINISHED" ? (
                  <Text style={styles.statusText}>FT</Text>
                ) : fixture.status === "SCHEDULED" ? (
                  <Text style={styles.statusText}>
                    {new Date(fixture.utcDate).toLocaleTimeString()}
                  </Text>
                ) : (
                  <Text style={styles.statusText}>{fixture.status}</Text>
                )}
              </View>
              {fixture.status === "FINISHED" && (
                <View style={styles.scoreContainer}>
                  <Text style={styles.scoreText}>
                    {fixture.score.fullTime.homeTeam} -{" "}
                    {fixture.score.fullTime.awayTeam}
                  </Text>
                </View>
              )}
              
            </View>
           
            
          ))}
          </View>
      )}
          </View>
      )}
        </View>
      
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  calendarStyles: {
    backgroundColor: "tomato",
    borderRadius: 30,
    padding: 16,
  },
  fixturesHeading: {
    fontSize: 18,
    fontWeight: "bold",
    // textAlign: "center",
    marginTop: 30,
    marginBottom: 10,
    color: "tomato",
  },
  matchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  matchText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statusText: {
    fontSize: 14,
    color: "#888",
  },
  scoreContainer: {
    backgroundColor: "#f1f1f1",
    padding: 8,
    borderRadius: 4,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "tomato",
  },
});
