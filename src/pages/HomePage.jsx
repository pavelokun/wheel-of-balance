import React, { useEffect, useRef } from "react";
import {
  Center,
  Flex,
  Spacer,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

import { Chart } from "../components/Chart";
import { Layout } from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import useObjState from "../hooks/useObjState";
import { db } from "../utils/init-firebase";
import SliderPanel from "../components/SliderPanel";
import SectorsForm from "../components/SectorsForm";
import ModalWindow from "../components/ModalWindow";
import { guid } from "../utils";

export default function HomePage() {
  const { currentUser } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const wheelsCollectionRef = useRef(null);

  const toast = useToast();

  const [{ isLoading, wheels, isDataFresh, activeWheelIndex }, setState] =
    useObjState({
      isLoading: true,
      wheels: [],
      isDataFresh: true,
      activeWheelIndex: 0,
    });

  useEffect(() => {
    async function setAppState() {
      setState(
        !!currentUser
          ? {
              isLoading: false,
              wheels: await getWheels(currentUser.uid),
            }
          : {
              wheels: [],
            }
      );
    }

    async function getWheels(userId) {
      try {
        wheelsCollectionRef.current = collection(db, "users", userId, "wheels");
        const collectionSnap = await getDocs(wheelsCollectionRef.current);
        const wheels = collectionSnap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        return wheels;
      } catch (error) {
        console.log("Get Wheels Error:", error.message);
        toast({
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      return [];
    }

    setAppState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const setSectorValue = (id, value) => {
    const updatedSectors =
      wheels[activeWheelIndex]?.sectors.map((sector) =>
        sector.id === id ? { ...sector, value } : sector
      ) || [];

    const updatedWheels = wheels.map((wheel, index) =>
      index === activeWheelIndex ? { ...wheel, sectors: updatedSectors } : wheel
    );

    setState({ wheels: updatedWheels, isDataFresh: false });
  };

  const onSubmit = (sectors) => {
    let updatedWheels = [];
    if (wheels.length) {
      updatedWheels = wheels.map((wheel, index) =>
        index === activeWheelIndex ? { ...wheel, sectors } : wheel
      );
    } else {
      updatedWheels = [{ id: guid(), sectors }];
    }

    setState({ wheels: updatedWheels, isDataFresh: false });
    onClose();
  };

  const uploadChanges = async () => {
    try {
      await setDoc(
        doc(
          db,
          "users",
          currentUser.uid,
          "wheels",
          wheels[activeWheelIndex].id
        ),
        { sectors: wheels[activeWheelIndex].sectors },
        { merge: true }
      );

      setState({ isDataFresh: true });
      toast({
        description: "The changes are saved",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log("Upload Change Error: ", error.message);
      toast({
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Layout>
      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <Flex mt={12} direction={"column"}>
          {!!wheels.length && (
            <Flex>
              <Center>
                <SliderPanel
                  data={wheels[activeWheelIndex]}
                  onChange={setSectorValue}
                  uploadChanges={uploadChanges}
                  editSpheres={onOpen}
                  isSaveDisabled={isDataFresh}
                />
              </Center>
              <Spacer flex={1} />
              <Center flex={3}>
                <Chart data={wheels[activeWheelIndex]} />
              </Center>
            </Flex>
          )}
          <ModalWindow
            isOpen={!wheels.length || isOpen}
            onClose={onClose}
            header="Spheres"
          >
            <SectorsForm
              data={wheels[activeWheelIndex]?.sectors || []}
              onSubmit={onSubmit}
            />
          </ModalWindow>
        </Flex>
      )}
    </Layout>
  );
}
