import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProductsList from "./pages/ProductsList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ProductsList" element={<ProductsList />} />
      </Routes>
    </Router>
  );
}

export default App;
