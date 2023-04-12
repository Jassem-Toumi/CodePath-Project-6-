import { Input, Flex, Select } from "@chakra-ui/react";

function navbar({ types, handleOptions, handleSearch }) {
  return (
    <>
      <Flex w='50%' gap="2" alignItems="center" justifyContent="center">
        <Select
          placeholder="Select Type of Pet"
          w="30%"
          borderColor="gray.300"
          borderRadius="10"
          onChange={handleOptions}
        >
          {types &&
            types.map((type) => {
              return <option value={type.name}>{type.name}</option>;
            })}

        </Select>
        <Input
          focusBorderColor="green.500"
          placeholder="Search by breed"
          variant="filled"
          w="70%"
          borderRadius="10"
          borderColor="gray.300"
          onChange={handleSearch}
        />
      </Flex>
    </>
  );
}

export default navbar;
