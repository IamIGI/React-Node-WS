import React from 'react';
import { useState } from 'react';
import { Login } from './components/Login';
import { Home } from './Home';

function App() {
  const [username, setUsername] = useState<string>('');

  return username ? (
    <Home username={username} />
  ) : (
    <Login onSubmit={(username: string) => setUsername(username)} />
  );
}

export default App;
