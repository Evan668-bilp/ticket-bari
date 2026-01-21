// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {



//   apiKey: "AIzaSyByAIDQOHpjkTlCcSuEa8EGr2XZUVtNKxk",
//   authDomain: "ticket-bari-51ad0.firebaseapp.com",
//   projectId: "ticket-bari-51ad0",
//   storageBucket: "ticket-bari-51ad0.firebasestorage.app",
//   messagingSenderId: "925430801176",
//   appId: "1:925430801176:web:2e2f2dcb3281ad34b5746d"






// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);




// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {


//   apiKey: "AIzaSyByAIDQOHpjkTlCcSuEa8EGr2XZUVtNKxk",
//   authDomain: "ticket-bari-51ad0.firebaseapp.com",
//   projectId: "ticket-bari-51ad0",
//   storageBucket: "ticket-bari-51ad0.firebasestorage.app",
//   messagingSenderId: "925430801176",
//   appId: "1:925430801176:web:2e2f2dcb3281ad34b5746d"



// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);




import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyByAIDQOHpjkTlCcSuEa8EGr2XZUVtNKxk",
  authDomain: "ticket-bari-51ad0.firebaseapp.com",
  projectId: "ticket-bari-51ad0",
  storageBucket: "ticket-bari-51ad0.appspot.com",
  messagingSenderId: "925430801176",
  appId: "1:925430801176:web:2e2f2dcb3281ad34b5746d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
