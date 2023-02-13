import React, { useState } from 'react';
import Router from './shared/Router';
import { getAuth } from 'firebase/auth';

function App() {
  const [isLoggedIn] = useState(getAuth().currentUser);
  return (
    <div>
      <Router isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default App;
