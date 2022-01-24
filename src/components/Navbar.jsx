import {
  Box,
  Container,
  HStack,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import Navlink from "./Navlink";

export function Navbar() {
  // const { toggleColorMode } = useColorMode();
  // const { logout, currentUser } = useAuth()
  const { logout, currentUser } = useAuth();

  return (
    <Box
      borderBottom="2px"
      borderBottomColor={useColorModeValue("gray.100", "gray.700")}
      mb={4}
      py={4}
    >
      <Container maxW="container.xl">
        <HStack
          justifyContent="flex-end"
          maxW="container.xl"
          mx="auto"
          spacing={4}
        >
          <Navlink to="/" name="Wheel Of Balance" size="lg" />
          <Spacer />
          {!currentUser && <Navlink to="/login" name="Login" />}
          {!currentUser && <Navlink to="/register" name="Register" />}
          {/* {currentUser && <Navlink to='/profile' name='Profile' />} */}
          {currentUser && (
            <Navlink
              to="/logout"
              name="Logout"
              onClick={async (e) => {
                e.preventDefault();
                await logout();
              }}
            />
          )}
          {/* <IconButton
          variant="ghost"
          icon={useColorModeValue(<FaSun />, <FaMoon />)}
          onClick={toggleColorMode}
          aria-label="toggle-dark-mode"
        /> */}
        </HStack>
      </Container>
    </Box>
  );
}
