import { TablePagination as Pagination, Typography } from "@mui/material";
import React from "react";

const TablePagination = () => {
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="w-full flex items-center justify-between h-3rem pl-2">
        <section className="flex"> 
            <Typography>{0}</Typography>
            <Typography>{` of `}</Typography>
            <Typography>{0}</Typography>
            <Typography>{` rows select`}</Typography>
        </section>


        <section> 
            <Pagination
            component="div"
            count={100}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </section>

    
    </div>
  );
};

export default TablePagination;
