import * as React from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { auth, provider } from "../../firebase/firebase";
import { useStateValue } from "../../context-api/StateProvider";
import GoogleIcon from "@mui/icons-material/Google";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import logo from "../../assets/connect-logo.png";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Connect
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [{}, dispatch] = useStateValue();
  const router = useRouter();

  // to sign a new user
  const handleSignIn = (e) => {
    e.preventDefault();
    // sign in using google accounts
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({
          type: "SET_USER",
          user: result.user,
        });
        router.push("/");
      })
      .catch((err) => console.log(err));
  };

  const handleEmailSignIn = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        dispatch({
          type: "SET_USER",
          user: result.user,
        });
        router.push("/");
      })
      .catch((err) => console.log(err));
    setEmail("");
    setPassword("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Login</title>
      </Head>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            src={logo}
            height={50}
            width={50}
            layout="fixed"
            objectFit="contain"
            className="cursor-pointer"
          />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <Button
              onClick={handleEmailSignIn}
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              className="bg-black text-white font-bold border-2 hover:text-black"
            >
              Sign In
            </Button>
            <hr />
            <p className="text-center my-2 text-gray-600 ">OR</p>
            <Button
              type="submit"
              onClick={handleSignIn}
              fullWidth
              className="bg-black text-white font-bold hover:bg-blue-500"
            >
              Sign In With Google <GoogleIcon className="text-lg ml-2" />
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
