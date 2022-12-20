import { createContext, useState, useContext } from "react";
import axios from "axios";

export const LoginContext = createContext();

export default function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState("")
  const [porcentagem, setPorcentagem] = useState(0);
  const [habitos, setHabitos] = useState([]);
  const handleLogin = async (email, password) => {
    const body = {
      email, password
    }

    const res = await axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login`, body);
    localStorage.setItem("image", JSON.stringify(res.data.image));
    localStorage.setItem("manterOn", JSON.stringify(res));
    setUsuario(res.data);
    setToken(res.data.token)
  }

  return (
    <LoginContext.Provider value={{ handleLogin, usuario, token,habitos,setHabitos,porcentagem,setPorcentagem}}>
      {children}
      </LoginContext.Provider>
  );
}

export const useLoginProvider = () => {
  const context = useContext(LoginContext);

  return context;
}