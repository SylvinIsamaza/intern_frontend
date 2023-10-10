import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const EditModal = ({ rowData, onClose }) => {
  return (
    <div className="flex fixed h-screen left-0 w-full top-0 z-[100] bg-[#0000002a]">
      <div className="w-full flex items-center justify-center">
        <div className="flex flex-col bg-white justify-center md:w-[40%] w-full rounded-2xl shadow-md pt-7 px-5 pb-10">
          <div className="flex justify-end">
            <AiOutlineClose onClick={onClose} />
          </div>
          <h2 className="text-center font-semibold text-[20px]">
            Edit Exchange
          </h2>
          <form>
            <label className="flex justify-start" htmlFor="balance">
              Balance <span className="text-primary ml-1">*</span>
            </label>
            <input
              type="text"
              className="w-full mt-1 py-3 block border border-gray-300 rounded-xl px-2"
              placeholder="Balance"
              id="balance"
              name="balance"
              value={rowData.balance}
              
            />
            <label className="flex justify-start" htmlFor="openDate">
              Open date
            </label>
            <input
              type="date"
              className="w-full mt-1 py-3 block border border-gray-300 rounded-xl px-2"
              id="openDate"
              name="opendDate"
              value={rowData.openDate}
              
            />
            <label className="flex justify-start" htmlFor="closeDate">
              Close date
            </label>
            <input
              type="date"
              className="w-full mt-1 py-3 block border border-gray-300 rounded-xl px-2"
              id="closeDate"
              name="closeDate"
              value={rowData.closeDate}
             
            />
            <label className="flex justify-start" htmlFor="status">
              Status
            </label>
            <select
              className="w-full mt-1 py-3 block border border-gray-300 rounded-xl px-2"
              id="status"
              name="status"
              value={rowData.status}
             
            >
              
            </select>
          
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
