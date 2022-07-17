import React from "react";
import {
  Box,
  Flex,
  AspectRatio,
  Image,
  Text,
  Link,
  Button,
  Stack,
} from "@chakra-ui/react";
import { auth, logout, db } from "../../module/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

function Card(props) {
  const { day, Breakfast, Lunch, Dinner, link } = props;
  const [registered, setRegistered] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const addAPoll = async () => {
    const id = uuidv4();
    const data = doc(db, "registered", id);

    const poll = await setDoc(data, {
      day: day,
      email: user.email,
      name : user.displayName,
    });
     setRegistered(true);
    alert("You have been registered for the meal");
  };
  return (
    <Box
      p={4}
      display={{ md: "flex" }}
      maxWidth="32rem"
      borderWidth={1}
      margin={2}
      borderRadius={10}
    >
      <Stack
        align={{ base: "center", md: "stretch" }}
        textAlign={{ base: "center", md: "left" }}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 6 }}
      >
        <img
          width={"500px"}
          height={"500px"}
          margin="auto"
          src={link}
          alt="Woman paying for a purchase"
        />
        <Text
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="lg"
          letterSpacing="wide"
          color="teal.600"
        >
          {day}
        </Text>
        <Link
          my={1}
          display="block"
          fontSize="md"
          lineHeight="normal"
          fontWeight="semibold"
          href="#"
        >
          Menu
        </Link>
        <Box>
          <Text my={2} color="black">
            BreakFast{" "}
          </Text>
          <Text my={2} color="gray.500">
            {Breakfast}
          </Text>
        </Box>
        <Box>
          <Text my={2} color="black">
            Lunch{" "}
          </Text>
          <Text my={2} color="gray.500">
            {Lunch}
          </Text>
        </Box>
        <Box>
          <Text my={2} color="black">
            Lunch{" "}
          </Text>
          <Text my={2} color="gray.500">
            {Dinner}
          </Text>
        </Box>

        <Button my={2} colorScheme={registered ? "green" : "cyan"} onClick={()=>{ addAPoll()}}>
          {registered ? "Registered " : "Reserve For me"}
        </Button>
      </Stack>
    </Box>
  );
}

export default Card;
