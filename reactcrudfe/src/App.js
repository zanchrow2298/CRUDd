
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Create from './create';
import Read from './get';
import Update from './update'

function App() {
  return (
<Router>
  <div className="main">
    <h2 className="main-header">CRUD</h2>
    <div>
      <Routes>
        <Route exact path='/create' element={<Create />} />
      </Routes>
    </div>
    <div>
    <Routes>
        <Route exact path='/read' element={<Read />} />
      </Routes>
    </div>
    <div>
    <Routes>
        <Route exact path='/update' element={<Update />} />
      </Routes>
    </div>
  </div>
</Router>
  );
}

export default App;
