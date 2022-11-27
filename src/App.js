import Sidenav from './components/Sidenav';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import StackedAreaChart from './components/StackedAreaChart';
import Traffic from './components/Traffic';
import Alert from './components/Alert';
import Timeseries from './components/Timeseries';
import Form from './components/Form';

function App() {
  return (
    <Router>
    <div className='container'>
        <div className='mathi_div'>
            <Sidenav/>  
              <Routes>
                <Route exact path="/" element={<><Traffic/><StackedAreaChart/></>}/>
                <Route exact path="/timeseries" element={<><Traffic/><Timeseries/></>}/>
                <Route exact path="/form" element={<Form/>}/>
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
