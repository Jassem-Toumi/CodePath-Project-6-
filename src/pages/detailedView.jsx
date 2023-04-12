import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Heading, Image, Text, Stack, Flex } from "@chakra-ui/react";
import { Client } from "@petfinder/petfinder-js";
import notFound from "../assets/picture.png";
const client = new Client({
  apiKey: "76jFxm0CjMEFzdd1wKmY30OW1zkzX6H4qkp2LnWKu4J4b0u3WY",
  secret: "7Uj128CDgxD96ulaGkx9kOLYWEnlTz6dhRy6HQbH",
});

function DetailedView() {
  const [petID, setPetID] = useState("");
  const [petDetails, setPetDetails] = useState([]);

  let params = useParams();
  useEffect(() => {
    setPetID(params.id);
  }, []);

  const handleFetch = () => {
    if (petID !== "") {
      client.animal.show(petID).then((resp) => {
        // setPetDetails(resp.data.animal);
        setPetDetails({
          name:
            resp.data.animal.name != null ? resp.data.animal.name : "Unknown",
          age: resp.data.animal.age != null ? resp.data.animal.age : "Unknown",
          gender:
            resp.data.animal.gender != null
              ? resp.data.animal.gender
              : "Unknown",
          size:
            resp.data.animal.size != null ? resp.data.animal.size : "Unknown",
          color:
            resp.data.animal.colors.primary != null
              ? resp.data.animal.colors.primary
              : "Unknown",
          breed:
            resp.data.animal.breeds.primary != null
              ? resp.data.animal.breeds.primary
              : "Unknown",
          pusblicshedAt:
            resp.data.animal.published_at != null
              ? resp.data.animal.published_at
              : "Unknown",
          description:
            resp.data.animal.description != null
              ? resp.data.animal.description
              : "Unknown",
          photo:
            resp.data.animal.photos[0] != undefined
              ? resp.data.animal.photos[0].large
              : null,
          organization:
            resp.data.animal.organization_id != null
              ? resp.data.animal.organization_id
              : "Unknown",
          contact:
            resp.data.animal.contact.email != null
              ? resp.data.animal.contact.email
              : "Unknown",
        });
      });
    }

  };

  useEffect(() => {
    handleFetch();
  }, [petID]);

  return (
    <Flex
      width={"100%"}
      justifyContent={"start"}
    //   alignItems={"center"}
      gap={"10px"}
      px={"50px"}
    >
      <Box
        maxW={"fit-content"}
        h={"fit-content"}
        bg={"gray.50"}
        boxShadow={"2xl"}
        rounded={"lg"}
        border={"1px solid"}
        borderColor={"gray.400"}
        py={"10px"}
        px={"40px"}
        // overflow={"hidden"}
      >
        <Heading textAlign={"center"} size={"lg"}>info</Heading>
        <Stack width={"100%"} my={"30px"} >
          <Flex
            width={"fit-content"}
            justifyContent={"start"}
            alignItems={"center"}
            flexDirection={"row"}
            gap={"10px"}
          >
            <Heading textAlign={"start"} size={"sm"}>
              Name:
            </Heading>
            <Text textAlign={"start"}>{petDetails.name}</Text>
          </Flex>
          <Flex
            width={"100%"}
            justifyContent={"start"}
            alignItems={"center"}
            flexDirection={"row"}
            gap={"10px"}
          >
            <Heading textAlign={"start"} size={"sm"}>
              Age:
            </Heading>
            <Text textAlign={"start"}>{petDetails.age}</Text>
          </Flex>
          <Flex
            width={"100%"}
            justifyContent={"start"}
            alignItems={"center"}
            flexDirection={"row"}
            gap={"10px"}
          >
            <Heading textAlign={"start"} size={"sm"}>
              Gender:
            </Heading>
            <Text textAlign={"start"}>{petDetails.gender}</Text>
          </Flex>

          <Flex
            width={"fit-content"}
            justifyContent={"start"}
            alignItems={"center"}
            flexDirection={"row"}
            gap={"10px"}
          >
            <Heading textAlign={"start"} size={"sm"}>
              Breed:
            </Heading>
            <Text textAlign={"start"}>{petDetails.breed}</Text>
          </Flex>

          <Flex
            width={"fit-content"}
            justifyContent={"start"}
            alignItems={"center"}
            flexDirection={"row"}
            gap={"10px"}
          >
            <Heading textAlign={"start"} size={"sm"}>
              Color:
            </Heading>
            <Text textAlign={"start"}>{petDetails.color}</Text>
          </Flex>

          <Flex
            width={"fit-content"}
            justifyContent={"start"}
            alignItems={"center"}
            flexDirection={"row"}
            gap={"10px"}
          >
            <Heading textAlign={"start"} size={"sm"}>
              Published At:
            </Heading>
            <Text textAlign={"start"}>{petDetails.pusblicshedAt}</Text>
          </Flex>

          <Flex
            width={"fit-content"}
            justifyContent={"start"}
            alignItems={"center"}
            flexDirection={"row"}
            gap={"10px"}
          >
            <Heading textAlign={"start"} size={"sm"}>
              Organization:
            </Heading>
            <Text textAlign={"start"}>{petDetails.organization}</Text>
          </Flex>

          <Flex
            width={" fit-content"}
            justifyContent={"start"}
            alignItems={"center"}
            flexDirection={"row"}
            gap={"10px"}
          >
            <Heading textAlign={"start"} size={"sm"}>
              Contact:
            </Heading>
            <Text textAlign={"start"}>{petDetails.contact}</Text>
          </Flex>
        </Stack>
      </Box>

      <Box
        // minW={"600px"}
        w={"50%"}
        // maxW={"fit-content"}
        h={"fit-content"}
        bg={"gray.50"}
        rounded={"lg"}
        border={"1px solid"}
        borderColor={"gray.400"}
        padding={"10px"}
        display={"flex"}
        alignItems={"start"}
        flexDirection={"column"}
        placeItems={"center"}
        gap={"10px"}
      >
        {
            petDetails.photo != null ? (
                <Image 
                src = {petDetails.photo}
                boxSize = {"sm"}
                objectFit = "cover"
                borderRadius = "lg"
                alt = "pet image"
                ></Image>
            ) : (
                <Image
                src={notFound}
                boxSize="140px"
                objectFit="cover"
                borderRadius="lg"
                alt="pet image"
                ></Image>
            )
        }
        <Stack
          width={"100%"}
          border={"1px solid"}
          borderColor={"gray.400"}
          borderRadius={"lg"}
          padding={"10px"}
        >
          <Heading size={"sm"} textAlign={"start"}>
            Description:
          </Heading>
          <Text fontSize={"lg"} textAlign={"start"}>
            {petDetails.description}
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
}

export default DetailedView;
