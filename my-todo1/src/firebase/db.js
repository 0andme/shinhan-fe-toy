import firebase from "firebase/app"; // 파이어베이스 기능 불러오기
import "firebase/firestore"; // 파이어베이스의 파이어스토어 기능 불러오기

const firebaseConfig = {
  apiKey: "AIzaSyAQYshy0vtolao-1BlJav-Ji6LLpfP4z00",
  authDomain: "my-todo1-ab9e5.firebaseapp.com",
  projectId: "my-todo1-ab9e5",
  storageBucket: "my-todo1-ab9e5.appspot.com",
  messagingSenderId: "377620206073",
  appId: "1:377620206073:web:2d434aa0e4df407523ad28",
};

export const db = firebase.initializeApp(firebaseConfig).firestore();
