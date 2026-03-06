import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Site from "./Pages/Site";
import Admin from "./Pages/Admin";
import About from "./Components/Site/About";
import Resume from "./Components/Site/Resume";
import HireMe from "./Components/Site/Hireme";


function App() {
  return (
    <Router>
      <Routes>
        {/* Site público */}
        <Route path="/" element={<Site />} />

        {/* Admin */}
        <Route path="/admin/*" element={<Admin />} />
        {/* Roats da navBar */}
         <Route path="/about" element={<About />} />
         <Route path="/resume" element={<Resume/>}></Route>
         <Route path="/hireme" element={<HireMe/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
