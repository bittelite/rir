import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../constants/mutations';
import { useRouter } from 'next/router';
import { Layout } from '../components/layout/Layout';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({ variables: { username, password } });
      localStorage.setItem('token', data.login.authToken);
      console.log(data.login.authToken);
      const clearLocalStorage = () => {
        localStorage.removeItem('token');
      };
      setTimeout(clearLocalStorage, 300000);
      router.push('rir/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
        {error && <p>{error.message}</p>}
      </form>
    </Layout>
  );
}

export default LoginPage;