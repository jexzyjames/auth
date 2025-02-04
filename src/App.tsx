import { useState } from "react";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Lottie from "lottie-react";
import loader from "./loader.json";
import "./App.css";
import {
  auth,
  fbProvider,
  googleProvider,
  signOut,
  signInWithPopup,
  appleProvider,
} from "./firebase/config";

function App() {
  const [status, setStatus] = useState("Sign in");
  const [user, setUser] = useState(null);
  const [appleloaded, setAppleLoaded] = useState(false);
  const [googleloaded, setGoogleLoaded] = useState(false);
  const [fbloaded, setFbLoaded] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoaded(true);      
      const result = await signInWithPopup(auth, googleProvider);
      const userData = result.user;
      console.log(userData);
      setUser({
        name: userData.displayName,
        email: userData.email,
        photo: userData.photoURL,
      });

      console.log("User Info:", userData);
      setGoogleLoaded(false)
    } catch (error) {
      setGoogleLoaded(false)
      console.error("Error:", error);
    }
  };

  const handleApplelogin = async () => {
    try {
      setAppleLoaded(true)
      const res = await signInWithPopup(auth, appleProvider);
      const datas = res.user;
      setUser({
        dp: datas.displayName,
        email: datas.email,
        photo: datas.photoURL,
      });
      setAppleLoaded(false)
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      setFbLoaded(true);
      const result = await signInWithPopup(auth, fbProvider);
      const userdata = result.user;
      console.log(userdata);
      setFbLoaded(false)

      setUser({
        name: userdata.displayName,
        email: userdata.email,
        photo: userdata.photoURL,
      });
      setFbLoaded(false)

    } catch (error) {
      setFbLoaded(false)
      console.error("error is being displayed here", error);
    }
  };

  return (
    <>
      <div className="wrapper">
        <h1>{status}</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="your@email.com" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          <b>
            <input type="checkbox" name="check" /> Remember me
          </b>{" "}
          <br />
          <input type="submit" value={status} />
          <h3>Forgot your password?</h3>
          <p>or</p>
          {googleloaded ? (
            <div>
              <Lottie className="loader" animationData={loader} />
            </div>
          ) : (
            <div onClick={handleGoogleLogin}>
              <FcGoogle onClick={handleGoogleLogin} />
              Sign in with Google
            </div>
          )}
           {appleloaded ? (
            <div>
              <Lottie className="loader" animationData={loader} />
            </div>
          ) : (
            <div onClick={handleApplelogin}>
              <FaApple onClick={handleApplelogin} />
              Sign in with Apple
            </div>
          )}

            {fbloaded ? (
            <div>
              <Lottie className="loader" animationData={loader} />
            </div>
          ) : (
            <div onClick={handleFacebookLogin}>
              <FaFacebook onClick={handleFacebookLogin} /> 
               Sign in with Facebook
            </div>
          )}
          <p>
            Don't have an account? <a href="#">Sign up</a>{" "}
          </p>
        </form>
      </div>

      <div>
        {user ? (
          <div>
            <img src={user.photo} alt="Profile" width="50" />
            <h3>{user.name}</h3>
            <p>dhsoidh</p>
            <p>{user.email}</p>
            <button onClick={() => signOut(auth).then(() => setUser(null))}>
              Sign Out
            </button>
          </div>
        ) : (
          <button onClick={handleFacebookLogin}>
            {" "}
            <FaFacebook /> Sign in with Facebook
          </button>
        )}
      </div>
    </>
  );
}

export default App;
