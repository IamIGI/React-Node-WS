import { useState } from 'react';
import { Home } from './Home';
import { Login } from './components/Login';

function App() {
  const [username, setUsername] = useState<string>('');

  return username ? (
    <Home username={username} />
  ) : (
    <Login onSubmit={(username: string) => setUsername(username)} />
  );
}

export default App;
