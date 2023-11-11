"use client";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
const SettingProject = () => {
  const rows = [
    { id: 1, name: "User 1", role: "Stuff", status: "ban" },
    { id: 2, name: "User 2", role: "Poor man", status: "" },
    { id: 3, name: "User 3", role: "Senior", status: "" },
    { id: 4, name: "User 4", role: "Stuff", status: "" },
    { id: 5, name: "User 5", role: "Stuff", status: "ban" },
    { id: 6, name: "User 6", role: "Senior", status: "" },
    { id: 7, name: "User 7", role: "Stuff", status: "" },
    { id: 8, name: "User 8", role: "Senior", status: "ban" },
    { id: 9, name: "User 9", role: "Stuff", status: "" },
    { id: 10, name: "User 10", role: "Stuff", status: "" },
    // ... (up to User 100)
    { id: 100, name: "User 100", age: 47 },
  ];
  const columns: {
    id: string;
    label: string;
    align: "center" | "left" | "right" | "inherit" | "justify" | undefined;
  }[] = [
    { id: "member", label: "Members", align: "left" },
    { id: "role", label: "Role", align: "center" },
    { id: "actions", label: "status", align: "right" },
  ];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [row, setRows] = useState(0);

  const handleChangePage = (
    event: any,
    newPage: React.SetStateAction<number>
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: {
    target: { value: string | number };
  }) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    // Fetch or set your data here
    setRows(rows.length);
  }, []);
  const slicedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [nameRole, setNameRole] = useState("");
  const [colorRole, setColorRole] = useState("");
  const confirmHandler = () => {
    setShowPopup(false);
  };
  return (
    <>
      {/* popup */}
      {showPopup && (
        <div className="fixed flex h-screen w-screen bg-[rgba(0,0,0,.4)] z-10">
          <div className="relative m-auto">
            <form className="bg-[#9CB8DD] w-[400px] p-10 rounded-md text-black">
              {popupType === "add" ? (
                <p className="text-2xl">Add role</p>
              ) : (
                <p className="text-2xl">Edit role</p>
              )}
              <div className="mt-4">
                <p className="text-left">Name Role</p>
                <input
                  className="border border-slate-400 rounded-full w-full p-2 outline-none"
                  type="text"
                  onChange={(e) => {
                    setNameRole(e.target.value);
                  }}
                />
              </div>
              <div className="mt-4">
                <p className="text-left">Color Role</p>
                <input
                  className="border border-slate-400 rounded-full w-full p-2 outline-none"
                  type="text"
                  onChange={(e) => {
                    setColorRole(e.target.value);
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="w-full">
        {/* หัวข้อ */}
        <div className="flex justify-between m-10">
          <div className="text-4xl">All Members</div>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className=" lucide lucide-x-circle"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m15 9-6 6" />
              <path d="m9 9 6 6" />
            </svg>
          </button>
        </div>

        <div className="w-3/4 m-auto">
          {/* Add Role */}
          {/* <div className=' w-full text-right mb-4'>
                    <button onClick={()=>{
                        setPopupType("add")
                        setShowPopup(true)
                    }} className='bg-white p-2 px-4 rounded-md text-[#132043] my-2'>Add Role</button>
                </div> */}

          {/* Table */}
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer component={Paper} sx={{ maxHeight: 320 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {slicedRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="center">{row.role}</TableCell>
                      <TableCell align="right" className="text-red-400">
                        {" "}
                        {row.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    </>
  );
};

export default SettingProject;
