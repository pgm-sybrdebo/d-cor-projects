import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Table from "../components/table/Table";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GridCellParams, MuiEvent } from "@mui/x-data-grid";
import { Button, Snackbar } from "@material-ui/core";
import { columnsClients } from "../components/table/columns/columnsClients";
import { Alert } from "@mui/material";

import BaseLayout from "../layouts/BaseLayout";
import ConfirmDialog from "../components/table/dialogs/ConfirmDialog";
import Loading from "../components/layout/Loading";
import TableHeading from "../components/table/TableHeading";
import {
  GET_ALL_SUBCONTRACTORS_BY_COMPANY_NAME,
  TOTAL_SUBCONTRACTORS,
  REMOVE_SUBCONTRACTOR,
} from "../graphql/subcontractor";
import CreateFormSubcontractor from "../components/table/createForms/CreateFormSubcontractor";
import { columnsSubcontractor } from "../components/table/columns/columnsSubcontractor";
import UpdateFormSubcontractor from "../components/table/updateForms/UpdateFormSubcontractor";

const Subcontractors = () => {
  const [selectedRow, setSelectedRow] = useState();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSuccess, setSnackbarSuccess] = useState(true);

  const handleSnackbarMessageChange = (isSelected: string) => {
    setSnackbarMessage(isSelected);
  };
  const handleOpenSnackbarChange = (isSelected: boolean) => {
    setOpenSnackbar(isSelected);
  };
  const handleSnackbarSuccessChange = (isSelected: boolean) => {
    setSnackbarSuccess(isSelected);
  };

  const handleSearchChange = (searchString: string) => {
    setSearch(searchString);
  };

  const handleOpenCreateChange = (isOpenCreate: boolean) => {
    setIsOpenCreate(isOpenCreate);
  };

  const handleSnackbarClose = (
    e: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const {
    data: totalData,
    error: totalError,
    loading: totalLoading,
  } = useQuery(TOTAL_SUBCONTRACTORS, {
    variables: {
      companyName: search,
    },
  });
  const [getSubcontractorsByName, { error, loading, data }] = useLazyQuery(
    GET_ALL_SUBCONTRACTORS_BY_COMPANY_NAME
  );
  const [deleteSubcontractor] = useMutation(REMOVE_SUBCONTRACTOR);

  useEffect(() => {
    getSubcontractorsByName({
      variables: {
        companyName: search,
        offset: page,
        limit: 10,
      },
    });
  }, [getSubcontractorsByName, page, search]);

  const currentlySelectedRow = (
    params: GridCellParams,
    event: MuiEvent<React.MouseEvent>
  ) => {
    const { field } = params;

    if (field !== "edit" && field !== "delete") {
      console.log(params.row);
      return;
    }

    if (
      field === "edit" &&
      event.target instanceof Element &&
      (event.target.tagName === "BUTTON" ||
        event.target.tagName === "svg" ||
        event.target.tagName === "path")
    ) {
      setSelectedRow(params.row);
      setIsOpen(true);
    } else if (
      field === "delete" &&
      event.target instanceof Element &&
      (event.target.tagName === "BUTTON" ||
        event.target.tagName === "svg" ||
        event.target.tagName === "path")
    ) {
      setSelectedRow(params.row);
      setIsOpenDialog(true);
      setTitle("Bevestig het verwijderen van deze onderaannemer");
      setMessage(
        "Ben je zeker dat je deze onderaannemer wilt verwijderen? Dit kan niet ongedaan gemaakt worden."
      );
    }
  };

  const deleteCurrentSubcontractor = async (id: number) => {
    try {
      await deleteSubcontractor({
        variables: {
          id: id,
        },
        refetchQueries: [
          {
            query: GET_ALL_SUBCONTRACTORS_BY_COMPANY_NAME,
            variables: {
              companyName: search,
              offset: page,
              limit: 10,
            },
          },
          {
            query: TOTAL_SUBCONTRACTORS,
            variables: {
              companyName: search,
            },
          },
        ],
      });
      setSnackbarSuccess(true);
      setSnackbarMessage("Onderaannemer is verwijderd!");
      setOpenSnackbar(true);
      handleClose();
    } catch (error) {
      setSnackbarSuccess(false);
      setSnackbarMessage(
        `Onderaannemer kon niet verwijderd wegens volgende fout: ${error}`
      );
      setOpenSnackbar(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsOpenDialog(false);
    setIsOpenCreate(false);
  };

  return (
    <BaseLayout>
      <TableHeading
        onSearchChange={handleSearchChange}
        onOpenCreateChange={handleOpenCreateChange}
      />

      {loading && <Loading />}
      {error && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={true}
          autoHideDuration={3000}
        >
          <Alert severity="error">An error occured: {error.message}</Alert>
        </Snackbar>
      )}
      {data && totalData && (
        <Table
          data={data.subcontractorsByCompanyName}
          columns={columnsSubcontractor}
          onCellClick={currentlySelectedRow}
          total={totalData.totalSubcontractorsByCompanyName}
          page={page}
          setPage={setPage}
        />
      )}

      {isOpenDialog && (
        <ConfirmDialog
          selectedRow={selectedRow}
          title={title}
          message={message}
          open={isOpenDialog}
          handleClose={handleClose}
          handleConfirm={deleteCurrentSubcontractor}
        />
      )}

      {isOpen && (
        <UpdateFormSubcontractor
          selectedRow={selectedRow}
          handleClose={handleClose}
          open={isOpen}
          page={page}
          name={search}
          onSnackbarMessageChange={handleSnackbarMessageChange}
          onOpenSnackbarChange={handleOpenSnackbarChange}
          onSnackbarSuccessChange={handleSnackbarSuccessChange}
        />
      )}

      {isOpenCreate && (
        <CreateFormSubcontractor
          handleClose={handleClose}
          open={isOpenCreate}
          page={page}
          name={search}
          onSnackbarMessageChange={handleSnackbarMessageChange}
          onOpenSnackbarChange={handleOpenSnackbarChange}
          onSnackbarSuccessChange={handleSnackbarSuccessChange}
        />
      )}

      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          severity={snackbarSuccess ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </BaseLayout>
  );
};

export default Subcontractors;
