import React, { useEffect, useState } from "react";
import { Input, Flex, Select, Box, Heading } from "@chakra-ui/react";
import { Client } from "@petfinder/petfinder-js";
const client = new Client({
  apiKey: "76jFxm0CjMEFzdd1wKmY30OW1zkzX6H4qkp2LnWKu4J4b0u3WY",
  secret: "7Uj128CDgxD96ulaGkx9kOLYWEnlTz6dhRy6HQbH",
});
import Bar from "../components/barChart";
import Pie from "../components/pieCharts";

function DataViz() {
  const [start, setStart] = useState(false);
  const [types, setTypes] = useState([]);
  const [pets, setPets] = useState([]);
  const [breedCount, setBreedCount] = useState([]);
  const [agesCount, setAgesCount] = useState([]);

  const fetchTypes = async () => {
    const response = await client.animalData.types();
    setTypes(response.data.types);
  };

  useEffect(() => {
    setStart(true);
  }, []);

  useEffect(() => {
    if (start) {
      //   console.log("fetching types");
      fetchTypes();
      handleSelect({ target: { value: "Dog" } });
    }
  }, [start]);

  const handleSelect = async (e) => {
    setBreedCount([]);
    setAgesCount([]);
    const response = await client.animal.search({
      type: e.target.value,
    });
    setPets(
      response.data.animals.map((pet) => {
        return {
          id: pet.id,
          age: pet.age,
          gender: pet.gender,
          breed: pet.breeds.primary,
          color: pet.colors.primary,
          size: pet.size,
        };
      })
    );
  };

  useEffect(() => {
    const newBreedCount = { ...breedCount }; // make a copy of the previous state
    pets.forEach((pet) => {
      if (newBreedCount[pet.breed]) {
        newBreedCount[pet.breed]++;
      } else {
        newBreedCount[pet.breed] = 1;
      }
    });
    setBreedCount(newBreedCount);

    const newAgesCount = { ...agesCount }; // make a copy of the previous state
    pets.forEach((pet) => {
      if (newAgesCount[pet.age]) {
        newAgesCount[pet.age]++;
      } else {
        newAgesCount[pet.age] = 1;
      }
    });
    setAgesCount(newAgesCount);
  }, [pets]);

  const [formatted_input, setFormatted_input] = useState([]);

  useEffect(() => {
    setFormatted_input(
      Object.entries(breedCount).map(([breed, number]) => ({
        breed,
        number,
      }))
    );
  }, [breedCount]);

  const [formatted_input2, setFormatted_input2] = useState([]);
  useEffect(() => {
    setFormatted_input2(
      Object.entries(agesCount).map(([name, number]) => ({
        name,
        number,
      }))
    );
  }, [agesCount]);

  return (
    <Box
    display={"flex"}
    flexDirection={"column"}
    alignItems={"center"}
    justifyContent={"center"}
    placeItems={"center"}
    gap={"50px"}

    >
      <Heading pb={"50px"}>DataViz</Heading>
      <Select
        placeholder="Select Type of Pet"
        w="20%"
        borderColor="gray.300"
        borderRadius="10"
        onChange={handleSelect}
        position={"absolute"}
        top={"50px"}
        left={"40px"}
      >
        {types &&
          types.map((type) => {
            return <option value={type.name}>{type.name}</option>;
          })}
      </Select>
      <Flex
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {formatted_input && <Bar input={formatted_input} />}
        {formatted_input2 && <Pie input={formatted_input2} />}
      </Flex>
    </Box>
  );
}

export default DataViz;
