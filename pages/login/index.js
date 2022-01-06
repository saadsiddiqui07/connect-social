import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { auth, provider, db } from "../../firebase/firebase";
import { useStateValue } from "../../context-api/StateProvider";
import GoogleIcon from "@mui/icons-material/Google";
import {
  Button,
  TextField,
  Link,
  Box,
  Typography,
  Container,
} from "@mui/material/";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useSpring, animated } from "react-spring";
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

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{}, dispatch] = useStateValue();
  const router = useRouter();
  // animation config
  const [state] = useState(true);
  const { x } = useSpring({
    from: { x: 2 },
    x: state ? 1 : 0,
    config: { duration: 900 },
  });

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
        // add user into the firestore
        addDoc(collection(db, "users"), {
          username: result.user.displayName,
          profilePic: result.user.photoURL,
          email: result.user.email,
        });
        router.push("/");
      })
      .catch((err) => console.log(err));
  };

  // sign in with email and password
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
    <animated.div
      style={{
        opacity: x.interpolate({ range: [0, 1], output: [0.3, 1] }),
        transform: x
          .interpolate({
            range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
            output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
          })
          .interpolate((x) => `scale(${x})`),
      }}
    >
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex w-[100%] h-[100vh]  items-center">
        <Container
          className="p-2 h-[100vh]  w-[100%] flex-col hidden md:inline"
          component="main"
          maxWidth="xs"
        >
          <Box className="grid h-[100%] gap-2 content-center">
            <h1 className="font-bold text-8xl font-mono md:text-7xl">
              Connect
            </h1>
            <p className="font-semibold text-gray-500 text-2xl ml-1 ">
              The best place to connect with people all over the world.
            </p>
          </Box>
        </Container>
        <Container className="p-2" component="main" maxWidth="xs">
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
              alt=""
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

              <small className="w-full text-gray-400">
                *Signing In with email has been diabled temporarily. We will fix
                it soon.
              </small>
              <Button
                onClick={handleEmailSignIn}
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                className="bg-black text-white font-bold border-2  hover:bg-green-400"
              >
                Sign In
              </Button>
              <hr />
              <p className="text-center my-2 text-gray-600 ">OR</p>
              <Button
                type="submit"
                fullWidth
                onClick={handleSignIn}
                className="bg-black text-white font-bold hover:bg-blue-500"
              >
                Sign In With Google <GoogleIcon className="text-lg ml-2" />
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </div>
    </animated.div>
  );
}
