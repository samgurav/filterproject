import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState ,useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Swal from "sweetalert2"; 
const bcrypt = require('bcryptjs')
const regForName = RegExp(/^[A-Za-z]{3,10}$/);
const regForUName = RegExp(/^[A-Za-z]{2,12}$/);
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPass = RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/);

const paperStyle={padding:20,height:'120vh', width:650, margin:'20px auto'}


const theme = createTheme();

export default function Registration() {
    const fNameInput = useRef(null);
    const lNameInput = useRef(null);
    const emailInput = useRef(null);
    const usernameInput = useRef(null);
    const passInput = useRef(null);
    const cPassInput = useRef(null);
    const[data,setData]=useState();
    const navigate=useNavigate()
   const [select,setSelect]=useState()
    const[flag,setFlag]=useState(false)
  const [Errors,SetError]=useState({
    fname:'',
    lname:'',
    email:'',
    username:'',
    password:'',
    cpassword:'',
  })
  const handler=(e)=>{
    const {name,value}= e.target;
    switch(name){
      case 'fname':
        Errors.fname= regForName.test(value)?'':'first name should be between 2 to 10 letters';
        break;
        case 'lname':
          Errors.lname= regForName.test(value)?'':'last name should be between 2 to 10 letters';
     break;
     case 'username':
                  Errors.username= regForUName.test(value)?'':'username should be between 2 to 12 letters';
             break;
             case 'email':
              Errors.email= regForEmail.test(value)?'':'invalid email';
         break;
         case 'password': 
         Errors.password=regForPass.test(value)?'':'Password must be between 6 to 16 characters and must contain one number and one special character';
          break;
       case 'cpassword':
          Errors.cpassword=passInput.current.value===cPassInput.current.value?'':'Password do not match';
        break; 
      
    }
    setSelect({Errors,[name]:value},()=>{
      console.log(Errors)
    })
    
  }
  
   const validate=(errors)=>{
    let valid = true;
    Object.values(errors).forEach((val)=> 
        val.length>0 && (valid = false));
        return valid;
        }
        
        const submit = (event)=>{
          event.preventDefault();
        
          const hashPass = bcrypt.hashSync(passInput.current.value, bcrypt.genSaltSync());
          if(validate(Errors))
          {
            const URL="  http://localhost:3002/users"
            let formData={
              fname:fNameInput.current.value,
              lname:lNameInput.current.value,
              email:emailInput.current.value,
              username:usernameInput.current.value,
              cpassword:cPassInput.current.value,
              password : hashPass
      
            }
        
            axios.post(URL,formData)
            setFlag(true)
            axios.get(URL)
            .then(res=>{
              console.log(res.data)
              setData(res.data)
            })
  
              // alert("Form Submitted SuccesFully");
              Swal.fire({
                icon: 'success',
              
                text: 'User Registered Successfully',
              
              })
             
          }
          else{
              alert("Invalid Form");
          }
  
      } 

  return (
    <Paper elevation={10} style={paperStyle }>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#C71585' }}>
          
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" required onSubmit={submit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fname"
                  required
                  fullWidth
                  inputRef={fNameInput}
                  id="fname"
                  label="First Name"
                  onChange={handler}
                  autoFocus
                />
                  {Errors.fname.length>0 &&
                  <span style={{color:"red"}}>{Errors.fname}</span>}   
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lname"
                  label="Last Name"
                  name="lname"
                  autoComplete="family-name"
                  onChange={handler}
                  inputRef={lNameInput}
                />
                  {Errors.lname.length>0 &&
                  <span style={{color:"red"}}>{Errors.lname}</span>}   
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Enter Username"
                  name="username"
                  autoComplete="username"
                  onChange={handler}
                  inputRef={usernameInput}
                />
                  {Errors.username.length>0 &&
                  <span style={{color:"red"}}>{Errors.username}</span>}   
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handler}
                  inputRef={emailInput}
                />
                  {Errors.email.length>0 &&
                  <span style={{color:"red"}}>{Errors.email}</span>}   
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handler}
                  inputRef={passInput}
                />
                  {Errors.password.length>0 &&
                  <span style={{color:"red"}}>{Errors.password}</span>}   
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="cpassword"
                  label="Confirm Password"
                  type="password"
                  id="cpassword"
                  autoComplete="new-password"
                  onChange={handler}
                  inputRef={cPassInput}
                 
                />
                  {Errors.cpassword.length>0 &&
                  <span style={{color:"red"}}>{Errors.cpassword}</span>}   
                </Grid>
               
            </Grid>
           
            <Button
              type="submit"
              fullWidth
              style={{background:'#C71585', color:'white'}}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {flag? navigate('/'):null}  
         
           
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2" style={{marginRight:'80px'}}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
    </Paper>
  );
}