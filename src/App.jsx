import { useEffect, useState } from "react";
import "./App.css";
// import keys from "./.env";
import { Client } from "@petfinder/petfinder-js";
import { Heading } from "@chakra-ui/react";
import Navbar from "./components/navbar";
import Cards from "./components/cards";
import Stats from "./components/stats";
import SideMenu from "./components/sideMenu";
import { CircularProgress } from "@chakra-ui/react";
const client = new Client({
  apiKey: "76jFxm0CjMEFzdd1wKmY30OW1zkzX6H4qkp2LnWKu4J4b0u3WY",
  secret: "7Uj128CDgxD96ulaGkx9kOLYWEnlTz6dhRy6HQbH",
});

function App() {
  //consts
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [filteredPets, setFilteredPets] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [pets, setPets] = useState([]);
  const [numFemales, setNumFemales] = useState(0);
  const [numMales, setNumMales] = useState(0);
  const [mostCommonBreed, setMostCommonBreed] = useState("");
  const [mostCommonColor, setMostCommonColor] = useState("");
  const [filteredBreed, setFilteredBreed] = useState([]);
  const [filteredCheckedBoxes, setFilteredCheckedBoxes] = useState([]);
  const [start, setStart] = useState(false);
  // const [ages, setAges] = useState([]);
  var dic1 = {};
  var dic2 = {};
  let males = 0;
  let females = 0;

  const [boxValChaned, setBoxValChanged] = useState(false);
  const [checkboxValues, setCheckboxValues] = useState({
    male: false,
    female: false,
    baby: false,
    young: false,
    adult: false,
    small: false,
    medium: false,
    large: false,
  });

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setCheckboxValues((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  // useEffect(() => {
  //   console.log(checkboxValues);
  // }, [checkboxValues]);

  const fetchTypes = async () => {
    const response = await client.animalData.types();

    setTypes(response.data.types);
  };

  useEffect(() => {
   
    fetchTypes();
    
  }, []);

  // //fetch animal by type
  const fetchPet = async ({ type }) => {
    const response = await client.animal.search({
      type: type,
    });

    setPets(
      response.data.animals.map((pet) => {
        return {
          id: pet.id,
          name: pet.name,
          age: pet.age,
          gender: pet.gender,
          breed: pet.breeds.primary,
          color: pet.colors.primary,
          size: pet.size,
          status: pet.status,
          description: pet.description,
          email: pet.contact.email,
          phone: pet.contact.phone,
          address: pet.contact.address,
          photo: pet.photos[0] != undefined ? pet.photos[0].large : null,
        };
      })
    );
  };

  useEffect(() => {
    if (selectedType) {
      fetchPet({ type: selectedType });
    }
    //rest stats
    setNumFemales(0);
    setNumMales(0);
    setMostCommonBreed("");
    setMostCommonColor("");
    dic1 = {};
    dic2 = {};
  }, [selectedType]);

  useEffect(() => {
    filterByCheckbox();
    mergeFiltered();
  }, [pets]);

  const handleOptions = (e) => {
    setSelectedType(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
    handleSearchresult(e.target.value);
  };

  //filter pets by search value
  // useEffect(() => {
  //   handleSearchresult();
  // }, [searchValue]);

  const handleSearchresult = (e) => {
    if (e.length > 0) {
      const filteredData = pets.filter((pet) =>
        Object.values(pet.breed)
          .join("")
          .toLowerCase()
          .includes(e.toLowerCase())
      );
      // console.log(filteredData);
      setFilteredBreed(filteredData);
    } else {
      setFilteredBreed([]);
    }
  };

  //filter pets by checkbox values
  const filterByCheckbox = () => {
    var filteredData = pets.filter((pet) => {
      var isMatch = true;
      var IsChecked = true;
      Object.entries(checkboxValues).forEach(([key, value]) => {
        if (value) {
          IsChecked = false;
          if (key === "male" || key === "female") {
            if (pet.gender.toLowerCase() !== key) {
              isMatch = false;
            }
          } else if (key === "baby" || key === "young" || key === "adult") {
            if (pet.age.toLowerCase() !== key) {
              isMatch = false;
            }
          } else if (key === "small" || key === "medium" || key === "large") {
            if (pet.size.toLowerCase() !== key) {
              isMatch = false;
            }
          }
        }
      });
      if (!IsChecked) {
        return isMatch;
      } else {
        return false;
      }
    });
    // console.log("filtered: " + filteredData.length);
    // console.log("filtered: " + filteredData);
    if (filteredData.length > 0) {
      setFilteredCheckedBoxes(filteredData);
    } else {
      setFilteredCheckedBoxes([]);
    }
  };
  useEffect(() => {
    filterByCheckbox();
  }, [checkboxValues]);

  //merge filteredBreed and filteredCheckedBoxes
  const mergeFiltered = () => {
    if (filteredBreed.length > 0 && filteredCheckedBoxes.length > 0) {
      console.log("I am here");
      console.log("filteredBoxes: " + filteredCheckedBoxes.length);
      console.log("filteredBreed: " + filteredBreed.length);

      const mergedData = filteredBreed.filter((pet) => {
        return filteredCheckedBoxes.includes(pet);
      });
      setFilteredPets(mergedData);
    } else if (filteredBreed.length > 0) {
      // console.log("filteredBreed: "+ filteredBreed.length);
      setFilteredPets(filteredBreed);
    } else if (filteredCheckedBoxes.length > 0) {
      if (searchValue.length > 0) {
        setFilteredPets([]);
      } else {
        setFilteredPets(filteredCheckedBoxes);
      }
    } else {
      setFilteredPets([]);
    }
  };
  useEffect(() => {
    mergeFiltered();
  }, [filteredBreed, filteredCheckedBoxes]);

  useEffect(() => {
    setStart(true);
    setSelectedType("rabbit");
  }, []);

  useEffect(() => {
    //check if searchValue or checkboxValues changed
    if (searchValue !== "" || Object.values(checkboxValues).includes(true)) {
      setStart(true);
    } else {
      setStart(false);
    }
  }, [searchValue || checkboxValues]);

  // Calculating Data for Stats
  useEffect(() => {
    //find number of females && number of males
    pets.map((pet) => {
      if (pet.gender.toLowerCase() == "male") {
        males += 1;
      } else if (pet.gender.toLowerCase() == "female") {
        females += 1;
      }
      if (pet.breed !== null) {
        if (pet.breed in dic1) {
          dic1[pet.breed] += 1;
        } else {
          dic1[pet.breed] = 1;
        }
      }
      if (pet.color !== null) {
        if (pet.color in dic2) {
          dic2[pet.color] += 1;
        } else {
          dic2[pet.color] = 1;
        }
      }
    });

    setNumMales(males);
    setNumFemales(females);

    //find the most common breed
    var max = 0;
    var mostCommonBreed = "";
    for (var key in dic1) {
      if (dic1[key] > max) {
        max = dic1[key];
        mostCommonBreed = key;
      }
    }
    setMostCommonBreed(mostCommonBreed);
    //find the most common color
    var max = 0;
    var mostCommonColor = "";
    for (var key in dic2) {
      if (dic2[key] > max) {
        max = dic2[key];
        mostCommonColor = key;
      }
    }
    setMostCommonColor(mostCommonColor);
  }, [pets]);

  return (
    <div className="App">
      <SideMenu
        handleCheckboxChange={handleCheckboxChange}
        checkboxValues={checkboxValues}
      />

      <Heading pt="10" color="gray.500">
        Adopt a pet
      </Heading>
      <Navbar
        types={types}
        handleOptions={handleOptions}
        handleSearch={handleSearch}
      />

      <Stats
        numFemales={numFemales}
        numMales={numMales}
        mostCommonBreed={mostCommonBreed}
        mostCommonColor={mostCommonColor}
      />

      {start == false ? (
        pets.length > 0 ? (
          pets.map((pet) => <Cards pet={pet} />)
        ) : (
          <CircularProgress isIndeterminate color="green.300" />
        )
      ) : filteredPets.length > 0 ? (
        filteredPets.map((pet) => <Cards pet={pet} />)
      ) : (
        <Heading
          position="absolute"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
          color="gray.400"
        >
          No pets found...
        </Heading>
      )}
    </div>
  );
}

export default App;
