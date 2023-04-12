import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  Box,
  Text,
  Flex,
  StackDivider,
  Image,
  Divider,
} from "@chakra-ui/react";
import pictureNotFound from "../assets/picture.png";
import { Link } from "react-router-dom";
import { ExternalLinkIcon } from "@chakra-ui/icons";

function cards({ pet }) {
  return (
    <>
      <Card
        // variant="filled"
        w="70%"
        h={{ base: "100%", sm: "400px" }}
        my="5"
        direction={{ base: "column", sm: "row" }}
        p="5"
        boxShadow={"lg"}
        borderColor="gray.300"
        borderWidth="1px"
        borderRadius="lg"
        _hover={{
          boxShadow: "xl",
          bg: "green.200",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Link to={`/detailedView/${pet.id}`}>
          <ExternalLinkIcon
            mx="2px"
            position="absolute"
            top="5px"
            right="5px"
            boxSize={6}
            cursor={"pointer"}
            _hover={{
              color: "green.500",
            }}
          />
        </Link>

        {pet.photo != null ? (
          <Image
            src={pet.photo}
            // boxSize="300px"
            maxW={{ base: "100%", sm: "300px" }}
            objectFit="cover"
            borderRadius="lg"
            alt="pet image"
          ></Image>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            px="40px"
          >
            <Image
              src={pictureNotFound}
              boxSize="140px"
              // objectFit="cover"
              borderRadius="lg"
              alt="pet image"
            ></Image>
          </Box>
        )}

        <Stack>
          <CardBody
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <Heading size="md">Name: {pet.name}</Heading>
            <Flex wrap={"wrap"} gap="5">
              {pet.age != null ? (
                <Box pr="4" borderRight="1px solid gray">
                  <Heading size="xs" textTransform="uppercase">
                    Age
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {pet.age}
                  </Text>
                </Box>
              ) : null}
              {pet.gender != null ? (
                <Box pr="4" borderRight="1px solid gray">
                  <Heading size="xs" textTransform="uppercase">
                    Gender
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {pet.gender}
                  </Text>
                </Box>
              ) : null}

              {pet.breed != null ? (
                <Box pr="4" borderRight="1px solid gray">
                  <Heading size="xs" textTransform="uppercase">
                    Breed
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {pet.breed}
                  </Text>
                </Box>
              ) : null}

              {pet.color != null ? (
                <Box pr="4" borderRight="1px solid gray">
                  <Heading size="xs" textTransform="uppercase">
                    Color
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {pet.color}
                  </Text>
                </Box>
              ) : null}

              {pet.size != null ? (
                <Box pr="4" borderRight="1px solid gray">
                  <Heading size="xs" textTransform="uppercase">
                    Size
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {pet.size}
                  </Text>
                </Box>
              ) : null}

              {pet.status != null ? (
                <Box pr="4" borderRight="1px solid gray">
                  <Heading size="xs" textTransform="uppercase">
                    Status
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {pet.status}
                  </Text>
                </Box>
              ) : null}
            </Flex>
            <Divider />
            {pet.description != null ? (
              <Box pr="4">
                <Heading size="xs" textTransform="uppercase">
                  Description
                </Heading>
                <Text pt="2" fontSize="sm" textAlign="start">
                  {pet.description}
                </Text>
              </Box>
            ) : null}

            <Divider />

            <Box>
              <Heading size="xs" textTransform="uppercase">
                Contact
              </Heading>
              <Flex gap="2" alignItems="center" justifyContent="center">
                {pet.email != null ? (
                  <Text pt="2" fontSize="sm">
                    Email: {pet.email}
                  </Text>
                ) : null}
                {pet.phone != null ? (
                  <Text pt="2" fontSize="sm">
                    Phone: {pet.phone}
                  </Text>
                ) : null}
              </Flex>
            </Box>
          </CardBody>
        </Stack>
      </Card>
    </>
  );
}

export default cards;
