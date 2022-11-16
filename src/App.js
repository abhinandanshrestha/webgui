import Sidenav from './components/Sidenav';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Histogram from './components/Histogram';
// import Timeseries from './components/Timeseries';
import Traffic from './components/Traffic';
import Alert from './components/Alert';
import Timeseries from './components/Timeseries';

function App() {
  return (
    <Router>
    <div className='container'>
        <div className='mathi_div'>
          <Sidenav/>  
          <Traffic/>
          <Routes>
            <Route exact path="/" element={<Histogram/>}/>
            <Route exact path="/timeseries" element={<Timeseries/>}/>
          </Routes>
        </div>
        <div className='tala_div'>
          <Alert/>
        </div>
      </div>

    </Router>
    
  );
}

export default App;
