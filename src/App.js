// styles
import "./App.css";
// routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Pages
import Home from "./Pages/Home/Home";
import Images from "./Pages/Images/Images";
// Components
import Navbar from "./Components/Navbar/Navbar";
import MobileNavLink from "./Components/MobileNavLink/MobileNavLink";
// Context
import useGlobalContext from "./Hooks/useGlobalContext";
import Notfound from "./Pages/Notfound/Notfound";
function App() {
  const { isToggleMenuOpened, setIsToggleMenuOpened } = useGlobalContext();
  return (
    <div onClick={() => setIsToggleMenuOpened(false)} className="App">
      <Router>
        <Navbar />
        {isToggleMenuOpened && <MobileNavLink />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/images/:category/:id" element={<Images />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
