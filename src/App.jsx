import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage"
import Announcement from "./components/Announcement";
import Navbar from "./components/Navbar";

function App() {
  return(
    <div className="App">
      <Announcement />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products/:gender" element={<ProductPage/>}/>
      </Routes>
    </div>
  )
}

export default App;
