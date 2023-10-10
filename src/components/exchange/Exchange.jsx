import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import newBuilding from "../../assets/New.svg";
import activeBuilding from "../../assets/active.svg";
import closedBuilding from "../../assets/closed.svg";
import canceledBuilding from "../../assets/canceled.svg";
import Search from "../search/Search";
import { styled } from '@mui/material/styles';

import { AiOutlineClose, AiOutlineDelete, AiOutlineMenu } from "react-icons/ai";
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from "@mui/x-data-grid";
import { Box, Pagination, PaginationItem, TablePagination, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../redux/store";
import { loadTransaction } from "../../redux/action/transaction";
import EditModal from "../modal/editModal";

import { server } from "../server";
import axios from "axios";
function CustomPagination() {

  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
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
        sx={{
          flex: 1,
          justifyContent: "center",
          display: "flex",
          backgroundColor:""
        }}
      />
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        
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
          sx={{
         marginRight:"20px"
       }}
    />
      </Box>

    </Box>
  );
}

const Exchange = ({transactions}) => {

  const [formData, setFormData] = useState({
    balance: "",
    openDate: "",
    closeDate: "",
  
  });
  const [status,setStaus]=useState("")
const dispatch=useDispatch()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log("Form Data:", formData);
  
  };
  const handleEditClick = (row) => {
    setSelectedRow(row);
    setOpenEditModal(true);
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
    setOpenEditModal(false);
  };


  const PAGE_SIZE = 5;
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });
  const options = ["New", "Active", "Closed", "Canceled"];
  const columns = [
    { field: "transactionNumber", headerName: "EXCHANGE NUMBER", flex: 1, minWidth: 220 },
    { field: "exchanger", headerName: "EXCHANGER", flex: 1, minWidth: 200 },
    { field: "openDate", headerName: "OPEN DATE", flex: 1, minWidth: 150 },
    { field: "closeDate", headerName: "CLOSE DATE", flex: 1, minWidth: 150 },
    { field: "updatedAt", headerName: "LAST MODIFIED DATE", flex: 1, minWidth: 220 },
    { field: 'accountBalance', headerName: 'ACCOUNT BALANCE', flex: 1, minWidth: 200 },
    {
      field: "status",
      headerName: "STATUS",
      width: 150,
      
    },
    {
      field: "ACTIONS",
      headerName: "ACTIONS",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      minWidth: 100,
      renderCell: (params) => (
        <div className="flex gap-3 items-center">
          <Icon icon="basil:edit-outline" className="w-8 h-8 cursor-pointer"
            onClick={() => handleEditClick(params.row)}
          />
          <Icon icon="gg:more-r" className="w-8 h-8 cursor-pointer"
            onClick={() => handleMoreOptions(params.row.id)}
          />
        </div>
      )
    },
  ];
  
  
  const rows = transactions != null ? transactions : []
  const updatedRows = rows.length > 0 ? rows.map((row, index) => {
    
    async function fetch() {
      const { data } = await axios.get(`${server}/api/v1/user/get-user/${row.transactionExchanger}`)
      if (data) {
    return data
      }
      else {
        return ""
      }
    }
    if (!row.closeDate) {
      // If "Close Date" is missing, set it to '-'
      return {
        ...row,
        id:`row_${index}`,
        closeDate: '-',
        exchanger:fetch()
        
      };
    }
    return { ...row,id:`row_${index}`,exchanger:fetch() };
  }) : [];
  console.log(updatedRows)

  const [selectedRow, setSelectedRow] = useState(null);
  const [openModal, setOpenModal] = useState(false);


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
      <div className="grid md:grid-cols-2 lg:grid-cols-4 md:gap-3 gap-3 grid-cols-1 justify-between items-center">
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
        rows={updatedRows}
        columns={columns}
        disableRowSelectionOnClick
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[PAGE_SIZE]}
        checkboxSelection
        
        slots={{ pagination: CustomPagination, }}
        
        sx={{
          backgroundColor: "white",
          boxShadow: "5px",
          borderRadius: "0.75em",
          border: "none",
          
        }}
        className="rounded-3xl"
       
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
              <form onSubmit={handleSubmit} className="w-full">
              <label className="flex justify-start" htmlFor="balance">
                Balance <span className="text-primary ml-1">*</span>
              </label>
              <input
                type="text"
                className="w-full mt-1  py-3 block border border-gray-300 rounded-xl px-2 "
                placeholder="Balance"
                id="balance"
                name="balance"
                value={formData.balance}
                onChange={handleInputChange}
              />
              <label className="flex justify-start" htmlFor="openDate">
                Open date
              </label>
              <input
                type="date"
                className="w-full mt-1  py-3 block border border-gray-300 rounded-xl px-2 "
                id="openDate"
                name="opendDate"
                value={formData.openDate}
                onChange={handleInputChange}
              />
              <label className="flex justify-start" htmlFor="closeDate">
                Close date
              </label>
              <input
                type="date"
                className="w-full mt-1  py-3 block border border-gray-300 rounded-xl px-2 "
                id="closeDate"
                name="closeDate"
                value={formData.closeDate}
                onChange={handleInputChange}
              />
              <label className="flex justify-start" htmlFor="status">
                Status
              </label>
              <select
                className="w-full mt-1   py-3 block border border-gray-300 rounded-xl px-2 "
                id="status"
                  name="status"
                  onChange={handleInputChange}
              >
                {options.map((option) => (
                  <option value={option}onChange={()=>setStaus(option)} >{option}</option>
                ))}
              </select>
              <button
                type="submit"
                className="py-2 w-full bg-secondary mt-5 rounded-xl text-white font-bold"
              >
                Submit
                </button>
                </form>
            </div>
            
          </div>
        </div>
      )}
      {openEditModal && selectedRow && (
        <EditModal rowData={selectedRow} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Exchange;
