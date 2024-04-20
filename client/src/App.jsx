
import { UsersProvider } from "./context/UsersContext";
import {BrowserRouter as Router , Routes ,Route } from 'react-router-dom'
import Home from "./components/Home";

function App() {
  return (
    <UsersProvider>
      <Router>
<<<<<<< HEAD
        
=======
>>>>>>> ca55c763749e4eab637d6a02e9ada984b6493a9c
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
        <Home />
      </Router>
    </UsersProvider>
  );
}

export default App;
