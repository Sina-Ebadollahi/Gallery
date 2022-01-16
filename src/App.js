// styles
import "./App.css";
// routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import useGlobalContext from "./Hooks/useGlobalContext";
import MobileNavLink from "./Components/MobileNavLink/MobileNavLink";
function App() {
  const { isToggleMenuOpened, setIsToggleMenuOpened } = useGlobalContext();
  return (
    <div onClick={() => setIsToggleMenuOpened(false)} className="App">
      <Router>
        <Navbar />
        {isToggleMenuOpened && <MobileNavLink />}
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
