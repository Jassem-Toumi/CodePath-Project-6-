import Filter from "./filter";
import { Link} from "react-router-dom";
import { Button } from "@chakra-ui/react";

function sideMenu ({handleCheckboxChange, checkboxValues}) {

    return (
        <div className="sideMenu">
            <Filter 
            handleCheckboxChange={handleCheckboxChange}
            checkboxValues={checkboxValues}
             />
             <Link to={"/dataviz"}>
                <Button
                 colorScheme="linkedin"
                  mb={4}
                 >Stats</Button>
             </Link>
        </div>
    )
}

export default sideMenu