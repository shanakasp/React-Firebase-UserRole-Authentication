import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import UserFeature from './UserFeature';
import AdminFeature from './AdminFeatures';
import SignIn from './SignIn';
import Dashboard from "./Compenents/Dashboard";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzr_TXYZId-ia2sCqFFuCayfb6suneMKk",
  authDomain: "react-userrole.firebaseapp.com",
  projectId: "react-userrole",
  storageBucket: "react-userrole.appspot.com",
  messagingSenderId: "869322231794",
  appId: "1:869322231794:web:2375ccb8155703d35d656b",
  measurementId: "G-GERGHH0T4J"
  // Add other config values here
};

firebase.initializeApp(firebaseConfig);

const App = () => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState('user'); // Default role is "user"

  // Listen for changes in authentication state
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        setUserRole('user'); // Reset user role when the user logs out
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Fetch user role from Firestore when the user is logged in
  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        // Check if the user is the admin based on their email
        const isAdmin = user.email === 'shanakaprince@gmail.com';
        setUserRole(isAdmin ? 'admin' : 'user');
      }
    };

    fetchUserRole();
  }, [user]);

  // Sign out user
  const handleSignOut = () => {
    firebase.auth().signOut();
  };

  return (
    <div>
    <Dashboard></Dashboard>
      {user ? (
        <div>
          <h1>Welcome, {user.email}!</h1>
          <p>Your role: {userRole}</p>
          <button onClick={handleSignOut}>Sign Out</button>
          {userRole === 'admin' ? <AdminFeature /> : <UserFeature />}
        </div>
      ) : (
        <div>
          <h1>Not Logged In</h1>
          <SignIn />
        </div>
      )}
    </div>
  );
};

const UserFeatures = () => {
  return <UserFeature />;
};

const AdminFeatures = () => {
  return <AdminFeature />;
};

export default App;
