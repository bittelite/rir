import { Layout } from '../components/layout/Layout';
import { SignIn } from '../components/login/SignIn';
import { SignOut } from '../components/login/SignOut';
import { useState, useEffect } from 'react';

function LoginPage() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  const handleSignIn = (newToken) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', newToken);
      setToken(newToken);
    }
  };

  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      setToken(null);
      router.push('/')
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  return (
    <Layout>
      {token ? (
        <SignOut onSignOut={handleSignOut} />
      ) : (
        <SignIn onSignIn={handleSignIn} />
      )}
    </Layout>
  );
}

export default LoginPage;