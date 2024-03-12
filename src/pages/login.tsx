import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from "@mui/material/styles";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { postRequest } from "../services";
import { useGlobalContext } from "../provider";

const Login = () => {
    const navigate = useNavigate()
    const [state, { dispatch }] = useGlobalContext();
    const [showPassword, setShowPassword] = React.useState(false);
    const [status, setStatus] = React.useState({} as { username: string, password: string })

    const { isAuth } = state;
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onSend = async () => {
        const res = await postRequest("login", status)
        if (res.status === 200) {
            console.log(res)
            dispatch({
                type: "isAuth",
                payload: true
            })
            Object.keys(res.data).forEach(key => {
                const k = key as typeof res.data 
                localStorage.setItem(k, res.data[k])
            })
            navigate("/")
        }
    }

    return (
        <Box sx={{
            backgroundImage: 'url("/img/login.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100vh',
            color: "white",
        }}>
            <Container
                component="main"
                maxWidth="sm"
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: "center",
                }}

            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: "center",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        padding: "2em",
                        borderRadius: ".4em",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main', }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography mb={2} color={"white"} component="h1" variant="h3">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <CssTextField
                            margin="normal"
                            fullWidth
                            label="Usename"
                            type="text"
                            autoComplete="current-password"
                            InputLabelProps={{
                                style: { color: 'white' }
                            }}
                            autoFocus
                            value={status.username}
                            onChange={(e) => setStatus({ ...status, username: e.target.value })}
                        />
                        <FormControl fullWidth sx={{ my: 2, color: 'white' }} variant="outlined">
                            <InputLabel sx={{ color: 'white' }}>Password</InputLabel>
                            <OutlinedInput
                                sx={{
                                    color: 'white',
                                    '& fieldset': {
                                        borderColor: '#ffffff',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#ffffff',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#ffffff',
                                    },
                                }}
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword((show) => !show)}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            sx={{ color: "white" }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                value={status.password}
                                onChange={(e) => setStatus({ ...status, password: e.target.value })}
                            />
                        </FormControl>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="remember"
                                    sx={{
                                        color: 'white',
                                        '&.Mui-checked': {
                                            color: 'white',
                                        },
                                    }}
                                />
                            }
                            label={<span style={{ color: 'white' }}>Remember me</span>}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={onSend}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="#">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/register">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </Box>
    )
}

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#ffffff',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#ffffff',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#ffffff',
        },
        '&:hover fieldset': {
            borderColor: '#ffffff',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#ffffff',
        },
        '& input': {
            color: '#ffffff',
        },
    },
});



export default Login