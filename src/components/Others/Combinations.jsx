import React, {useState} from "react";
import {PlusSquare, DashSquare} from 'react-bootstrap-icons';
import CombinationModal from "../Modals/CombinationModal";

const Combinations = ({combinations, setCombinations}) => {

  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <hr/>
      <span onClick={() => setShowModal(true)}>
        <strong>Add combination {" "}</strong>
        <PlusSquare size="25" color="green"/>
      </span>

      { combinations.map(c =>
          <Combination
            c={c}
            combinations={combinations}
            setCombinations={setCombinations}/>)}

      { showModal &&
        <CombinationModal
          showModal={showModal}
          setShowModal={setShowModal}
          combinations={combinations}
          setCombinations={setCombinations}
        />
      }
      <hr/>
    </>
  )
}

const Combination = ({c, combinations, setCombinations}) => {

  const deleteCombination = () => {
    setCombinations(combinations.filter(c2 => c2.id !== c.id)); // delete the combination
  };

  return (
    // TODO JOZO prettify
    <p>{`Branch: ${c.branch} | Division: ${c.division} | Department: ${c.department} | City: ${c.city} `}
      <DashSquare size="25" color="red" onClick={deleteCombination}/>
    </p>
  )
}

export default Combinations;