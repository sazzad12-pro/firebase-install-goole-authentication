import "./App.css";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "./firebase.init";
import { useState } from "react";
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const singInhandel = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const singOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        setUser({});
      });
  };
  return (
    <div className="App">
      <div className="sing">
        <h2>Name:{user.displayName}</h2>
        <p>
          <big>I Know your Email:{user.email}</big>
        </p>
        <img src={user.photoURL} alt="" />
      </div>
      {user.email ? (
        <button onClick={singOut}>sing out</button>
      ) : (
        <button onClick={singInhandel}>Google sing in</button>
      )}
    </div>
  );
}

export default App;
