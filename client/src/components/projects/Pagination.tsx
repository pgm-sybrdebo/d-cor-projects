import styled from "styled-components";
import ReactPaginate from "react-paginate";

const StyledPaginateContainer = styled.div`
  .paginationBttns {
    list-style: none;
    margin: 1rem 0 3rem 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .paginationBttns li {
    margin: 1.5rem 0;
  }
  .paginationBttns a {
    padding: 0.5rem;
    margin: 0.5rem;
    border-radius: 3px;
    border: 1px solid ${(props) => props.theme.colors.primaryAccentColor};
    color: black;
    cursor: pointer;
    @media (min-width: 62rem) {
      padding: 1rem;
    }
  }
  .paginationBttns a:hover {
    background-color: ${(props) => props.theme.colors.secondaryAccentColor};
  }
  .paginationActive a {
    background-color: ${(props) =>
      props.theme.colors.secondaryAccentColor} !important;
  }
  .paginationDisabled a {
    background-color: ${(props) => props.theme.colors.grey};
    cursor: not-allowed;
    &:hover {
      color: black;
      background-color: ${(props) => props.theme.colors.grey};
    }
  }
`;

const Pagination = ({ total, limitItems, pageNumber, changePage }: any) => {
  return (
    <StyledPaginateContainer>
      <ReactPaginate
        previousLabel={"Back"}
        nextLabel={"Next"}
        pageCount={Math.ceil(total / limitItems)}
        pageRangeDisplayed={0}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
        forcePage={pageNumber - 1}
      />
    </StyledPaginateContainer>
  );
};

export default Pagination;
