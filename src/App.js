import Login from "./Login";
import Cadastro from "./Cadastro";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./Context/Auth";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
