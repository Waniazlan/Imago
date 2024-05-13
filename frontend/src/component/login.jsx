// Login.js
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const Login = ({ onSuccess, onFailure }) => {
  return (
    <div>
      <h2>Login with Google</h2>
      <GoogleLogin
        clientId="433784948390-lp2v21b6svlilevtq6ek19pr55oq45bo.apps.googleusercontent.com"
        onSuccess={onSuccess}
        onFailure={onFailure}
        buttonText="Login with Google"
      />
    </div>
  );
};

export default Login;
