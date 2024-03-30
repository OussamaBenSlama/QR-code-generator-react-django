import './App.css';
import MyForm from './Components/MyForm'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Home from './Page/Home';
import { BrowserRouter as Router, Route,Routes, Link } from 'react-router-dom';
import Form from './Page/Form';


function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
      <Routes>
      <Route path="/form" element={<Form/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
