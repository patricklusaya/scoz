import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider,signInWithPopup} from 'firebase/auth';
import { getDatabase, ref, query, equalTo, onValue, off } from 'firebase/database';

const firebaseConfig = {
  // apiKey: "AIzaSyAd-l_jsXV_t5HW7F_GVEjiodN4Kf86nik",
  // authDomain: "scoz-wp.firebaseapp.com",
  // projectId: "scoz-wp",
  // storageBucket: "scoz-wp.appspot.com",
  // messagingSenderId: "27598684099",
  // appId: "1:27598684099:web:b81faa0f7f85d1cb530776",
  // measurementId: "G-ZG4V3G5WVX",
  apiKey: "AIzaSyC-7BEwh9iQgwQXv9e4eWgA--YcxJoMpHA",
  authDomain: "scoz-9ac68.firebaseapp.com",
  projectId: "scoz-9ac68",
  storageBucket: "scoz-9ac68.appspot.com",
  messagingSenderId: "343551602827",
  appId: "1:343551602827:web:803618df1e3dd09454e48e",
  measurementId: "G-XEF3VCJ7QK",
  databaseURL: "https://scoz-wp-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
export { auth, provider };
// config/firebase.js
// ... (other imports)

// export const database = getDatabase();
// config/firebase.js
// ... (other imports)
// config/firebase.js
// ... (other imports)
export const fetchQuizzesByCategory = async (categoryName) => {
  const quizzesUrl = `${firebaseConfig.databaseURL}/quizzes.json?orderBy="categoryId"&equalTo="${categoryName}"`;

  try {
    const response = await fetch(quizzesUrl);
    const quizzesData = await response.json();

    if (quizzesData) {
      // Convert the quizzesData object into an array of quizzes
      const quizzes = Object.entries(quizzesData).map(([id, quiz]) => ({ id, ...quiz }));

      // Fetch questions for each quiz and add them to the quizzes array
      const quizzesWithData = await Promise.all(
        quizzes.map(async (quiz) => {
          const questionsUrl = `${firebaseConfig.databaseURL}/questions.json?orderBy="quizId"&equalTo="${quiz.id}"`;
          console.log('my qns', questionsUrl);
          const response = await fetch(questionsUrl);
          const questionsData = await response.json();

          return {
            ...quiz,
            questions: questionsData ? Object.values(questionsData) : [],
          };
        })
      );

      return quizzesWithData;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching quizzes and questions:', error);
    throw error;
  }
};
