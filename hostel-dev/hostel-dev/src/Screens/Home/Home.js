import {
  Box,
  Container,
  SimpleGrid,
  Center,
  Stack,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Card from "../../Comp/card/Card";
import { auth, db } from "../../module/firebase";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const Home = () => {
  const [data, setData] = useState();
  async function getData() {
    const dbQuery = query(collection(db, "menu"));
    const data = await getDocs(dbQuery);
    setData(data.docs[0].data());
  }

  useEffect(() => {
    getData();
  }, []);

  if (!data) {
    return (
      <Center mt="100px">
        <Stack width={"80%"}>
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
        </Stack>
      </Center>
    );
  }
  return (
    <Box>
      <Center>
        <Box>
          <Heading> Register for hostel mess meal </Heading>
        </Box>
      </Center>

      <Center mt="50px">
        <Container maxW="80rem" centerContent>
          <SimpleGrid columns={[1, 2, 1, 2]}>
            {data.data.map(function (data) {
              const { id, day, Breakfast, Lunch, Dinner, link } = data;
              return (
                <Card
                  key={id}
                  day={day}
                  Breakfast={Breakfast}
                  Lunch={Lunch}
                  Dinner={Dinner}
                  link={link}
                />
              );
            })}
          </SimpleGrid>
        </Container>
      </Center>
    </Box>
  );
};
export default Home;
