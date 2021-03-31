import React, { useEffect, useState } from "react";
import ToggleBtn from "./ToggleBtn";
import ConfirmModal from "../../components/Modals/ConfirmModal";
import { Legend, RowButtons } from "./SkillMatrixComponents";
import {
  buttonColumn,
  prepareSMData,
  successResponse,
} from "../../utils/functions";
import { DocumentLabel } from "../../utils/Formatter";
import MyBootstrapTable from "../../components/Tables/MyBootstrapTable";

const SkillMatrix = ({ documents: docs }) => {
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const sample = docs[0];
    if (!sample || !sample.signatures) {
      setData([]);
      return;
    }

    setEmployees(() => sample.signatures.map((sign) => sign.employee));
    setData(prepareSMData(docs));
  }, [docs]);

  const [showLegend, setShowLegend] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [action, setAction] = useState("");

  const columns = getColumns();

  function getColumns() {
    const columns = [
      {
        dataField: "name",
        text: "Document Name",
        formatter: DocumentLabel,
      },
    ];

    let counter = 0;
    console.log(data);
    employees.forEach((e) => {
      const name = `${e.first_name} ${e.last_name}, ${e.job_title}`;
      columns.push({
        ...buttonColumn(e.id, name),
        // headerFormatter: FormattedEmployee,
        // headerTitle: (col, row) => "e.job",
        formatter: ToggleBtn,
        formatExtraData: {
          id: e.id,
          data: data,
          setData: setData,
          i: counter++ % employees.length,
        },
      });
    });

    return columns;
  }

  function changedState(e) {
    return e.state.includes("X");
  }

  function sign(state) {
    return state.replace("s", "");
  }

  function cancelSign() {
    return "-";
  }

  function resetSign(require_superior) {
    return require_superior ? "es" : "s";
  }

  function updateState(require_superior, e) {
    if (!changedState(e)) return e;

    let state = e.state.replace("X", "");
    if (action === "sign") {
      fetch("/sign/document", {
        method: "POST",
        body: new URLSearchParams(`id=${e.sign_id}`),
      }).then((res) => {
        if (successResponse(res)) state = sign(state);
      });
    }
    if (action === "cancelDuty") {
      fetch("/cancels_resigns", {
        method: "POST",
        body: JSON.stringify({
          cancel: e.sign_id,
          resign: "",
        }),
      }).then((res) => {
        if (successResponse(res)) state = cancelSign();
      });
    }
    if (action === "trainAgain") {
      fetch("/cancels_resigns", {
        method: "POST",
        body: JSON.stringify({
          cancel: "",
          resign: e.sign_id,
        }),
      }).then((res) => {
        if (successResponse(res)) state = resetSign(require_superior);
      });
    }
    return { ...e, state: state };
  }

  const handleAccept = () => {
    const update = data.map((d) => {
      console.log(d);
      return {
        ...d,
        employees: d.employees.map((e) => updateState(d.require_superior, e)),
      };
    });
    setData(update);
  };

  const handleExport = () => {}; // TODO Export

  return (
    <>
      <MyBootstrapTable
        title="SkillMatrix"
        classes="skill-matrix-table"
        data={data}
        columns={columns}
        // horizontal scroll
        wrapperClasses="table-responsive"
        rowClasses="text-nowrap"
      />
      <RowButtons
        data={data}
        setAction={setAction}
        setModalInfo={setModalInfo}
        setShowModal={setShowModal}
        handleAccept={handleAccept}
        handleExport={handleExport}
        showLegend={showLegend}
        setShowLegend={setShowLegend}
      />
      {showLegend && <Legend />}
      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalInfo={modalInfo}
        handleAccept={handleAccept}
      />
    </>
  );
};

export default SkillMatrix;
