import { Image, Flex, Text, CircularProgress, useToast, Heading } from "@chakra-ui/react";
import { useMediaQuery } from "react-responsive";
import { theme } from "../../theme";
import Application from "../../components/Application/Application";
import Add from "../../assets/add.svg";
import Close from "../../assets/close.svg";
import { useEffect, useState } from "react";
import AddApplication from "../../components/Application/AddApplication";
import { deleteApplication, editApplication, getbyUserID } from "../../services/JobApplicationServices.jsx/JobApplicationService";

function LandingPage() {
  const isMobile = useMediaQuery({ query: "(max-width: 1080px)" });
  const [addOpen, setAddOpen] = useState(false);
  const [applicationList, setApplicationList] = useState([]);
  const [loading, setLoading] = useState("false");
  const userID = localStorage.getItem('applifyUser');
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading("true");
      const applicationResponse = await getbyUserID(userID);
      setApplicationList(applicationResponse);
      setLoading("false");
    }
    fetchData();
  }, []);

  const toggleAddOpen = () => {
    setAddOpen(!addOpen);
  }

  const addtoList = (item) => {
    applicationList.push(item);
    setApplicationList(applicationList);
  }

  const updateList = (item) => {
    setApplicationList(applicationList =>
      applicationList.map(applicationInd => {
        if (applicationInd.application_id === item.application_id) {
          return {
            ...item
          };
        }
        return applicationInd;
      })
    );
  }

  const handleDelete = async (application_id, key) => {
    setApplicationList(applicationList.filter((_, index) => index !== key));

    const response = await deleteApplication(application_id);
    if (response.application_id) {
      toast({
        title: 'Successfuly Deleted',
        description: "Deleted the application successfully!",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

    } else {
      toast({
        title: 'Error while deleting',
        description: "We could not delete the application!",
        status: 'error',
        duration: 3000, // Duration in milliseconds
        isClosable: true,
      });
      window.location.reload();
    }
  }

  const toggleNotification = async (application) => {
    setApplicationList(applicationList =>
      applicationList.map(applicationInd => {
        if (applicationInd.application_id === application.application_id) {
          return {
            ...applicationInd, notifications_active: !application.notifications_active
          };
        }
        return applicationInd;
      })
    );

    const response = await editApplication(application.application_id, application.company_name, application.job_role, application.application_deadline, application.application_status, application.user_id, !application.notifications_active);
    if (response.application_id) {
      toast({
        title: 'Successfuly Updated notifications',
        description: "Updated notification preferences successfully!",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

    } else {
      toast({
        title: 'Error while updating',
        description: "We could not update the notification preferences!",
        status: 'error',
        duration: 3000, // Duration in milliseconds
        isClosable: true,
      });
      window.location.reload();
    }

  }

  return (
    isMobile ?
      loading === "false" ?
        <Flex w="100%" flexDir="column" minHeight="90vh" backgroundColor={theme.primaryBackground} alignItems="start" justifyContent="start">
          <Flex w="100%" mb="8px" h="40px" alignItems="center" justifyContent="center">

            {
              addOpen ?
                <button onClick={toggleAddOpen}>
                  <Image src={Close}></Image>
                </button> :
                <button onClick={toggleAddOpen}>
                  <Image src={Add}></Image>
                </button>
            }

          </Flex>
          {
            addOpen ?
              <AddApplication toggleAddOpen={toggleAddOpen} addtoList={addtoList} add={true} />
              : null
          }
          {
            applicationList.length === 0 ?
              <Flex w="100%" justifyContent="center">
                <Text fontWeight="semibold" opacity="69%" fontSize="xl">Click + to add</Text>
              </Flex>
              :
              applicationList.map((application, ind) =>
                <Application key={ind} ind={ind} applicationData={application} handleDelete={handleDelete} toggleNotification={toggleNotification} updateList={updateList} />
              )

          }
        </Flex> :
        <Flex w="100%" minHeight="90vh" backgroundColor={theme.primaryBackground} flexDir="column" alignItems="center" justifyContent="center">
          <CircularProgress isIndeterminate color="teal" />
        </Flex>
      :
      loading === "false" ?
        <Flex w="100%" minHeight="90vh" backgroundColor={theme.primaryBackground} alignItems="start" justifyContent="center">
          <Flex w="1080px" flexDir="column" minH="90vh" backgroundColor={theme.primaryBackground} alignItems="start">
            <Flex w="1080px" mb="8px">
              <Flex w="306px" h="40px" alignItems="center" >
                <Text fontWeight="semibold" opacity="69%">Company</Text>
              </Flex>
              <Flex w="306px" h="40px" alignItems="center" >
                <Text fontWeight="semibold" opacity="69%">Job role</Text>
              </Flex>
              <Flex w="162px" h="40px" alignItems="center">
                <Text fontWeight="semibold" opacity="69%">Status</Text>
              </Flex>
              <Flex w="162px" h="40px" alignItems="center">
                <Text fontWeight="semibold" opacity="69%">Deadline</Text>
              </Flex>
              <Flex w="144px" h="40px" alignItems="center" justifyContent="center">
                {
                  addOpen ?
                    <button onClick={toggleAddOpen}>
                      <Image src={Close}></Image>
                    </button> :
                    <button onClick={toggleAddOpen}>
                      <Image src={Add}></Image>
                    </button>
                }
              </Flex>
            </Flex>
            {
              addOpen ? <AddApplication toggleAddOpen={toggleAddOpen} addtoList={addtoList} add={true} /> : null
            }
            {
              applicationList.length === 0 ?
                <Flex w="1080px" justifyContent="center">
                  <Text fontWeight="semibold" opacity="69%" fontSize="xl">Click + to add</Text>
                </Flex>
                :
                applicationList.map((application, ind) =>
                  <Application key={ind} ind={ind} applicationData={application} handleDelete={handleDelete} toggleNotification={toggleNotification} updateList={updateList} />
                )

            }
          </Flex>
        </Flex> :
        <Flex w="100%" minHeight="90vh" backgroundColor={theme.primaryBackground} flexDir="column" alignItems="center" justifyContent="center">
          <CircularProgress isIndeterminate color="teal" />
        </Flex>
  );
}

export default LandingPage;