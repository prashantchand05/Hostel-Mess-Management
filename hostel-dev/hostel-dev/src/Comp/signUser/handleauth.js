import { Heading, Box, Input, Button, Badge, Flex } from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import PasswordInput from "../passWordInput/passWordInput";
import {
  auth,
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
  sendPasswordReset,
} from "../../module/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ToastContainer, toast } from "react-toastify";

function HandleAuth({ onClose }) {
  const [showLogin, setLogin] = useState(true);
  const [user, error, loading] = useAuthState(auth);
  const notify = (test) => toast(test);

  const email = useRef();
  const password = useRef();
  const anotherPassword = useRef();
  const name = useRef();
  const login = () => {
    if (validateEmail(email.current.value)) {
      logInWithEmailAndPassword(email.current.value, password.current.value);
      onClose();
    }
  };
  function validateEmail(emailAdress) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(regexEmail)) {
      return true;
    } else {
      toast.error("Invalid email");
      return false;
    }
  }
  function loginInWithTest() {
    logInWithEmailAndPassword("gauravtewari111@gmail.com", "12345678");
  }

  const signUp = () => {
    const password1 = password.current.value;
    const password2 = password.current.value;
    if (password1 === password2 && validateEmail(email.current.value)) {
      registerWithEmailAndPassword(
        name.current.value,
        email.current.value,
        password1
      );
      onClose();
    } else {
      toast.error("Passwords do not match");
    }
  };
  const reset = () => {
    if (
      email.current.value &&
      email.current.value.length > 0 &&
      validateEmail(email.current.value)
    ) {
      sendPasswordReset(email.current.value);
    } else {
      toast.error("Opss! please enter email");
    }
  };

  if (user) {
    return <Heading> You have aleady Logged in :)</Heading>;
  }
  if (showLogin)
    return (
      <Box justifyContent={"space-between"} alignItems="center">
        <Heading ml={"20"} mt={"100"}>
          {" "}
          Login
        </Heading>

        <Input mt="50" placeholder="email" type="email" ref={email} required />
        <Box></Box>
        <PasswordInput inputRef={password} mt="2" />
        <Flex ml="2" mt="5" textAlign={"center"}>
          Forgot Password ?{" "}
          <Badge
            mt="1"
            onClick={() => {
              reset();
            }}
          >
            {" "}
            Reset
          </Badge>
        </Flex>

        <Button alignSelf={"center"} ml="100" mt="10" onClick={() => login()}>
          {" "}
          Login
        </Button>
       
        <Flex ml="25" mt="200" textAlign={"center"}>
          Don't have an account ?
          <Badge
            alignContent={"center"}
            mt="1"
            textAlign="center"
            onClick={() => {
              setLogin((prev) => !prev);
            }}
            
          >
            {" "}
            SignUP
          </Badge>
        </Flex>
      </Box>
    );
  if (!showLogin) {
    return (
      <Box justifyContent={"space-between"} alignItems="center">
        <Heading ml={"20"} mt={"100"}>
          {" "}
          Sign Up
        </Heading>
        <form>
          <Input
            mt="50"
            placeholder="email"
            type="email"
            ref={email}
            required
          />
          <Input mt="2" placeholder="name" type="text" ref={name} required />

          <Box></Box>
          <PasswordInput inputRef={password} mt="2" />
          <PasswordInput inputRef={anotherPassword} mt="2" />
        </form>

        <Flex ml="25" mt="5" textAlign={"center"}>
          Already have an account ?
          <Badge
            alignContent={"center"}
            textAlign="center"
            onClick={() => {
              setLogin((prev) => !prev);
            }}
          >
            {" "}
            SignIn
          </Badge>
        </Flex>
        <Button alignSelf={"center"} ml="100" mt="25" onClick={() => signUp()}>
          {" "}
          Sign Up
        </Button>
      </Box>
    );
  }
}

export default HandleAuth;
