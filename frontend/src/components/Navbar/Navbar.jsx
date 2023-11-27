import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useMediaQuery } from "react-responsive";
import { theme } from "../../theme";
import resumeIcon from "../../assets/resume_icon.svg";

function NavBar() {
  const isMobile = useMediaQuery({ query: "(max-width: 1080px)" });

  const logout = () => {
    localStorage.setItem('applifyUser', '');
    window.location.reload();
  }

  return isMobile ? (
    <Flex
      as="nav"
      alignItems="center"
      justify="space-between"
      h="10vh"
      w="100%"
      backgroundColor={theme.primaryBackground}
    >
      <Image src={resumeIcon} h="6vh"></Image>
        <Text fontWeight="semibold" color={theme.primaryForeground}>Applify</Text>
        <Flex mr="8px">
          <Button onClick={logout} _hover={{ backgroundColor: theme.accent }} backgroundColor={theme.accent} color={theme.secondaryForeground}>
            Logout
          </Button>
        </Flex>
    </Flex>
  ) : (
    <Flex alignItems="center" justifyContent="center" as="nav" h="10vh" w="100%" backgroundColor={theme.primaryBackground}>
      <Flex w="1080px" alignItems="center" justifyContent="space-between" h="10vh">
        <Image src={resumeIcon} h="6vh"></Image>
        <Text fontWeight="semibold" color={theme.primaryForeground}>Applify</Text>
        <Flex>
          <Button onClick={logout} _hover={{ backgroundColor: theme.accent }} backgroundColor={theme.accent} color={theme.secondaryForeground}>
            Logout
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default NavBar;
