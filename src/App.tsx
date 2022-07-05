import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Search";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/*" element={< Home />}>
          < Route path="movies/:id" element={< Home />} />
        </Route>
        <Route path="movies/:id" element={< Home />} />
        <Route path="tv" element={<Tv />}></Route>
        <Route path="search" element={<Search />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
