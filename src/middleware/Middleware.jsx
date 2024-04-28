import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { tokenState, userState } from '../globalStates/RecoilState';

function middleware({children}) {
  
  const [user, setUser] = useRecoilState(userState);
  const [token, setToken] = useRecoilState(tokenState);

  const localUser = localStorage.getItem("user");
  const localToken = localStorage.getItem("token");

  useEffect(() => {
    setUser(localUser ? JSON.parse(localStorage.getItem("user")) : null);
    setToken(localToken ? localStorage.getItem("token") : null);
  }, []);

  return children;
}

export default middleware