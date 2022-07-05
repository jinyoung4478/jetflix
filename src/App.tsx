import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./routes/Home";
import Tv from "./routes/Tv";
import Search from "./Search";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
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
