import { GridColDef } from "@mui/x-data-grid";
import styled from "styled-components";
import { Delete, Edit } from "@material-ui/icons";

const Button = styled.button`
  width: 2rem;
  height: 2rem;
  min-width: 2rem;
  min-height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: #56b13d;
  border: 1px solid #56b13d;
  border-radius: 3px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  margin: 0 auto;

  &:hover {
    background-color: #afd9a3;
    color: #fff;
  }
`;

const DeleteButton = styled.button`
  width: 2rem;
  height: 2rem;
  min-width: 2rem;
  min-height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: #ed0034;
  border: 1px solid #ed0034;
  border-radius: 3px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  margin: 0 auto;

  &:hover {
    background-color: rgba(238, 0, 52, 0.4);
    color: #fff;
  }
`;

const Address = styled.div`
  padding: 0.5rem 0;

  p {
    font-size: 0.875rem;
    margin: 0;
  }
`;

const columnsSubcontractor: GridColDef[] = [
  { field: "companyName", headerName: "Bedrijfsnaam", minWidth: 200, flex: 1 },
  {
    field: "firstName",
    headerName: "Voornaam",
    minWidth: 100,
    flex: 1,
  },
  { field: "lastName", headerName: "Achternaam", minWidth: 100, flex: 1 },
  {
    field: "gender",
    headerName: "Geslacht",
    minWidth: 100,
    flex: 1,
    renderCell: (params) => {
      return params.row.gender === 0 ? "man" : "vrouw";
    },
  },
  { field: "function", headerName: "Functie", minWidth: 150, flex: 1 },
  { field: "email", headerName: "Email", minWidth: 240, flex: 1 },
  {
    field: "gsm",
    headerName: "Gsm",
    minWidth: 150,
    flex: 1,
    renderCell: (params) => {
      const gsm = params.row.gsm;
      const newSting =
        gsm.slice(0, 3) +
        " " +
        gsm.slice(3, 6) +
        " " +
        gsm.slice(6, 8) +
        " " +
        gsm.slice(8, 10) +
        " " +
        gsm.slice(10, 12);
      return newSting;
    },
  },
  {
    field: "address",
    headerName: "Adres",
    minWidth: 200,
    flex: 1,
    renderCell: (params) => {
      const firstLine = `${params.row.street} ${params.row.houseNumber}`;
      const secondLine = `${params.row.postalCode} ${params.row.city}`;
      return (
        <Address>
          <p>{firstLine}</p>
          <p>{secondLine}</p>
        </Address>
      );
    },
  },
  {
    field: "accountNumber",
    headerName: "Rekeningnr.",
    minWidth: 180,
    flex: 1,
    renderCell: (params) => {
      const account = params.row.accountNumber;
      const newSting =
        account.slice(0, 4) +
        " " +
        account.slice(4, 8) +
        " " +
        account.slice(8, 12) +
        " " +
        account.slice(12, 16);
      return newSting;
    },
  },
  {
    field: "vatNumber",
    headerName: "BTW nr.",
    minWidth: 150,
    flex: 1,
    renderCell: (params) => {
      const vat = params.row.vatNumber;
      const newSting =
        vat.slice(0, 2) +
        " " +
        vat.slice(2, 6) +
        " " +
        vat.slice(6, 9) +
        " " +
        vat.slice(9, 12);
      return newSting;
    },
  },
  {
    field: "edit",
    headerName: "Aanpassen",
    minWidth: 100,
    flex: 1,
    sortable: false,
    renderCell: (params) => {
      return (
        <Button>
          <Edit />
        </Button>
      );
    },
  },
  {
    field: "delete",
    headerName: "Verwijderen",
    minWidth: 100,
    flex: 1,
    sortable: false,
    renderCell: (params) => {
      return (
        <DeleteButton>
          <Delete />
        </DeleteButton>
      );
    },
  },
];

export { columnsSubcontractor };
