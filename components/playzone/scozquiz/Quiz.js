import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity,StyleSheet ,ImageBackground} from 'react-native';
import { fetchQuizzesByCategory } from '../../../config/firebase';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';

const audioFiles = {
  buzzer: require('../../../assets/buzzer2.mp3'),
  ding: require('../../../assets/ding.mp3'),
};
export const Quiz = ({ route }) => {
  const { category } = route.params;
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctnessMessage, setCorrectnessMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);
  const [buzzerSound, setBuzzerSound] = useState(null);
  const [dingSound, setDingSound] = useState(null);
  const [sound, setSound] = useState(null);
  const totalQuestions = quizzes.reduce(
    (total, quiz) => total + Object.keys(quiz.questions).length,
    0
  );


 

  useEffect(() => {
    const loadAudio = async (filename) => {
      try {
        const { sound } = await Audio.Sound.createAsync(filename);
        return sound;
      } catch (error) {
        console.log(`Error loading ${filename}:`, error);
        return null;
      }
    };

    const loadSounds = async () => {
      const [buzzer, ding] = await Promise.all([
        loadAudio(audioFiles.buzzer),
        loadAudio(audioFiles.ding),
      ]);

      if (buzzer && ding) {
        setSound({ buzzer, ding });
      }
    };

    loadSounds();

    fetchQuizzesByCategory(category.name)
      .then((quizzesData) => {
        setQuizzes(quizzesData);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching quizzes:', error);
        setLoading(false);
      });
  }, [category]);

  const handleGoBack = () => {
    // Navigate back when the cross icon is pressed
    navigation.goBack();
  };

  const handleOptionSelect = (answer) => {
    setSelectedAnswer(answer);
  };
  const handleAnswerSubmit = async () => {
    if (selectedAnswer === null) {
      return;
    }

    const currentQuiz = quizzes[0]; // Assuming there's only one quiz in the array
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];

    const correct = parseInt(currentQuestion.correctAnswer);
    const selected = parseInt(selectedAnswer);

    if (sound) {
      if (selected === correct) {
        setCorrectnessMessage('Correct!');
        setNumCorrectAnswers((prevNumCorrect) => prevNumCorrect + 1);
        sound.ding.playAsync();
      } else {
        setCorrectnessMessage('Wrong!');
        sound.buzzer.playAsync();
      }
    }

    setSelectedAnswer(null);

    // Move to the next question or end the quiz
    if (currentQuestionIndex + 1 < currentQuiz.questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setCurrentQuestionIndex(-1); // Indicates no more questions
    }
  };
  

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading quizzes...</Text>
      </View>
    );
  }

  const currentQuiz = quizzes[0]; // Assuming there's only one quiz in the array
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  // if (currentQuestionIndex === -1) {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.noQuizText}>No more questions</Text>
  //     </View>
  //   );
  // }

  if (currentQuestionIndex === -1) {
    let completionMessage;

    if (numCorrectAnswers === 0) {
      completionMessage = `You got ${numCorrectAnswers}/${totalQuestions}. No Scoz Coin gained`;
    } else {
      const coinsEarned = numCorrectAnswers * 10;
      completionMessage = `You got ${numCorrectAnswers}/${totalQuestions}.Congratulations 🎉 You have earned ${coinsEarned} scoz coins`;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.noQuizText}>{completionMessage}</Text>
      </View>
    );
  }

  return (
    <ImageBackground
    source={require('../../../assets/images/pitch2.jpg')}// Replace with the path to your background image
    style={styles.backgroundImage}
  >
    <View style={styles.transparentBackground}>
    <View style={styles.headerBackground}>
        <View style={styles.header}>
        <Text style={styles.headerTitle}></Text>
          <Text style={styles.headerTitle}>{category.name}</Text>
          
          <TouchableOpacity onPress={handleGoBack}>
            <Ionicons name="close-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
        </View>
        
    <View style={styles.container}>
      {currentQuestionIndex === -1 ? (
        <View style={styles.quizContainer}>
          {numCorrectAnswers === 0 ? (
            <Text style={styles.noQuizText}>
              You got {numCorrectAnswers}/{totalQuestions}. No Scoz Coin gained
            </Text>
          ) : (
            <Text style={styles.noQuizText}>
              You got {numCorrectAnswers}/{totalQuestions}. Congratulations 🎉 You have earned{' '}
              {numCorrectAnswers * 10} scoz coins
            </Text>
          )}
        </View>
      ) : (
        <View style={styles.quizContainer}>
          <Text style={styles.questionText}>{currentQuestion.text}</Text>

          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleOptionSelect(index + 1)}
              style={[
                styles.optionButton,
                selectedAnswer === index + 1 ? styles.selectedOption : null,
              ]}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity onPress={handleAnswerSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>

          <Text style={styles.correctnessMessage}>{correctnessMessage}</Text>
        </View>
      )}
    </View>
    </View>
  </ImageBackground>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensure the image covers the whole screen
  },
  transparentBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // A semi-transparent black background
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop:20,
    marginBottom: 16,
    borderBottomColor:'tomato'
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerBackground:{
    marginTop:25,
    paddingTop:6,
    paddingBottom:6,
    padding:10,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
backgroundColor:'rgba(0, 0, 0, 0.4)'
  },
  loadingText: {
    fontSize: 20,
  },
  noQuizText: {
    fontSize: 20,
  },
  quizTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color:'white'
  },
  quizContainer: {
    alignItems: 'center',
  },
  questionText: {
    color:'white',
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  optionButton: {
    width: 200,
    marginBottom: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: 'lightblue',
  },
  optionText: {
    fontSize: 16,
    color:'white'
  },
  submitButton: {
    width: 300,
    marginTop:26,
    marginBottom: 8,
    padding: 12,
    backgroundColor:'tomato',
    borderRadius: 4,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  correctnessMessage: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Quiz;