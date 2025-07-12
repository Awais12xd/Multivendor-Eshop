import React, { useEffect } from 'react'
import Login from '../../components/auth/Login.jsx';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LoginPage = () => {
  const navigate = useNavigate();
  const {isAuth} = useSelector((state) => state.user);

  useEffect(() => {
    console.log(isAuth)
    if(isAuth){
      navigate("/");
    }
  } ,[])
  return (
    <div>
      <Login /> 
    </div>
  )
}

export default LoginPage
