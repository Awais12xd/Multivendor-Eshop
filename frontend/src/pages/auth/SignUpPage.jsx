import React, { useEffect } from 'react'
import SignUp from '../../components/auth/SignUp.jsx'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SignUpPage = () => {
  const navigate = useNavigate();
  const {isAuth} = useSelector((state) => state.user);

  useEffect(() => {
    if(isAuth){
      navigate("/");
    }
  } ,[])
  return (
    <div>
      <SignUp />
    </div>
  )
}

export default SignUpPage
