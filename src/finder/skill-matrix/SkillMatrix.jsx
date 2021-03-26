import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToggleBtn from "./ToggleBtn";
import ConfirmModal from "../../components/Modals/ConfirmModal";
import { Legend, RowButtons } from "./SkillMatrixComponents";
import { buttonColumn, prepareSMData } from "../../utils/functions";
import { DocumentLabel } from "../../utils/Formatter";

const SkillMatrix = ({ documents: docs }) => {
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    console.log(docs);
    const sample = docs[0];
    if (!sample) return;
    console.log(sample.signatures.map((sign) => sign.employee));
    setEmployees(() =>
      sample.signatures.map((sign) => sign.employee).filter((em) => em !== null)
    );
    console.log(prepareSMData(docs));
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

    employees.forEach((e) => {
      const name = `${e.first_name} ${e.last_name}`;
      columns.push({
        ...buttonColumn(e.id, name),
        // headerFormatter: FormattedEmployee,
        // headerTitle: (col, row) => "e.job",
        formatter: ToggleBtn,
        formatExtraData: {
          anet_id: e.id,
          data: data,
          setData: setData,
          id: counter++ % employees.length,
        },
      });
    });

    return columns;
  }

  function changedState(e) {
    return e.state.includes("X");
  }

  function sing(state) {
    return state.replace("s", "");
  }

  function cancelSign() {
    return "-";
  }

  function resetSign(require_superior) {
    return require_superior ? "es" : "s";
  }

  function updateState(d, e) {
    if (!changedState(e)) return e;

    let state = e.state.replace("X", "");
    if (action === "sign") state = sing(state);
    if (action === "cancelDuty") state = cancelSign();
    if (action === "trainAgain") state = resetSign(d.require_superior);
    return { ...e, state: state }; // updated employee
  }

  const handleAccept = () => {
    const update = data.map((d) => {
      return {
        ...d,
        employees: d.employees.map((e) => updateState(d, e)),
      };
    });
    setData(update);
  };

  const handleExport = () => {}; // TODO Export

  return (
    <>
      <BootstrapTable
        keyField="id"
        classes="skill-matrix-table"
        data={data}
        columns={columns}
        // horizontal scroll
        wrapperClasses="table-responsive"
        rowClasses="text-nowrap"
      />
      <RowButtons
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
