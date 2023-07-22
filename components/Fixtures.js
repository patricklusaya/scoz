import React from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { ModalContext } from "./modal/ModalContext";
import LeagueFixtureModal from "./modal/LeagueFixtureModal";

const LeagueCard = ({ imageSource, text , leagueId,cardBackgroundColor,cardColor}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const { cardBackgroundColor, cardColor, cardiconColor } = cardStyle;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <ModalContext.Provider value={{ openModal }}>
        <LeagueFixtureModal isModalOpen={isModalOpen} closeModal={closeModal} text={text} leagueId={leagueId} />
      </ModalContext.Provider>
      <TouchableOpacity style={[styles.cardContainer]} onPress={openModal}>
        <View style={[styles.cardContent,   { backgroundColor: cardBackgroundColor }]}>
          <Image source={imageSource} style={styles.image} />
          <Text style={[styles.text , {color:cardColor}]}>{text}</Text>
          <Ionicons
            name="chevron-forward"
            size={24}
            color="black"
            style={styles.arrowIcon}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

const Fixtures = ({ screenStyle, cardStyle }) => {
  const navigation = useNavigation();
  const { backgroundColor, color, iconColor } = screenStyle;
  const { cardBackgroundColor, cardColor, cardiconColor } = cardStyle;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            size={24}
            color="tomato"
            style={{ marginLeft: 16 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  // ...

  return (
    <ScrollView style={ { backgroundColor }}>
      <View style={[styles.container]}>
        {/* ... */}

        <Text style={[styles.sectionTitle, {color:color}  ]}>Leagues</Text>

        <LeagueCard
  imageSource={require("../assets/images/pl3.jpg")}
  text="English Premier League"
  leagueId="PL"
  cardBackgroundColor={cardBackgroundColor}
  cardColor={cardColor}
/>

        <LeagueCard
          imageSource={require("../assets/images/laliga.jpg")}
          text="La Liga Santander"
          leagueId="PD"
          cardBackgroundColor={cardBackgroundColor}
          cardColor={cardColor}
        />
        <LeagueCard
          imageSource={require("../assets/images/seriea.png")}
          text="Italian Serie A"
          leagueId="SA"
          cardBackgroundColor={cardBackgroundColor}
          cardColor={cardColor}
        />
        <LeagueCard
          imageSource={require("../assets/images/lg1.png")}
          text="France Ligue 1"
          cardBackgroundColor={cardBackgroundColor}
          cardColor={cardColor}
        />
        <LeagueCard
          imageSource={require("../assets/images/bundeslga.png")}
          text="German Bundesliga"
          cardBackgroundColor={cardBackgroundColor}
          cardColor={cardColor}
        />
        <LeagueCard
          imageSource={require("../assets/images/lignos.png")}
          text="Liga Nos"
          cardBackgroundColor={cardBackgroundColor}
          cardColor={cardColor}
        />
        <LeagueCard
          imageSource={require("../assets/images/skybt.png")}
          text="EFL Championship"
          cardBackgroundColor={cardBackgroundColor}
          cardColor={cardColor}
        />
        {/* ... */}
      </View>
    </ScrollView>
  );
};

const styles = {
  // ...

  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cardContainer: {
    marginBottom: 10,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 2,
   
  },
  icon: {
    marginRight: 16,
  },
  text: {
    flex: 1,
    marginRight: 16,
  },
  arrowIcon: {
    marginLeft: "auto",
  },

  image: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    color: "tomato",
    marginLeft: "auto",
  },
};

export default Fixtures;
