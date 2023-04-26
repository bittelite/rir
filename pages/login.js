import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../constants/mutations';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({ variables: { username, password } });
      localStorage.setItem('token', data.login.token); 
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
  );
}

export default LoginPage;