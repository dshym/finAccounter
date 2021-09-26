import React from 'react';
import './App.css';

import Navigation from './navigation/navigation';
import MainLayout from './Layout/Layout';
import NavigationSwitch from './navigation/navigationSwitch';

function App() {
  return (
    <div className="App">
        <MainLayout mainContent={<NavigationSwitch />}>
            <Navigation />
        </MainLayout>
    </div>
  );
}

export default App;
