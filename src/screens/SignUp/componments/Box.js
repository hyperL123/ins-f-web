import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import R_Box_GetTheApp from '../../Login/components/R_Box_GetTheApp'
import R_Box_OR from '../../Login/components/R_Box_OR'
import R_Box_Title from '../../Login/components/R_Box_Title'
import Box_Subtitle from './Box_Subtitle'
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message';

const CREATE_ACCOUNT_MUTATION = gql`
  mutation($firstName: String!, $userName: String!, $email: String!, $password: String!){
    createAccount(firstName: $firstName, userName: $userName, email: $email, password: $password) {
      ok
      error
    }
}
`




const Box = () => {
  const navigate  = useNavigate()
  const [accountCreated, setaccountCreated] = useState(false) 
    const {register, watch, formState:{errors} , handleSubmit, getValues, setError,clearErrors} = useForm({
      mode:'onChange'
    })
    const onCompleted = (data)=>{
      const {createAccount:{ok,error}} = data
      console.log(ok)
      if(!ok){
        setError('result', { type: 'custom', message: 'Wrong password' });
      }
      setaccountCreated(true)
      setTimeout (() => navigate('/login') , 5000)
      
    }
    const [createAccount,{loading,error}] = useMutation(CREATE_ACCOUNT_MUTATION,{
      onCompleted
    })
    const onSubmitValid = (data) =>{
      if(loading){
        return
      }
      createAccount(
        {
          variables:{
            ...data
          }
        }
      )
    }

    const inputCss = `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2`
    const submitCss = `text-white bg-blue-200 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 p-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800s`

  return (
    <div className="flex flex-col items-center justify-center bg-[white] w-128 m-4">
        <R_Box_Title />
        <Box_Subtitle />
        <div className="grid mt-6 w-80">
        {/* <button type="submit" className="text-white bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 p-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800s">Log in with FaceBook</button> */}
        </div>
        <R_Box_OR />
    <form onSubmit={handleSubmit(onSubmitValid)}>
    <div className="grid mb-6 w-80">
    <input  {...register("firstName",{required:"Please enter your first Name", minLength:{value: 5, message: "First Name should be longer than 5 charaters"}})} type="text" name='firstName' id="firstName" className={inputCss} placeholder="First Name" onChange={()=>clearErrors("result")}/>
    <input  {...register("lastName",{ minLength:{value: 5, message: "Last Name should be longer than 5 charaters"}})} type="text" id="lastName" name='lastName' className={inputCss} placeholder="Last Name" onChange={()=>clearErrors("result")}/>
    <input  {...register("email",{required:"Please enter your Email", minLength:{value: 5, message: "Email should be longer than 5 charaters"}})} type="text" id="email" name='email' className={inputCss} placeholder="Email" onChange={()=>clearErrors("result")}/>
    <input  {...register("userName",{required:"Please enter your Username", minLength:{value: 5, message: "Username should be longer than 5 charaters"}})} type="text" id="userName" name='userName' className={inputCss} placeholder="Username" onChange={()=>clearErrors("result")}/>
    <input  {...register("password",{required:"Please enter your Password", minLength:{value: 5, message: "Password should be longer than 5 charaters"}})} type="text" id="password" name='password' className={inputCss} placeholder="Password" onChange={()=>clearErrors("result")}/>
    <ErrorMessage
        errors={errors}
        name="firstName"
        render={({ message }) => <p>{message}</p>}
      />
          <ErrorMessage
        errors={errors}
        name="lastName"
        render={({ message }) => <p>{message}</p>}
      />
          <ErrorMessage
        errors={errors}
        name="email"
        render={({ message }) => <p>{message}</p>}
      />
          <ErrorMessage
        errors={errors}
        name="userName"
        render={({ message }) => <p>{message}</p>}
      />
          <ErrorMessage
        errors={errors}
        name="password"
        render={({ message }) => <p>{message}</p>}
      />
    
      <button type="submit" className={submitCss} >Sign up</button>
        {errors.result && <p>{errors.result.message}</p>}
        {accountCreated&& <p>Account successfully created. Please log in now</p>}
    </div> 
  

        <div className="grid gap-6 mb-6 w-80">

        <div className='flex items-center justify-center '>
        <div className='text-gray-400 text-sm'>People who use our serveice may have uploaded your contact infor mation to Instagram.</div>
        </div>
       
        </div>
        
        </form>
        <div className="BottomBox flex m-5">
      <div>Have an account?<Link to="/" className="text-blue-400 font-medium"> Log in</Link></div>
      </div>

      <R_Box_GetTheApp />
    </div>
  )
}

export default Box