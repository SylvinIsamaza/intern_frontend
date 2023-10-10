import { Icon } from "@iconify/react";
import React, { useState } from "react";
import Card from "../Card/Card";
import newBuilding from "../../assets/New.svg";
import activeBuilding from "../../assets/active.svg";
import closedBuilding from "../../assets/closed.svg";
import canceledBuilding from "../../assets/canceled.svg";
import Search from "../search/Search";
import { styled } from '@mui/material/styles';

import { AiOutlineClose } from "react-icons/ai";
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from "@mui/x-data-grid";
import { Box, Pagination, PaginationItem, TablePagination, Typography } from "@mui/material";
function CustomPagination() {

  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Box sx={{
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      flexGrow: 1
    }}>

      <Pagination
        shape="rounded"
        page={page + 1}
        
        count={pageCount}
        // @ts-expect-error
        renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems:"center"
      }}>

      <Typography>
        View
        </Typography>
        <TablePagination
      component="div"
      count={100}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
          rowsPerPageOptions={-1}

    />
      </Box>

    </Box>
  );
}

const Exchange = () => {
  const PAGE_SIZE = 5;
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });
  const options = ["New", "Active", "Closed", "Canceled"];
  const columns = [
    { field: "ExchangeNumber", headerName: "EXCHANGE NUMBER",flex:1},
    { field: "exchanger", headerName: "EXCHANGER",flex:1 },
    { field: "lastName", headerName: "OPEN DATE", flex:1},
    { field: "closeDate", headerName: "CLOSE DATE", flex:1},
    { field: "lmd", headerName: "LAST MODIFIED DATE" },
    { field: 'lastName', headerName: 'ACCOUNT BALANCE', flex:1 },
    {
      field: "status",
      headerName: "STATUS",
    
      width:100,
    },
    {
      field: "ACTIONS",
      headerName: "ACTIONS",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.exchanger || ""} ${params.row.lastName || ""}`,
    },
  ];
  const rows = [
    { id: 1, lastName: "Snow", exchanger: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", exchanger: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", exchanger: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", exchanger: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", exchanger: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", exchanger: null, age: 150 },
    { id: 7, lastName: "Clifford", exchanger: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", exchanger: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", exchanger: "Harvey", age: 65 },
  ];
  const [openModal, setOpenModal] = useState(true);

  return (
    <div className="py-6">
      <div className="flex  justify-between px-3">
        <h1 className="font-bold text-lg text-[30px]">Exchange</h1>
        <button
          className="bg-secondary px-3 py-2 rounded-md flex items-center"
          onClick={() => setOpenModal(true)}
        >
          <Icon icon="ic:round-plus" color="white" />
          <span className="font-[550] text-white">New Exchange</span>
        </button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 md:gap-3 gap-3 sm:grid-cols-1 justify-between items-center">
        <Card
          title="New exchanges"
          count="10"
          className=" text-blue-500"
          icon={newBuilding}
        />
        <Card
          title="Active Exchanges"
          count="25"
          className="text-tertiary"
          icon={activeBuilding}
        />
        <Card
          title="Canceled Exchanges"
          count="10"
          className="text-quaternary"
          icon={canceledBuilding}
        />
        <Card
          title="Closed Exchanges"
          count="10"
          className="text-gray-500"
          icon={closedBuilding}
        />
      </div>
      <div className="justify-end w-full flex py-6 gap-2">
        <Search />

        <div className="w-[30px] h-[30px] border-[2px] border-gray-400 rounded-md flex items-center justify-center">
          <Icon icon="mdi:filter" className="h-[20px] w-[20px] text-primary" />
        </div>
        <div className="w-[30px] h-[30px] border-[2px] border-gray-400 rounded-md flex items-center justify-center">
          <Icon
            icon="typcn:export"
            className="h-[20px] w-[20px] text-primary"
          />
        </div>
      </div>

      <DataGrid
              rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[PAGE_SIZE]}
        checkboxSelection
        slots={{ pagination: CustomPagination, }}
        
        sx={{
          backgroundColor: "white",
          boxShadow: "2px",
        }}
       
      />
      {openModal && (
        <div className="flex fixed h-screen left-0 w-full top-0 z-[100] bg-[#0000002a]">
          <div className="w-full flex items-center justify-center">
            <div className="flex flex-col bg-white justify-center md:w-[40%] w-full rounded-2xl shadow-md pt-7 px-5 pb-10">
              <div className="flex justify-end">
                <AiOutlineClose onClick={() => setOpenModal(false)} />
              </div>
              <h2 className="text-center font-semibold text-[20px]">
                New Exchanges
              </h2>
              <label className="flex justify-start" htmlFor="balance">
                Balance <span className="text-primary ml-1">*</span>
              </label>
              <input
                type="text"
                className="w-full mt-1  py-3 block border border-gray-300 rounded-xl px-2 "
                placeholder="Balance"
                id="balance"
                name="balance"
              />
              <label className="flex justify-start" htmlFor="openDate">
                Open date
              </label>
              <input
                type="date"
                className="w-full mt-1  py-3 block border border-gray-300 rounded-xl px-2 "
                id="openDate"
                name="opendDate"
              />
              <label className="flex justify-start" htmlFor="closeDate">
                Close date
              </label>
              <input
                type="date"
                className="w-full mt-1  py-3 block border border-gray-300 rounded-xl px-2 "
                id="closeDate"
                name="closeDate"
              />
              <label className="flex justify-start" htmlFor="status">
                Status
              </label>
              <select
                className="w-full mt-1   py-3 block border border-gray-300 rounded-xl px-2 "
                id="status"
                name="status"
              >
                {options.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
              <button
                type="submit"
                className="py-2 bg-secondary mt-5 rounded-xl text-white font-bold"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exchange;
