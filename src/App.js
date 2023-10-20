import { BrowserRouter,Route,Routes } from "react-router-dom";
import ShowPacientes from './components/ShowPacientes'
import Login from './routes/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/paciente" element={<ShowPacientes></ShowPacientes>}></Route>
        <Route path="/" element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
