import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router';
import { useState,useRef,useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const paperStyle={padding:20,height:550, width:420, margin:'20px auto'}
const URL = "http://localhost:3002/users";
const bcrypt = require('bcryptjs')
const theme = createTheme();

export default function Login() {
    const [userdata, setdata] = useState('')
    const [userdetails, setuserdetails] = useState([])
    const navigate=useNavigate()
    const[flag,setFlag]=useState(false)
    const emailInput = useRef(null);
    const passInput = useRef(null);
    const handler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
    
        setdata({
          [name]: value
        })
    }
    const submit=(event)=>{
        event.preventDefault();
     
        var data = false;
        
        userdetails.forEach(user => {
            const doesPasswordMatch = bcrypt.compareSync(passInput.current.value, user.password)
                if(user.email===emailInput.current.value&& doesPasswordMatch){
                        let arr=user
                        alert('login succesfully');
                     setFlag(true)
                        if(sessionStorage.getItem('userdata')!==undefined){
                            sessionStorage.setItem('userdata', JSON.stringify(arr))
                        }
                        
                        data= true;
                        return
                }
         
        });
        if(data!==true){
            alert('Email id or password is incorrect');
           setFlag(false)
        }
        
        
    }
    useEffect(() => {
        const URL = "  http://localhost:3002/users";
        fetch(URL)
        .then(res=>res.json())
        .then(data=>{
         
            setuserdetails(data)
        })
    }, [])
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={submit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handler}
              inputRef={emailInput}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={passInput}
              onChange={handler}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              style={{background:'#C71585', color:'white'}}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {flag? navigate('/dashboard'):null}  
            <Grid container>
              <Grid item xs>
              
              </Grid>
              <Grid item>
                <Link href="/registration" variant="body2" style={{marginRight:'50px'}}>
                  {"Don't have an account? Sign Up"}
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