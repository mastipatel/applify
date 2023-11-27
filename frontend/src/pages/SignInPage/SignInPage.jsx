import { Flex, Text, Heading, Image, FormControl, Input, Button, CircularProgress, useToast } from "@chakra-ui/react";
import { useMediaQuery } from "react-responsive";
import { theme } from "../../theme";
import SignIn from "../../assets/signin.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../services/UserManagementServices/UserManagementService";

function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState("false");
    const toast = useToast();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading("true");
        const response = await signIn(email, password);
        if (response.user_id) {
            toast({
                title: 'Sign-in Successful',
                description: "Your have successfully signed-in!",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            localStorage.setItem('applifyUser', response.user_id);
            setLoading("false");
            navigate("/");
            window.location.reload();
        } else {
            toast({
                title: 'Sign-in error',
                description: "We could not sign you in!",
                status: 'error',
                duration: 3000, // Duration in milliseconds
                isClosable: true,
            });
            setLoading("false");
        }


    };

    const isMobile = useMediaQuery({ query: "(max-width: 1080px)" });
    return isMobile ? (
        <Flex w="100%" minHeight="100vh" backgroundColor={theme.primaryBackground} flexDir="column" alignItems="center" justifyContent="center">
            <Flex flexDir="column" w="90%" alignItems="center" boxShadow="0 0 5px rgba(0, 0, 0, 0.3)" p="24px">
                <Heading color={theme.primaryForeground} fontWeight="bold" fontStyle="italic" fontFamily="sans-serif" mt="16px">
                    Applify
                </Heading>
                <form onSubmit={handleSubmit}>
                    <Flex flexDir="column" w="300px" mt="32px">
                        <FormControl>
                            <Input
                                type="email"
                                placeholder="email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={handlePasswordChange}
                                mt="12px"
                            />
                        </FormControl>
                        <Button type="submit" _hover={{ backgroundColor: theme.accent }} backgroundColor={theme.accent} color={theme.secondaryForeground} mt="24px">
                            {
                                loading === "false" ? <Text>Sign-In</Text> :
                                    <CircularProgress size="24px" isIndeterminate color="white" />
                            }

                        </Button>
                        <Flex mt="4px">
                            <Text fontSize="sm" mr="4px">Already have an account? </Text>
                            <button onClick={() => navigate('/user/sign-up')}>
                                <Text fontSize="sm" fontWeight="bold">Sign-up</Text>
                            </button>
                        </Flex>
                    </Flex>

                </form>
            </Flex>
        </Flex>
    ) : (
        <Flex w="100%" minHeight="100vh" backgroundColor={theme.primaryBackground} alignItems="center" justifyContent="center">
            <Flex flexDir="column" w="30%">
                <Image src={SignIn} h="60vh"></Image>
            </Flex>
            <Flex flexDir="column" w="360px" alignItems="center" boxShadow="0 0 5px rgba(0, 0, 0, 0.3)" p="24px">
                <Heading color={theme.primaryForeground} fontWeight="bold" fontStyle="italic" fontFamily="sans-serif" mt="16px">
                    Applify
                </Heading>
                <form onSubmit={handleSubmit}>
                    <Flex flexDir="column" w="300px" mt="32px">
                        <FormControl>
                            <Input
                                type="email"
                                placeholder="email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={handlePasswordChange}
                                mt="12px"
                            />
                        </FormControl>
                        <Button type="submit" _hover={{ backgroundColor: theme.accent }} backgroundColor={theme.accent} color={theme.secondaryForeground} mt="24px">
                            {
                                loading === "false" ? <Text>Sign-In</Text> :
                                    <CircularProgress size="24px" isIndeterminate color="white" />
                            }

                        </Button>
                        <Flex mt="4px">
                            <Text fontSize="sm" mr="4px">Already have an account? </Text>
                            <button onClick={() => navigate('/user/sign-up')}>
                                <Text fontSize="sm" fontWeight="bold">Sign-up</Text>
                            </button>
                        </Flex>
                    </Flex>

                </form>
            </Flex>
        </Flex>
    );
}

export default SignInPage;