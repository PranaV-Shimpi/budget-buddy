import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Header from "../components/Header";
import { toast } from "react-toastify";

const SignUpSignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false); // To toggle between sign-up and sign-in
  const [forgotPassword, setForgotPassword] = useState(false); // To toggle forgot password mode
  const navigate = useNavigate();

  const createUserDocument = async (user) => {
    setLoading(true);
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();

      try {
        await setDoc(userRef, {
          name: displayName ? displayName : name,
          email,
          photoURL: photoURL ? photoURL : "",
          createdAt,
        });
        toast.success("Account Created!");
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        console.error("Error creating user document: ", error);
        setLoading(false);
      }
    }
  };

  const signUpWithEmail = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;
      await createUserDocument(user);
      toast.success("Successfully Signed Up!");
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
      console.error(
        "Error signing up with email and password: ",
        error.message
      );
      setLoading(false);
    }
  };

  const signInWithEmail = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      navigate("/dashboard");
      toast.success("Logged In Successfully!");
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      console.error(
        "Error signing in with email and password: ",
        error.message
      );
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await createUserDocument(user);
      toast.success("User Authenticated Successfully!");
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      console.error("Error signing in with Google: ", error.message);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
      setForgotPassword(false); // Return to sign-in mode after successful reset
    } catch (error) {
      toast.error(error.message);
      console.error("Error sending password reset email: ", error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="wrapper signup">
        {forgotPassword ? (
          <div className="signup-signin-container">
            <h2 style={{ textAlign: "center" }}>
              Reset Password on <span className="blue-text">Budget Buddy</span>
            </h2>
            <form onSubmit={handlePasswordReset}>
              <div className="input-wrapper">
                <p>Email</p>
                <input
                  type="email"
                  placeholder="JohnDoe@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button type="submit" className="btn">
                {loading ? "Loading..." : "Send Reset Email"}
              </button>
              <p
                onClick={() => setForgotPassword(false)}
                style={{
                  textAlign: "center",
                  marginTop: "1rem",
                  cursor: "pointer",
                }}
              >
                Back to <span className="link-btn">Sign In</span>
              </p>
            </form>
          </div>
        ) : flag ? (
          <div className="signup-signin-container">
            <h2 style={{ textAlign: "center" }}>
              Log In on <span className="blue-text">Budget Buddy</span>
            </h2>
            <form onSubmit={signInWithEmail}>
              <div className="input-wrapper">
                <p>Email</p>
                <input
                  type="email"
                  placeholder="JohnDoe@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-wrapper">
                <p>Password</p>
                <input
                  type="password"
                  placeholder="Example123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                disabled={loading}
                className="btn"
                onClick={signInWithEmail}
              >
                {loading ? "Loading..." : " Log In with Email and Password"}
              </button>
            </form>
            <p style={{ textAlign: "center", margin: 0 }}>or</p>
            <button
              disabled={loading}
              className="btn btn-blue"
              onClick={signInWithGoogle}
            >
              {loading ? "Loading..." : " Log In with Google"}
            </button>
            <p
              onClick={() => setFlag(!flag)}
              style={{
                textAlign: "center",
                marginBottom: 0,
                marginTop: "0.5rem",
                cursor: "pointer",
              }}
            >
              Or Don't Have An Account?
              <br/>
              <span className="link-btn">Click Here Register</span>
            </p>
            <p
              onClick={() => setForgotPassword(true)}
              style={{
                textAlign: "center",
                marginTop: "0.5rem",
                cursor: "pointer",
                fontSize:"small",
                 padding:"10px"
              }}
            >
              Forgot Password? <span className="link-btn">Click Here</span>
            </p>
          </div>
        ) : (
          <div className="signup-signin-container">
            <h2 style={{ textAlign: "center" }}>
              Sign Up on <span className="blue-text">Budget Buddy</span>
            </h2>
            <form onSubmit={signUpWithEmail}>
              <div className="input-wrapper">
                <p>Full Name</p>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-wrapper">
                <p>Email</p>
                <input
                  type="email"
                  placeholder="JohnDoe@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-wrapper">
                <p>Password</p>
                <input
                  type="password"
                  placeholder="Example123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="input-wrapper">
                <p>Confirm Password</p>
                <input
                  type="password"
                  placeholder="Example123"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn">
                {loading ? "Loading..." : "Sign Up with Email and Password"}
              </button>
            </form>
            <p style={{ textAlign: "center", margin: 0 }}>or</p>
            <button
              disabled={loading}
              className="btn btn-blue"
              onClick={signInWithGoogle}
            >
              {loading ? "Loading..." : "Sign Up with Google"}
            </button>
            <p
              onClick={() => setFlag(!flag)}
              style={{
                textAlign: "center",
                marginBottom: 0,
                marginTop: "0.5rem",
                cursor: "pointer",
              }}
            >
              Or Have An Account Already?
              <br/>
              <span className="link-btn">Click Here to Login</span>
            </p>
            <p
              onClick={() => setForgotPassword(true)}
              style={{
                textAlign: "center",
                marginTop: "0.5rem",
                cursor: "pointer",
                 fontSize:"small",
                 padding:"10px"
              }}
            >
              Forgot Password? <span className="link-btn">Click Here</span>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default SignUpSignIn;
