import { Flex, Text, Image, FormControl, Input, Button, CircularProgress, useToast } from "@chakra-ui/react";
import Notifications from "../../assets/notifications.svg";
import NotificationsActive from "../../assets/notifications_active.svg";
import { useState } from "react";
import { createApplication, editApplication } from "../../services/JobApplicationServices.jsx/JobApplicationService";
import { useMediaQuery } from "react-responsive";

function AddApplication(props) {
    const add = props.add;
    const applicationData = add ? [] : props.applicationData;
    const [companyName, setCompanyName] = useState(add ? "" : applicationData.company_name);
    const [jobRole, setJobRole] = useState(add ? "" : applicationData.job_role);
    const [status, setStatus] = useState(add ? "" : applicationData.application_status);
    const date = add ? new Date() : new Date(applicationData.application_deadline);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 to month as it's zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear());
    const formattedDate = `${month}/${day}/${year}`;
    const [deadline, setDeadline] = useState(add ? "" : formattedDate);
    const [notificationsActive, setNotificationsActive] = useState(add ? false : applicationData.notifications_active);
    const [loading, setLoading] = useState("false");
    const userID = localStorage.getItem('applifyUser');
    const toast = useToast();
    const isMobile = useMediaQuery({ query: "(max-width: 1080px)" });

    const handleCompanyNameChange = (event) => {
        setCompanyName(event.target.value);
    };

    const handleJobRoleChange = (event) => {
        setJobRole(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleDeadlineChange = (event) => {
        setDeadline(event.target.value);
    };

    const toggleNotificationsActive = () => {
        setNotificationsActive(!notificationsActive);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const dateParts = deadline.split('/');

        const month = parseInt(dateParts[0], 10) - 1;
        const day = parseInt(dateParts[1], 10);
        const year = parseInt(dateParts[2], 10);

        const date = new Date(year, month, day);
        const dateEpoch = date.getTime();

        setLoading("true");

        const response = add ? await createApplication(companyName, jobRole, dateEpoch, status, userID, notificationsActive) :
            await editApplication(applicationData.application_id, companyName, jobRole, dateEpoch, status, userID, notificationsActive);
        if (response.application_id) {
            toast({
                title: add ? 'Successfuly Added' : 'Successfully updated',
                description: add ? "Added the application successfully!" : "Edited the application successfully!",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            setLoading("false");
            const newItem = {
                application_id: response.application_id,
                company_name: companyName,
                job_role: jobRole,
                application_deadline: dateEpoch,
                application_status: status,
                user_id: userID,
                notifications_active: notificationsActive
            }
            add ? props.addtoList(newItem) : props.updateData(newItem);
            add ? props.toggleAddOpen() : props.toggleEditOpen();
        } else {
            toast({
                title: add ? 'Error while adding' : 'Error while editing',
                description: add ? "We could not add the application!" : "We could not edit the application!",
                status: 'error',
                duration: 3000, // Duration in milliseconds
                isClosable: true,
            });
            setLoading("false");
        }

    };

    return (
        isMobile ?
            <form onSubmit={handleSubmit}>
                <Flex w="100%" mb="8px" flexDir="column" alignItems="center">
                    <Flex w="80%" h="40px" alignItems="center" boxShadow="0 0 5px rgba(0, 0, 0, 0.1)">
                        <FormControl isRequired>
                            <Input
                                type="text"
                                placeholder="Company"
                                value={companyName}
                                onChange={handleCompanyNameChange}
                            />
                        </FormControl>
                    </Flex>
                    <Flex w="80%" h="40px" alignItems="center" boxShadow="0 0 5px rgba(0, 0, 0, 0.1)">
                        <FormControl isRequired>
                            <Input
                                type="text"
                                placeholder="Role"
                                value={jobRole}
                                onChange={handleJobRoleChange}
                            />
                        </FormControl>
                    </Flex>
                    <Flex w="80%" h="40px" alignItems="center" boxShadow="0 0 5px rgba(0, 0, 0, 0.1)">
                        <FormControl isRequired>
                            <Input
                                type="text"
                                placeholder="Status"
                                value={status}
                                onChange={handleStatusChange}
                            />
                        </FormControl>
                    </Flex>
                    <Flex w="80%" h="40px" alignItems="center" boxShadow="0 0 5px rgba(0, 0, 0, 0.1)">
                        <FormControl isRequired>
                            <Input
                                type="text"
                                placeholder="MM/DD/YYYY"
                                value={deadline}
                                onChange={handleDeadlineChange}
                            />
                        </FormControl>
                    </Flex>
                    <Flex w="80%" h="40px" alignItems="center" justifyContent="center">
                        {
                            notificationsActive ?
                                <button type="button" onClick={toggleNotificationsActive}>
                                    <Image src={NotificationsActive}></Image>
                                </button> :
                                <button type="button" onClick={toggleNotificationsActive}>
                                    <Image src={Notifications}></Image>
                                </button>
                        }
                    </Flex>
                    <Flex w="80%" h="40px" alignItems="center" justifyContent="center">
                        <Button type="submit">
                            {
                                loading === "false" ? <Text>Save</Text>
                                    :
                                    <CircularProgress size="24px" isIndeterminate color="teal" />
                            }

                        </Button>
                    </Flex>
                </Flex>
            </form>
            :
            <form onSubmit={handleSubmit}>
                <Flex w="1080px" mb="8px">
                    <Flex w="306px" h="40px" alignItems="center" boxShadow="0 0 5px rgba(0, 0, 0, 0.1)">
                        <FormControl isRequired>
                            <Input
                                type="text"
                                placeholder="Company"
                                value={companyName}
                                onChange={handleCompanyNameChange}
                            />
                        </FormControl>
                    </Flex>
                    <Flex w="306px" h="40px" alignItems="center" boxShadow="0 0 5px rgba(0, 0, 0, 0.1)">
                        <FormControl isRequired>
                            <Input
                                type="text"
                                placeholder="Role"
                                value={jobRole}
                                onChange={handleJobRoleChange}
                            />
                        </FormControl>
                    </Flex>
                    <Flex w="162px" h="40px" alignItems="center" boxShadow="0 0 5px rgba(0, 0, 0, 0.1)">
                        <FormControl isRequired>
                            <Input
                                type="text"
                                placeholder="Status"
                                value={status}
                                onChange={handleStatusChange}
                            />
                        </FormControl>
                    </Flex>
                    <Flex w="162px" h="40px" alignItems="center" boxShadow="0 0 5px rgba(0, 0, 0, 0.1)">
                        <FormControl isRequired>
                            <Input
                                type="text"
                                placeholder="MM/DD/YYYY"
                                value={deadline}
                                onChange={handleDeadlineChange}
                            />
                        </FormControl>
                    </Flex>
                    <Flex w="48px" h="40px" alignItems="center" justifyContent="center">
                        {
                            notificationsActive ?
                                <button type="button" onClick={toggleNotificationsActive}>
                                    <Image src={NotificationsActive}></Image>
                                </button> :
                                <button type="button" onClick={toggleNotificationsActive}>
                                    <Image src={Notifications}></Image>
                                </button>
                        }
                    </Flex>
                    <Flex w="96px" h="40px" alignItems="center" justifyContent="center">
                        <Button type="submit">
                            {
                                loading === "false" ? <Text>Save</Text>
                                    :
                                    <CircularProgress size="24px" isIndeterminate color="teal" />
                            }

                        </Button>
                    </Flex>
                </Flex>
            </form>
    );
}

export default AddApplication;