import React, { useState, useContext } from 'react'
import { Box , TextField, Button, styled, Typography } from '@mui/material';
import { API } from '../../service/api';
import { DataContext } from '../../context/Dataprovider';
import { useNavigate } from 'react-router-dom';
 
const Component = styled(Box)`
    width: 400px;
    margin: 100px auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.6);
    display: flex;
    flex-direction: column;
    align-items: center;
    & > div, & > button {
        margin-top: 20px;
    }
`;



const Image = styled('img')`
    margin:15px;
    width:275px;    
`; 

const Text = styled(Typography)`
    margin-top:20px;
`;

const SignUpButton = styled(Button)`
    text-transform: none;
    width: auto;
    margin-bottom: 10px;
    :hover {
        background-color: green;
        color: #fff;
    }
`;


const SignInButton = styled(Button)`
    text-transform: none;
    width: 70px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: aff616;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;   
`
const Form = styled('form')`
    display: flex;
    flex-direction: column;
    align-items: center;
    & > div, & > button {
        margin-top: 20px;
    }
`




function Login({isUserAuthenticated}) {
    const [account, setAccount] = useState('signIn')
   


    const toggleSignIn = () => {
        account === 'signIn' ? setAccount('signUp') : setAccount('signIn') 
    }

    const loginInitialValues = {
        username: '',
        password: ''
    }

    const signUpInitialValues = {
        username : '',
        emailId : '',
        password : ''
    }

    const [signup, setSignup] = useState(signUpInitialValues)
    const [error, setError] = useState('');
    const [login, setLogin] = useState(loginInitialValues);

    //to navigate to home page
    const navigate = useNavigate(); 

    const { setContext } =useContext(DataContext) //context api

    const onInputChange = (e) => {
        console.log(signup)
        setSignup({...signup,[e.target.name]: e.target.value})
        
    }
    
    const signupUser = async() => {
        let response = await API.userSignup(signup);

        console.log(response)
        if(response.isSuccess){
            
            setSignup(signUpInitialValues)
            setAccount('signIn')
            setError('')
        } else {
            setError('Something went wrong! Please try again later');
        }
    }

    const onvaluechange = (e) => {
            setLogin({...login,[e.target.name]: e.target.value})
    }

    const loginUser = async() => {
        let response = await API.userLogin(login);
        console.log(response)
        if(response.isSuccess){
            setError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            
            setContext({username: response.data.username, emailId: response.data.emailId});
            isUserAuthenticated(true);
            navigate('/');
        } else {
            setError ('Something went wrong! Please try again later');
            
        }
    }



  return (
    account === 'signIn' ? 

    <Component>
      <Image src={'https://www.farmgirlmarketingsolutions.com/wp-content/uploads/2015/12/blog-pic-b2c.jpg'} alt={'blog'}/>
      
      <TextField id="standard-basic"  onChange={(e)=> onvaluechange(e)} label="Username" variant="standard" name="username" value={login.username}/>
      <TextField id="standard-basic" onChange={(e)=> onvaluechange(e)} label="Password" variant="standard" name="password" value={login.password}/>
      {error && <Error>{error}</Error>}
      <SignInButton variant="contained" onClick={()=> loginUser()}>Login</SignInButton>
      <Text>OR</Text>
      <SignUpButton variant="text" onClick={()=>toggleSignIn()}>Signup</SignUpButton>
      
    </Component>
    :
        <Component>
        <Form>
        <Image src={'https://www.farmgirlmarketingsolutions.com/wp-content/uploads/2015/12/blog-pic-b2c.jpg'} alt={'blog'}/>
        <TextField id="standard-basic" onChange={(e)=>onInputChange(e)} label="Username" variant="standard" name="username"  value={signup.username} />
        <TextField id="standard-basic" onChange={(e)=>onInputChange(e)} label="EmailId" variant="standard" name="emailId" value={signup.emailId} />
        <TextField id="standard-basic" onChange={(e)=>onInputChange(e)} label="Password" variant="standard" name="password" value={signup.password} />
        {error && <Error>{error}</Error>}
        <SignInButton onClick={() => signupUser()} variant="contained">SignUp</SignInButton>
        <Text>OR</Text>
        <SignUpButton variant="text" onClick={()=>toggleSignIn()}>Already have an account</SignUpButton>
        </Form>
        </Component>
  )
}

export default Login
