import { UsersProvider } from "./context/UsersContext";
import { TablesProvider } from "./context/TableContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AppLayout from "./components/AppLayout";
import CreateDatabase from "./components/CreateDatabase";

function App() {
  return (
    <TablesProvider>
      <UsersProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="/" />} />
              <Route path="create-database" element={<CreateDatabase />} />
              <Route path="/home" element={<Home />} />
            </Route>
          </Routes>
        </Router>
      </UsersProvider>
    </TablesProvider>
  );
}

export default App;
