import React from 'react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message';
import { gql, useMutation } from '@apollo/client';
import { logUserIn } from '../../../apollo';
import { useLocation, useNavigate } from 'react-router-dom';


const LOGIN_MUTATION = gql`
  mutation($userName: String!, $password: String!){
    login(userName: $userName, password: $password) {
      ok
      token
      error
    }
  }
`




const R_Box_InPut = ({items}) => {
  const navigate = useNavigate()
    const {register, watch, formState:{errors} , handleSubmit, getValues, setError,clearErrors} = useForm({
      mode:'onChange'
    })

    const onCompleted = (data)=>{
      const {login:{ok,error,token}} = data
      console.log(ok)
      if(!ok){
        setError('result', { type: 'custom', message: 'Wrong password' });
      }
      if(token){
        logUserIn(token)
      }
      navigate("/")
    }
    const [login,{loading,error}] = useMutation(LOGIN_MUTATION,{
      onCompleted
    })
    const onSubmitValid = () =>{
      const [userName, password]  = getValues(["username","password"])
      if(loading){
        return
      }
      login(
        {
          variables:{
            userName,
            password
          }
        }
      )
    }
    
    const inputCss = `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2`
    const submitCss = !errors?`text-white bg-blue-200 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 p-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800s`:`text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 p-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800s`
  return (
    <form onSubmit={handleSubmit(onSubmitValid)}>
    <div className="grid gap-6 mb-6 w-80">
    <input  {...register("username",{required:"Please enter your username", minLength:{value: 5, message: "Username should be longer than 5 charaters"}})} type="text" id={items.item1} className={inputCss} placeholder={items.item1} onChange={()=>clearErrors("result")}/>
    <input {...register("password",{required:"Please enter your password", minLength:{value: 5, message: "Password should be longer than 5 charaters"}})} type="password" id={items.item2} className={inputCss}  placeholder={items.item2} onChange={()=>clearErrors("result")}/>
    <ErrorMessage
        errors={errors}
        name="username"
        render={({ message }) => <p>{message}</p>}
      />
    <ErrorMessage
        errors={errors}
        name="password"
        render={({ message }) => <p>{message}</p>}
      />
    <button type="submit" className={submitCss} disabled={!errors ||loading}>Log in</button>
    {errors.result && <p>{errors.result.message}</p>}
</div> 

</form>
  )
}

export default R_Box_InPut