import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainWrapper from "./layouts/MainWrapper";
import Login from "./views/auth/Login";
import PrivateRoute from "./layouts/PrivateRout";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <MainWrapper>
        <PrivateRoute>
          <Routes>
            <Route path="/login/" element={<Login />} />
          </Routes>
        </PrivateRoute>
      </MainWrapper>
    </BrowserRouter>
  );
}

export default App;
