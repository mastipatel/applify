import { Flex, Text, Image } from "@chakra-ui/react";
import Notifications from "../../assets/notifications.svg";
import NotificationsActive from "../../assets/notifications_active.svg";
import Edit from "../../assets/edit.svg";
import Delete from "../../assets/delete.svg";
import AddApplication from "./AddApplication";
import { useState } from "react";
import Close from "../../assets/close.svg";
import { useMediaQuery } from "react-responsive";

function Application(props) {
    const applicationData = props.applicationData;
    const [editOpen, setEditOpen] = useState(false);
    const isMobile = useMediaQuery({ query: "(max-width: 1080px)" });

    const toggleEditOpen = () => {
        setEditOpen(!editOpen);
    }

    const updateData = (newData) => {
        props.updateList(newData);
    }

    return (
        isMobile ?
            <Flex w="100%" flexDir="column">
                <Flex w="100%" flexDir="column" alignItems="center">
                    <Flex w="80%" h="40px" alignItems="center" boxShadow="0 0 5px rgba(0, 0, 0, 0.1)">
                        <Text ml="8px" fontWeight="semibold">{applicationData.company_name}</Text>
                    </Flex>
                    <Flex w="80%" h="40px" alignItems="center" boxShadow="0 0 5px rgba(0, 0, 0, 0.1)">
                        <Text ml="8px" fontWeight="semibold">{applicationData.job_role}</Text>
                    </Flex>
                    <Flex w="80%" h="40px" alignItems="center" boxShadow="0 0 5px rgba(0, 0, 0, 0.1)">
                        <Text ml="8px" fontWeight="semibold">{applicationData.application_status}</Text>
                    </Flex>
                    <Flex w="80%" h="40px" alignItems="center" boxShadow="0 0 5px rgba(0, 0, 0, 0.1)">
                        <Text ml="8px" fontWeight="semibold">{new Date(applicationData.application_deadline).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                        })}</Text>
                    </Flex>
                    <Flex gap="24px">
                        <Flex w="80%" h="40px" alignItems="center" justifyContent="center">
                            {
                                applicationData.notifications_active ?
                                    <button onClick={() => props.toggleNotification(applicationData)}>
                                        <Image src={NotificationsActive}></Image>
                                    </button> :
                                    <button onClick={() => props.toggleNotification(applicationData)}>
                                        <Image src={Notifications}></Image>
                                    </button>
                            }
                        </Flex>
                        <Flex w="80%" h="40px" alignItems="center" justifyContent="center">
                            {
                                editOpen ?
                                    <button onClick={toggleEditOpen}>
                                        <Image src={Close}></Image>
                                    </button> :
                                    <button onClick={toggleEditOpen}>
                                        <Image src={Edit}></Image>
                                    </button>
                            }
                        </Flex>
                        <Flex w="80%" h="40px" alignItems="center" justifyContent="center">
                            <button onClick={() => props.handleDelete(applicationData.application_id, props.ind)}>
                                <Image src={Delete}></Image>
                            </button>
                        </Flex>
                    </Flex>
                </Flex>
                {
                    editOpen ? <AddApplication applicationData={applicationData} add={false} toggleEditOpen={toggleEditOpen} updateData={updateData} /> : null
                }
            </Flex> :
            <Flex w="1080px" flexDir="column">
                <Flex w="1080px">
                    <Flex w="306px" h="40px" alignItems="center" boxShadow="0 0 5px rgba(0, 0, 0, 0.1)">
                        <Text ml="8px" fontWeight="semibold">{applicationData.company_name}</Text>
                    </Flex>
                    <Flex w="306px" h="40px" alignItems="center" boxShadow="0 0 5px rgba(0, 0, 0, 0.1)">
                        <Text ml="8px" fontWeight="semibold">{applicationData.job_role}</Text>
                    </Flex>
                    <Flex w="162px" h="40px" alignItems="center" boxShadow="0 0 5px rgba(0, 0, 0, 0.1)">
                        <Text ml="8px" fontWeight="semibold">{applicationData.application_status}</Text>
                    </Flex>
                    <Flex w="162px" h="40px" alignItems="center" boxShadow="0 0 5px rgba(0, 0, 0, 0.1)">
                        <Text ml="8px" fontWeight="semibold">{new Date(applicationData.application_deadline).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                        })}</Text>
                    </Flex>
                    <Flex w="48px" h="40px" alignItems="center" justifyContent="center">
                        {
                            applicationData.notifications_active ?
                                <button onClick={() => props.toggleNotification(applicationData)}>
                                    <Image src={NotificationsActive}></Image>
                                </button> :
                                <button onClick={() => props.toggleNotification(applicationData)}>
                                    <Image src={Notifications}></Image>
                                </button>
                        }
                    </Flex>
                    <Flex w="48px" h="40px" alignItems="center" justifyContent="center">
                        {
                            editOpen ?
                                <button onClick={toggleEditOpen}>
                                    <Image src={Close}></Image>
                                </button> :
                                <button onClick={toggleEditOpen}>
                                    <Image src={Edit}></Image>
                                </button>
                        }
                    </Flex>
                    <Flex w="48px" h="40px" alignItems="center" justifyContent="center">
                        <button onClick={() => props.handleDelete(applicationData.application_id, props.ind)}>
                            <Image src={Delete}></Image>
                        </button>
                    </Flex>
                </Flex>
                {
                    editOpen ? <AddApplication applicationData={applicationData} add={false} toggleEditOpen={toggleEditOpen} updateData={updateData} /> : null
                }
            </Flex>
    );
}

export default Application;