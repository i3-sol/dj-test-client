import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from "@mui/material/styles";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { postRequest } from "../services";
import { emailValidator, passwordMatch, strongPasswordValidator, showToast } from "../utils";

const Register = () => {

    const [showPassword, setShowPassword] = React.useState(false);
    const [status, setStatus] = React.useState({} as { username: string, email: string, password: string, conf_password: string, first_name: string, last_name: string })

    const navigate= useNavigate()

    const onSend = async () => {
        if (!status.first_name) {
            showToast("First Name is required!", "info")
            return
        }

        if (!status.last_name) {
            showToast("Last Name is required!", "info")
            return
        }

        if (!status.username) {
            showToast("Username is required!", "info")
            return
        }

        if (!emailValidator(status.email).status) {
            showToast(emailValidator(status.email).msg, "info")
            return;
        }
        
        if (!strongPasswordValidator(status.password).status) {
            showToast(strongPasswordValidator(status.password).msg, "info")
            return;
        }

        if (!passwordMatch(status.password, status.conf_password).status) {
            showToast(passwordMatch(status.password, status.conf_password).msg, "info")
            return;
        }

        const res = await postRequest("register", status)
        if (res.status === 201) {
            showToast("User created Successfully!", "success")
            navigate("/login")
        } else if (res.status === 400) {
            Object.entries(res.data).map(i => {
                showToast(i.join(": "), "error")
            })
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
                    <Typography color={"white"} component="h1" variant="h2" pb={3}>
                        Sign Up
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <Stack direction="row" spacing={2}>
                            <CssTextField
                                margin="normal"
                                fullWidth
                                label="First Name"
                                type="text"
                                autoComplete="current-password"
                                InputLabelProps={{
                                    style: { color: 'white' }
                                }}
                                autoFocus
                                value={status.first_name}
                                onChange={(e: any) => setStatus({ ...status, first_name: e.target.value })}
                            />

                            <CssTextField
                                margin="normal"
                                fullWidth
                                label="Last Name"
                                type="text"
                                autoComplete="current-password"
                                InputLabelProps={{
                                    style: { color: 'white' }
                                }}
                                value={status.last_name}
                                onChange={(e: any) => setStatus({ ...status, last_name: e.target.value })}
                            />

                        </Stack>

                        <CssTextField
                            margin="normal"
                            fullWidth
                            name="usename"
                            label="Usename"
                            type="text"
                            autoComplete="current-password"
                            InputLabelProps={{
                                style: { color: 'white' }
                            }}
                            value={status.username}
                            onChange={(e: any) => setStatus({ ...status, username: e.target.value })}
                        />

                        <CssTextField
                            margin="normal"
                            fullWidth
                            label="Email"
                            type="text"
                            autoComplete="email"
                            InputLabelProps={{
                                style: { color: 'white' }
                            }}
                            value={status.email}
                            onChange={(e: any) => setStatus({ ...status, email: e.target.value })}
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
                                            edge="end"
                                            sx={{ color: "white" }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                value={status.password}
                                onChange={(e: any) => setStatus({ ...status, password: e.target.value })}
                            />
                        </FormControl>

                        <FormControl fullWidth sx={{ my: 2, color: 'white' }} variant="outlined">
                            <InputLabel sx={{ color: 'white' }}>Conform Password</InputLabel>
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
                                label="Confirm Password"
                                value={status.conf_password}
                                onChange={(e: any) => setStatus({ ...status, conf_password: e.target.value })}
                            />
                        </FormControl>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={onSend}
                        >
                            Sign Up
                        </Button>

                        <Link to="/login" >
                            {"Already have an account? Sign in"}
                        </Link>
                    </Box>
                </Box>

            </Container>
        </Box>
    )
}

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#ffffff', // Set the color of the focused label to white
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#ffffff', // Set the color of the underline after interaction to white
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#ffffff', // Set the color of the input border to white
        },
        '& input': {
            color: '#ffffff', // Set the color of the input value text to white
        },
    },
});



export default Register