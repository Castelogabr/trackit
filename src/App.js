import Login from "./Login";
import Cadastro from "./Cadastro";
import Habitos from "./Habitos";
import Hoje from "./Hoje"
import Historico from "./Historico"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./Context/Auth";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/habitos" element={<Habitos />} />
        <Route path="/Hoje" element={<Hoje />} />
        <Route path="/Historico" element={<Historico />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
