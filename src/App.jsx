import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Site from "./Pages/Site";
import Admin from "./Pages/Admin";

function App() {
  return (
    <Router>
      <Routes>
        {/* Site público */}
        <Route path="/" element={<Site />} />

        {/* Admin */}
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
