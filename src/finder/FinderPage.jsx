import React, { useContext, useEffect, useState } from "react";
import Filter from "./Filter";
import SkillMatrix from "./skill-matrix/SkillMatrix";
import {
  prepareEmployees,
  getFetch,
  prepareCombinations,
  getCombinationsNames,
  postFetch,
} from "../utils/functions";
import { PairContext } from "../App";
import FoundRecords from "./FoundRecords";
import { FetchLoading } from "../components/FetchComponents";

const FinderPage = () => {
  const pairs = useContext(PairContext);

  const [cs, setCs] = useState([]); // all combinations
  const [es, setEs] = useState([]); // all employees
  const [em, setEm] = useState(); // selected employee in filter

  const [documents, setDocuments] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [showSM, setShowSM] = useState();

  useEffect(() => {
    getFetch("/combinations").then((res) => setCs(prepareCombinations(res)));
    getFetch("/employees/all").then((res) => setEs(prepareEmployees(res)));
  }, []);

  useEffect(() => {
    getFetch("/document/actual").then((res) =>
      setDocuments(prepareFoundDocs(res))
    );
  }, [cs]);

  const resetTables = () => {
    setDocuments([]);
    setTrainings([]);
  };

  const searchByCombination = (filter) => {
    resetTables();
    console.log(filter);
    postFetch(`/document/filter`, JSON.stringify(filter)).then((r) =>
      setDocuments(prepareFoundDocs(r))
    );
  };

  const searchByEmployee = (employee) => {
    setEm(employee);
    resetTables();

    const id = employee.value;
    getFetch(`/signed/signatures/${id}`).then((r) => {
      let trainings = addCompleteness(r.trainings, 100);
      setTrainings((prevState) => [...prevState, ...trainings]);

      let documents = addCompleteness(r.documents, 100);
      documents = prepareFoundDocs(documents);
      setDocuments((prevState) => [...prevState, ...documents]);
    });

    getFetch(`/unsigned/signatures/${id}`).then((r) => {
      let trainings = addCompleteness(r.trainings, 0);
      setTrainings((prevState) => [...prevState, ...trainings]);

      let documents = addCompleteness(r.documents, 0);
      documents = prepareFoundDocs(documents);
      setDocuments((prevState) => [...prevState, ...documents]);
    });
  };

  const matrixByFilter = (filter) => {
    // setDocuments([]);

    getFetch(
      `/skill/matrix`,
      new URLSearchParams(`filter=${filter}`)
    ).then((r) => setDocuments(r.documents));
  };

  const matrixBySuperior = (superior) => {
    setEm(superior);

    const id = superior.value;

    fetch(`skill/matrix`, {
      method: "POST",
      body: new URLSearchParams(`superior_id=${id}`),
    })
      .then((result) => result.json())
      .then((r) => {
        console.log(r);
        setDocuments(r.documents);
      });
  };

  function addCompleteness(records, percentage) {
    return records.map((rec) => {
      return { ...rec, complete: percentage };
    });
  }

  function getLabels(cs, field) {
    const labels = cs.map((c) => c[field].map((f) => f.label));
    const unique = [...new Set(labels.flat())];
    return unique.join(",");
  }

  const prepareFoundDocs = (found) => {
    if (!found.length) return [];

    return found.map((doc) => {
      const doc_cs = getCombinationsNames(doc, pairs);
      return {
        ...doc,
        branches: getLabels(doc_cs, "branches"),
        cities: getLabels(doc_cs, "cities"),
        divisions: getLabels(doc_cs, "divisions"),
        departments: getLabels(doc_cs, "departments"),
      };
    });
  };

  if (!cs.length || !es.length) return <FetchLoading />;

  return (
    <div style={{ marginTop: "1%" }} className="finder">
      <Filter
        cs={cs}
        em={em}
        es={es}
        showSM={showSM}
        setShowSM={setShowSM}
        matrixByFilter={matrixByFilter}
        matrixBySuperior={matrixBySuperior}
        searchByEmployee={searchByEmployee}
        searchByCombination={searchByCombination}
      />
      {showSM ? (
        <SkillMatrix documents={documents} />
      ) : (
        <FoundRecords
          documents={documents}
          setDocuments={setDocuments}
          trainings={trainings}
          setTrainings={setTrainings}
        />
      )}
    </div>
  );
};

export default FinderPage;
