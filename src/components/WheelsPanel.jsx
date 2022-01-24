import { AddIcon } from "@chakra-ui/icons";
import { Box, Center, HStack, Text } from "@chakra-ui/react";
import { ADD_BUTTON_COLORS } from "../constants/colors";

function WheelsPanel({ wheels }) {
  return (
    <HStack sx={{ overflowX: "scroll" }} mt={4} p={2} ml={-2}>
      {wheels?.map((wheel) => (
        <Box as="button" p={8} bg="tomato">
          <Text></Text>
          <Text></Text>
        </Box>
      ))}
      <Box
        as="button"
        sx={{
          width: "80px",
          height: "80px",
          border: "1px solid teal",
        }}
        rounded={"md"}
        shadow={"base"}
      >
        <Text>01/01</Text>
        <Text fontSize={"xl"}>2022</Text>
      </Box>
      <Box
        as="button"
        _hover={{ backgroundColor: ADD_BUTTON_COLORS.hover }}
        _active={{ backgroundColor: ADD_BUTTON_COLORS.active }}
        // p={8}
        rounded={"md"}
        sx={{
          backgroundColor: ADD_BUTTON_COLORS.default,
          width: "80px",
          height: "80px",
        }}
        onClick={() => console.log("add wheel")}
      >
        <Center>
          <AddIcon />
        </Center>
      </Box>
    </HStack>
  );
}

export default WheelsPanel;
