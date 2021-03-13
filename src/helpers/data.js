/**
 * toto som čisto len testovacie dáta, náhradou za databázu
 */

export const employees = [
  {
    id: "1",
    name: "Janko",
    job: "Job1",
    complete: "70%",
  },
  {
    id: "2",
    name: "Julka",
    job: "Job2",
    complete: "100%",
  },
  {
    id: "3",
    name: "Jaroslav",
    job: "Job3",
    complete: "44%",
  },
  {
    id: "4",
    name: "Jozef",
    job: "Job4",
    complete: "53%",
  },
  {
    id: "5",
    name: "Juraj",
    job: "Job5",
    complete: "83%",
  },
  {
    id: "6",
    name: "Janka",
    job: "Job6",
    complete: "22%",
  },
];

const date = {
  Time: "2021-02-15T00:00:00Z",
  Valid: true,
};

export const doc_form = {
  id: "",
  type: "type0",
  name: "xxx",
  link: "linka",
  order_number: 1,
  note: "noteska",
  release_date: date,
  deadline: date,
  version: "1",
  assigned_to: "1; 2; 2; 2",
  require_superior: true,
};

export const trn_form = {
  name: "name_46",
  agency: "Agency name_18",
  agenda: "Agenda Agenda Agenda",
  lector: "Simona",
  place: "Trnava",
  duration: 30,
  date: date,
  deadline: date,
  employees: "1,2",
};

export const sm_data = [
  {
    id: 1,
    name: "Document1",
    type: "A",
    deadline: new Date("2021/3/16"),
    employees: [
      {
        anet_id: "1",
        state: "_",
      },
      {
        anet_id: "2",
        state: "_",
      },
      {
        anet_id: "3",
        state: "_",
      },
      {
        anet_id: "4",
        state: "_",
      },
      {
        anet_id: "5",
        state: "_",
      },
      {
        anet_id: "6",
        state: "_",
      },
    ],
  },
  {
    id: 2,
    name: "Document2",
    type: "B",
    deadline: new Date("2021/1/16"),
    employees: [
      {
        anet_id: "1",
        state: "-",
      },
      {
        anet_id: "2",
        state: "",
      },
      {
        anet_id: "3",
        state: "",
      },
      {
        anet_id: "4",
        state: "s",
      },
      {
        anet_id: "5",
        state: "-",
      },
      {
        anet_id: "6",
        state: "es",
      },
    ],
  },
  {
    id: 3,
    name: "Document3",
    type: "B",
    deadline: new Date("2021/1/16"),
    employees: [
      {
        anet_id: "1",
        state: "",
      },
      {
        anet_id: "2",
        state: "s",
      },
      {
        anet_id: "3",
        state: "es",
      },
      {
        anet_id: "4",
        state: "s",
      },
      {
        anet_id: "5",
        state: "es",
      },
      {
        anet_id: "6",
        state: "",
      },
    ],
  },
];

export const combinations = [
  {
    branches: { value: "A1", label: "A1" },
    divisions: { value: "D1", label: "D1" },
    departments: { value: "De1", label: "De1" },
    cities: { value: "C1", label: "C1" },
  },
  {
    branches: { value: "A1", label: "A1" },
    divisions: { value: "D1", label: "D1" },
    departments: { value: "De2", label: "De2" },
    cities: { value: "C2", label: "C2" },
  },
  {
    branches: { value: "A1", label: "A1" },
    divisions: { value: "D1", label: "D1" },
    departments: { value: "De3", label: "De3" },
    cities: { value: "C2", label: "C2" },
  },
  {
    branches: { value: "A1", label: "A1" },
    divisions: { value: "D2", label: "D2" },
    departments: { value: "De4", label: "De4" },
    cities: { value: "C2", label: "C2" },
  },
  {
    branches: { value: "B2", label: "B2" },
    divisions: { value: "D2", label: "D2" },
    departments: { value: "De2", label: "De2" },
    cities: { value: "C3", label: "C3" },
  },
  {
    branches: { value: "B1", label: "B1" },
    divisions: { value: "D13", label: "D13" },
    departments: { value: "B2", label: "B2" },
    cities: { value: "C1", label: "C1" },
  },
  {
    branches: { value: "B1", label: "B1" },
    divisions: { value: "B2", label: "B2" },
    departments: { value: "De4", label: "De4" },
    cities: { value: "C1", label: "C1" },
  },
];

export const comboFields = ["cities", "branches", "departments", "divisions"];
export const comboFieldsSingular = ["city", "branch", "department", "division"];

export const types = ["TPK", "OS", "PP", "PL"];
export const types2 = [
  { value: "TPK", label: "TPK" },
  { value: "OS", label: "OS" },
  { value: "PP", label: "PP" },
  { value: "PL", label: "PL" },
];

export const records = [
  { value: "documents", label: "documents" },
  { value: "document-training", label: "document-training" },
  { value: "online-training", label: "online-training" },
];
