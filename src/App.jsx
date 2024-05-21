import { Route, Routes, BrowserRouter } from "react-router-dom";
import MainWrapper from "./layouts/MainWrapper";
import Login from "./views/auth/Login";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
          <MainWrapper>
            <Routes>
              <Route path="/login/" element={<Login />} />
          </Routes>
      </MainWrapper>
    </BrowserRouter>
  );
}

export default App;
