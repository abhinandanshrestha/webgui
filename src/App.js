import Sidenav from './components/Sidenav';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import StackedAreaChart from './components/StackedAreaChart';
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
            <Route exact path="/" element={<StackedAreaChart/>}/>
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
