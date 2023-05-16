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
      <form className='grid grid-flow-row gap-4 font-bold' onSubmit={handleSubmit}>
        <fieldset className='grid grid-flow-row'>
          <label for="brukernavn">Brukernavn:</label>
          <input id="brukernavn" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Brukernavn' className='p-1 rounded-md border-2 border-sky-950 hover:border-teal-600 focus:outline-none' />
        </fieldset>
        <fieldset className='grid grid-flow-row'>
          <label for="passord">Password:</label>
          <input id="brukernavn" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='**********' className='p-1 rounded-md border-2 border-sky-950 hover:border-teal-600 focus:outline-none' />
        </fieldset>
        <button className='p-1 text-white rounded-md bg-sky-950 hover:bg-teal-800 active:bg-teal-700 focus:outline-none focus:bg-teal-700' type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Logg inn'}
        </button>
        {error && <p className='text-center text-red-600 py-5 px-10 border-red-600 border-2 bg-red-200'>{error.message}</p>}
      </form>
    </Layout>
  );
}

export default LoginPage;