import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const SignIn = () => {
  const handleSignIn = async () => {
    try {
      // Use Google authentication for signing in
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return <button onClick={handleSignIn}>Sign In with Google</button>;
};

export default SignIn;
