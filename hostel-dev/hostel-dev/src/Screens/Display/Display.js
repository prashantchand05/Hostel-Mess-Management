import { Box, Stack, Heading, Flex } from "@chakra-ui/react";
import react from "react";
import cook from "../../assets/cook.svg";
const Display = () => {
  return (
    <Box mt="5%">
      <Flex>
        <img src={cook} />
        <Box>
          <Heading size="3xl" mt="30%" ml="6%">
            Hostel Mess Managment System
          </Heading>
        </Box>
      </Flex>
    </Box>
  );
};
export default Display;
