import React, { useState } from 'react';

export function Login({ onSubmit }: { onSubmit: (username: string) => void }) {
  const [username, setUsername] = useState<string>('');

  return (
    <>
      <h1>Welcome</h1>
      <p>What should people call you?</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(username);
        }}
      >
        <input
          type="text"
          value={username}
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
