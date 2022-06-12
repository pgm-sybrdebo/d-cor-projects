import { useContext, createContext, useState, useEffect } from "react";
import { TokenInfo } from "../interfaces";
import jwt_decode from "jwt-decode";

const UserContext = createContext<"" | TokenInfo | null>(null);

const UserProvider = ({ children }: any) => {
  const [jwtToken, setJwtToken] = useState<"" | TokenInfo | null>(null);
  const token = localStorage.getItem("D-corprojectsToken");
  const decodedToken = token && jwt_decode<TokenInfo>(token);

  useEffect(() => {
    setJwtToken(decodedToken);
    // eslint-disable-next-line
  }, [token]);

  return (
    <UserContext.Provider value={jwtToken}>{children}</UserContext.Provider>
  );
};

const useUser = () => {
  const user = useContext(UserContext);

  return user;
};

export { UserProvider, useUser };
