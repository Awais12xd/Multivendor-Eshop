import axios from 'axios';
import react,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'

const ActivationPage = () => {
    const  {url}= useParams();
    const [error , setError] = useState(false)

    useEffect(()=> {
        if(url){
             const sendRequest = async () => {
        try {
            const res =  await fetch("http://localhost:8000/api/auth/activation",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({activation_token :url})
        })
          const data = await res.json();
          if(!res.ok){
            console.log(res)
              setError(true)
          }
          if(data){
            console.log(data)
          }
        } catch (error) {
            console.log(error.message , error)
        }
          
      };
      sendRequest();
        }
    } ,[])
  return (
    <div className='min-h-screen w-full flex justify-center items-center'>
        {
            error ? (
                <p>Your Token is expired</p>
            ):(
                <p>Your account is created successfully</p>
            )
        }
    </div>
  )
}

export default ActivationPage
