import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import { TableProps } from "../../interfaces";

const Container = styled.div`
  margin-bottom: 3rem;
  // margin: 1rem 1.5rem 2rem 1.5rem;
  width: 100%;
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const Table = ({
  data,
  columns,
  onCellClick,
  total,
  page,
  setPage,
}: TableProps) => {
  const handleChangePage = (event: any, newPage: any) => {
    setPage(event);
  };

  return (
    <Container>
      <>
        <DataGrid
          autoHeight
          rows={data}
          columns={columns}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
          onCellClick={onCellClick}
          page={page}
          paginationMode="server"
          rowCount={total}
          onPageChange={handleChangePage}
        />
      </>
    </Container>
  );
};

export default Table;
