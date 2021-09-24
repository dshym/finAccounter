import './App.css';

import Navigation from './navigation/navigation';
import MainLayout from './Layout/Layout';

import MainScreen from './screens/MainScreen'

function App() {
  return (
    <div className="App">
        <MainLayout
            headerContent={<Navigation />}
            mainContent={<MainScreen />}
        />
    </div>
  );
}

export default App;
