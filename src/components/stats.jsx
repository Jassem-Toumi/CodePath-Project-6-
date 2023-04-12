import { Card, CardHeader, CardBody, Flex } from "@chakra-ui/react";

function stats({numFemales, numMales, mostCommonBreed, mostCommonColor}) {
  return (
    <>
      <Flex
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        gap='5'
      >
        <Card>
          <CardHeader pb='2'>Female</CardHeader>
          <CardBody pt='0'>{numFemales}</CardBody>
        </Card>
        <Card>
          <CardHeader pb='2'>Male</CardHeader>
          <CardBody pt='0'>{numMales}</CardBody>
        </Card>
        <Card>
          <CardHeader pb='2'>Most Common Breed</CardHeader>
          <CardBody pt='0'>{mostCommonBreed}</CardBody>
        </Card>
        <Card>
          <CardHeader pb='2'>Most Common Color</CardHeader>
          <CardBody pt='0'>{mostCommonColor}</CardBody>
        </Card>
      </Flex>
    </>
  );
}

export default stats;
