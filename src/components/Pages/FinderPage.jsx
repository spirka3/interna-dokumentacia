import React, {useEffect, useState} from "react";
import Filter from "../Others/Filter";
import FoundRecords from "../Tables/FoundRecords";
import SkillMatrix from "../Tables/SkillMatrix";
import {prepareEmployees, myFetch, prepareCombinations} from "../../helpers/functions";

const FinderPage = () => {

  const [showSkillMatrix, setShowSkillMatrix] = useState(false)

  const [cs, setCs] = useState([]);
  useEffect(() => {
    fetch('/combinations', {
      method: "GET",
    })
      .then(response => response.json())
      .then(res => {
        const combs = prepareCombinations(res)
        setCs(combs)
      })
      .catch((e) => console.log(e))
  },[])

  const [e, setE] = useState([]);
  useEffect(() => {
    fetch('/employees/all', {
      method: "GET",
    })
      .then(response => response.json())
      .then(res => {
        setE(prepareEmployees(res))
      })
      .catch((e) => console.log(e))
  },[])

  const [found, setFound] = useState([])
  useEffect(() => {
    myFetch("/document/actual")
      .then(data => setFound(data))
  }, [])

  const handleSearch = (filter) => {
    console.log(filter)
    fetch("http://localhost:7777/document/filter", {
      mode: 'no-cors',
      method: "POST",
      body: JSON.stringify(filter)
    }).then(res => {
      if (res.ok) {
        console.log(res)
        alert("Perfect! ");
      } else if (res.status === 401) {
        console.log(res)
        alert("Oops! ");
      }
    }, error => {
      console.log(error)
      alert("Error submitting form!");
    });
  }

  if (!cs.length) return <h1>Loading.. combinations</h1>
  if (!e.length) return <h1>Loading.. employees</h1>
  if (!found.length) return <h1>Loading.. records</h1>

  return (
    <div style={{marginTop: '1%'}} className="finder">
      <Filter
        showSM={showSkillMatrix}
        setShowSM={setShowSkillMatrix}
        cs={cs}
        e={e}
        found={found}
        handleSearch={handleSearch}
      />
      {showSkillMatrix
        ? <SkillMatrix
            found={found}
          />
        : <FoundRecords
            found={found}
            setFound={setFound}
            cs={cs}
          />
      }
    </div>
  )
}

export default FinderPage;
