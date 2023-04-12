import {
  Card,
  CardHeader,
  CardBody,
  Checkbox,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

function filter({ handleCheckboxChange, checkboxValues}) {


  return (
    <Card
      display="absolute"
      top="0"
      left="0"
      // transform={'translate(-50%, -50%)'}
    >
      <CardHeader>Filter</CardHeader>
      <CardBody w="200px">
        <Stack>
          <Heading size="sm" textAlign="start">
            + Gender
          </Heading>
          <Stack pl={4} mt={1} spacing={1}>
            <Checkbox
              value="male"
              isChecked={checkboxValues.male}
              onChange={handleCheckboxChange}
            >
              Male
            </Checkbox>
            <Checkbox
            value="female"
            isChecked={checkboxValues.female}
            onChange={handleCheckboxChange}
            >
              Female
            </Checkbox>
          </Stack>
        </Stack>

        <Stack>
          <Heading size="sm" textAlign="start">
            + Age
          </Heading>
          <Stack pl={6} mt={1} spacing={1}>
            <Checkbox 
            value="baby"
            isChecked={checkboxValues.baby}
            onChange={handleCheckboxChange}
            >
              Baby
            </Checkbox>
            <Checkbox 
            value="young"
            isChecked={checkboxValues.young}
            onChange={handleCheckboxChange}
            >
              Young
            </Checkbox>
            <Checkbox 
            value="adult"
            isChecked={checkboxValues.adult}
            onChange={handleCheckboxChange}
            >
              Adult
            </Checkbox>
          </Stack>
        </Stack>

        <Stack>
          <Heading size="sm" textAlign="start">
            + Size
          </Heading>
          <Stack pl={6} mt={1} spacing={1}>
            <Checkbox 
            value="small"
            isChecked={checkboxValues.small}
            onChange={handleCheckboxChange}
            >
              Small
            </Checkbox>
            <Checkbox 
             value="medium"
              isChecked={checkboxValues.medium}
              onChange={handleCheckboxChange}
             >
              Medium
            </Checkbox>
            <Checkbox 
            value="large"
            isChecked={checkboxValues.large}
            onChange={handleCheckboxChange}
            >
              Large
            </Checkbox>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default filter;
