
import { UsersProvider } from "./context/UsersContext";
import {BrowserRouter as Router , Routes ,Route } from 'react-router-dom'
import Home from "./components/Home";

function App() {
  return (
    <UsersProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
        <Home />
      </Router>
    </UsersProvider>
  );
}

export default App;
