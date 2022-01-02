import React from 'react';
import { useGoogleLogin } from 'react-use-googlelogin';

const GoogleAuthContext = React.createContext();

export const GoogleAuthProvider = ({ children }) => {
  const googleAuth = useGoogleLogin({
    clientId: '934914015863-16l8d98h298c138eqca115cf2l587k3a.apps.googleusercontent.com' // process.env.GOOGLE_CLIENT_ID, // Your clientID from Google.
  });

  return (
    <GoogleAuthContext.Provider value={googleAuth}>
      {/* The rest of your app */}
      {children}
    </GoogleAuthContext.Provider>
  );
};

export const useGoogleAuth = () => React.useContext(GoogleAuthContext);
