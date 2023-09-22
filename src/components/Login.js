import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setAdmin } from "../features/counterSlice";
import { useLoginMutation } from "../services/apiSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login] = useLoginMutation();

    // const config = {
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    // };

    const formData = {
        email: `${email}`,
        password: `${password}`,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await login(formData);
            console.log(res.data.filteredUser.admin, "admin");
            console.log(res.data.token, "token");
            if (res.data.status === 200) {
                dispatch(setToken(res.data.token));
                dispatch(setAdmin(res.data.filteredUser.admin));
                navigate("/");

                // Show a success SweetAlert
                Swal.fire({
                    icon: "success",
                    title: "Login Successful",
                    text: "You have successfully logged in!",
                });
            } else {
                console.log("No user found");

                // Show an error SweetAlert
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: "No user found. Please check your credentials.",
                });
            }
        } catch (error) {
            console.error("Error login", error);

            // Show an error SweetAlert for any other errors
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An error occurred during login. Please try again later.",
            });
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <form onSubmit={handleSubmit}>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            label="Email"
                            name="email"
                            id="userName"
                            value={email}
                            onInput={(e) => setEmail(e.target.value)}
                            fullWidth
                            autoFocus
                            required
                        />
                        <TextField
                            margin="normal"
                            label="Password"
                            name="password"
                            id="password"
                            type="password"
                            value={password}
                            onInput={(e) => setPassword(e.target.value)}
                            fullWidth
                            required
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                        <Grid container>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default Login;
