import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Table from "../components/table/Table";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GridCellParams, MuiEvent } from "@mui/x-data-grid";
import { Button, Snackbar } from "@material-ui/core";
import { columnsClients } from "../components/table/columns/columnsClients";
// import CreateFormModel from "../components/dashboard/createForms/CreateFormModel";
// import UpdateFormModel from "../components/dashboard/updateForms/UpdateFormModel";
import { Alert } from "@mui/material";
import {
  GET_ALL_CLIENTS_BY_NAME,
  REMOVE_CLIENT,
  TOTAL_CLIENTS,
} from "../graphql/clients";
import BaseLayout from "../layouts/BaseLayout";
import ConfirmDialog from "../components/table/dialogs/ConfirmDialog";
import Loading from "../components/layout/Loading";
import TableHeading from "../components/table/TableHeading";
import CreateFormClient from "../components/table/createForms/CreateFormClient";
import UpdateFormClient from "../components/table/updateForms/UpdateFormClient";

const Clients = () => {
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
    console.log("message", isSelected);
    setSnackbarMessage(isSelected);
  };
  const handleOpenSnackbarChange = (isSelected: boolean) => {
    console.log("open", isSelected);
    setOpenSnackbar(isSelected);
  };
  const handleSnackbarSuccessChange = (isSelected: boolean) => {
    console.log("success", isSelected);
    setSnackbarSuccess(isSelected);
  };

  const handleSearchChange = (searchString: string) => {
    setSearch(searchString);
  };

  const handleOpenCreateChange = () => {
    setIsOpenCreate(true);
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
  } = useQuery(TOTAL_CLIENTS, {
    variables: {
      name: search,
    },
  });
  const [getClientsByName, { error, loading, data }] = useLazyQuery(
    GET_ALL_CLIENTS_BY_NAME
  );
  // const [updateModel] = useMutation(UPDATE_MODEL);
  const [deleteClient] = useMutation(REMOVE_CLIENT);

  useEffect(() => {
    getClientsByName({
      variables: {
        name: search,
        offset: page,
        limit: 10,
      },
    });
  }, [getClientsByName, page, search]);

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
      setTitle("Bevestig het verwijderen van deze client");
      setMessage(
        "Ben je zeker dat je deze cliënt wilt verwijderen? Dit kan niet ongedaan gemaakt worden."
      );
    }
  };

  const deleteCurrentClient = async (id: number) => {
    try {
      await deleteClient({
        variables: {
          id: id,
        },
        refetchQueries: [
          {
            query: GET_ALL_CLIENTS_BY_NAME,
            variables: {
              name: search,
              offset: page,
              limit: 10,
            },
          },
          {
            query: TOTAL_CLIENTS,
            variables: {
              name: search,
            },
          },
        ],
      });
      setSnackbarSuccess(true);
      setSnackbarMessage("Client is verwijderd!");
      setOpenSnackbar(true);
      handleClose();
    } catch (error) {
      setSnackbarSuccess(false);
      setSnackbarMessage(
        `Client kon niet verwijderd wegens volgende fout: ${error}`
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
        title={"cliënt"}
        handleOpenCreate={handleOpenCreateChange}
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
          data={data.clientsByName}
          columns={columnsClients}
          onCellClick={currentlySelectedRow}
          total={totalData.totalClientsByName}
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
          handleConfirm={deleteCurrentClient}
        />
      )}

      {isOpen && (
        <UpdateFormClient
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
        <CreateFormClient
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

export default Clients;
