// import styled from "styled-components";
// import ProjectCard from "../components/cards/ProjectCard";
// import {
//   GET_ALL_PROJECTS,
//   GET_ALL_PROJECTS_WITH_PAGINATION,
//   TOTAL_PROJECTS,
// } from "../graphql/projects";
// import { useQuery, useLazyQuery } from "@apollo/client";
// import BaseLayout from "../layouts/BaseLayout";
// import { useEffect, useState } from "react";
// import ReactPaginate from "react-paginate";

// const ProjectsList = styled.ul`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
//   flex-gap: 1rem;
// `;

// const StyledPaginateContainer = styled.div`
//   .paginationBttns {
//     list-style: none;
//     margin: 1rem 0 3rem 0;
//     display: flex;
//     justify-content: center;
//     flex-wrap: wrap;
//   }
//   .paginationBttns li {
//     margin: 1.5rem 0;
//   }
//   .paginationBttns a {
//     padding: 0.5rem;
//     margin: 0.5rem;
//     border-radius: 3px;
//     border: 1px solid ${(props) => props.theme.colors.primaryAccentColor};
//     color: black;
//     cursor: pointer;
//     @media (min-width: 62rem) {
//       padding: 1rem;
//     }
//   }
//   .paginationBttns a:hover {
//     background-color: ${(props) => props.theme.colors.secondaryAccentColor};
//   }
//   .paginationActive a {
//     background-color: ${(props) =>
//       props.theme.colors.secondaryAccentColor} !important;
//   }
//   .paginationDisabled a {
//     color: transparent;
//     background-color: transparent;
//     &:hover {
//       color: black;
//       background-color: transparent;
//     }
//   }
// `;

// const limitItems = 24;

// const Projects = () => {
//   const [pageNumber, setPageNumber] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("");
//   // const { loading, error, data } = useQuery(GET_ALL_PROJECTS_WITH_PAGINATION, {
//   //   variables: { limit: limitItems, offset: (pageNumber - 1) * limitItems },
//   // });
//   const { loading: loading2 } = useQuery(TOTAL_PROJECTS, {
//     onCompleted: (response) => {
//       console.log(response.totalProjects);
//       setTotal(Number(response.totalProjects));
//       console.log(total);
//     },
//     onError: (error) => {
//       console.log(`GRAPHQL ERROR: ${error.message}`);
//     },
//   });

//   const [getProjects, { loading, error, data }] = useLazyQuery(
//     GET_ALL_PROJECTS_WITH_PAGINATION
//   );

//   const changePage = ({ selected }: any) => {
//     setPageNumber(selected + 1);
//   };

//   useEffect(() => {
//     getProjects({
//       variables: { limit: limitItems, offset: pageNumber },
//     });
//   }, [getProjects, pageNumber]);

//   if (loading) return <div>Loading ...</div>;
//   if (error) return <div>Error: {error.message}</div>;
//   if (data) {
//     console.log(data);
//   }

//   return (
//     <BaseLayout>
//       {data && (
//         <>
//           <ProjectsList>
//             {data.projectsByPagination.map((project: any) => {
//               return (
//                 <ProjectCard
//                   key={project.id}
//                   id={project.id}
//                   name={project.name}
//                   active={project.active}
//                   search={search}
//                   sort={sort}
//                   offset={pageNumber - 1}
//                   limit={limitItems}
//                 />
//               );
//             })}
//           </ProjectsList>
//           {total > limitItems && (
//             <StyledPaginateContainer>
//               <ReactPaginate
//                 previousLabel={"Back"}
//                 nextLabel={"Next"}
//                 pageCount={Math.ceil(total / limitItems)}
//                 pageRangeDisplayed={0}
//                 onPageChange={changePage}
//                 containerClassName={"paginationBttns"}
//                 previousLinkClassName={"previousBttn"}
//                 nextLinkClassName={"nextBttn"}
//                 disabledClassName={"paginationDisabled"}
//                 activeClassName={"paginationActive"}
//                 forcePage={pageNumber - 1}
//               />
//             </StyledPaginateContainer>
//           )}
//         </>
//       )}
//     </BaseLayout>
//   );
// };

// export default Projects;

import styled from "styled-components";
import ProjectCard from "../components/cards/ProjectCard";
import {
  GET_ALL_PROJECTS_BY_NAME_WITH_PAGINATION,
  TOTAL_PROJECTS,
} from "../graphql/projects";
import { useQuery, useLazyQuery } from "@apollo/client";
import BaseLayout from "../layouts/BaseLayout";
import { useEffect, useState } from "react";
import ProjectHeading from "../components/projects/ProjectHeading";
import Pagination from "../components/projects/Pagination";
import { ProjectsOverview } from "../interfaces";
import Loading from "../components/layout/Loading";

const ProjectsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-gap: 1rem;
`;

const Text = styled.p`
  text-align: center;
  padding-top: 10%;
`;

const limitItems = 24;

const Projects = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");

  const {
    loading: loadinging,
    data: totalData,
    error: totalError,
  } = useQuery(TOTAL_PROJECTS, {
    variables: {
      name: search,
    },
  });

  useEffect(() => {
    if (totalData) {
      setTotal(Number(totalData.totalProjects));
    }
  }, [totalData]);

  const [projectsByName, { error, loading, data }] =
    useLazyQuery<ProjectsOverview>(GET_ALL_PROJECTS_BY_NAME_WITH_PAGINATION);

  const handleSearchChange = (searchString: string) => {
    setSearch(searchString);
    setPageNumber(1);
  };

  const handleSortChange = (sortString: string) => {
    setSort(sortString);
  };

  useEffect(() => {
    projectsByName({
      variables: {
        name: search,
        sort: sort,
        limit: limitItems,
        offset: pageNumber - 1,
      },
    });
  }, [search, pageNumber, projectsByName, total, sort]);

  const changePage = ({ selected }: any) => {
    setPageNumber(selected + 1);
  };

  if (error || totalError) {
    return (
      <BaseLayout>
        <Text>Er is een fout opgetreden!</Text>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <ProjectHeading
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
      />
      {data && (
        <>
          <ProjectsList>
            {data.projectsByNameWithPagination.map((project: any) => {
              return (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  name={project.name}
                  active={project.active}
                  search={search}
                  sort={sort}
                  offset={pageNumber - 1}
                  limit={limitItems}
                />
              );
            })}
          </ProjectsList>
          {total > limitItems && (
            <Pagination
              total={total}
              limitItems={limitItems}
              pageNumber={pageNumber}
              changePage={changePage}
            />
          )}
        </>
      )}
      {loading && <Loading />}
      {!error &&
        !totalError &&
        !loading &&
        !loadinging &&
        data &&
        total === 0 && (
          <Text>Er zijn geen projecten die beginnen met "{search}" !</Text>
        )}
    </BaseLayout>
  );
};

export default Projects;
