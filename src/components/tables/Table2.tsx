import MaterialCheckbox from "@mui/material/Checkbox";
import { usePagination } from "@table-library/react-table-library/pagination";
import { useRowSelect } from "@table-library/react-table-library/select";
import {
  Body,
  Cell,
  Header,
  HeaderCell,
  HeaderRow,
  Row,
  Table,
  TableNode,
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import { Virtualized } from "@table-library/react-table-library/virtualized";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TablePagination from "./TablePagination";
import TableToolbar from "./TableToolbar";
import { RowHeight } from "@table-library/react-table-library/virtualized";
import { Paper } from "@mui/material";
export type { TableNode };

const scrollbar = `scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300 scrollbar-thumb-rounded-full`;

interface Table2Column {
  label: string;
  field: string;
}

interface Table2Props {
  columns: Table2Column[];
  rows: TableNode[];
}

const Table2 = (props: Table2Props) => {
  const { columns, rows } = props;

  const data = { nodes: rows };

  const theme = useTheme({
    Table: `
        --data-table-library_grid-template-columns: 48px repeat(${
          columns.length + 1
        }, minmax(0, 1fr));
      `,
  });

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 20,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {
    console.log(action, state);
  }

  const onSelectChange = (action, state) => {
    console.log(action, state);
  };
  const select = useRowSelect(data, {
    onChange: onSelectChange,
  });

  return (
    <Paper className="p-2">
      <section className="h-3rem">
	  <TableToolbar />
	  </section>

      <section className={`table-height-normal ${scrollbar}`}>
        <Table
          data={data}
          theme={theme}
          select={select}
          layout={{ custom: true, horizontalScroll: true, fixedHeader: true }}
          pagination={pagination}
          className={`${scrollbar}`}
        >
          {(rows) => (
            <Virtualized
              tableList={rows}
              rowHeight={38}
              header={() => <TableHeader select={select} columns={columns} />}
              body={(node, index) => (
                <TableBody select={select} columns={columns} row={node} />
              )}
              tableOptions={{
                renderBeforeTable: undefined,
                renderAfterTable: undefined,
              }}
              rowOptions={{
                renderBeforeRow: undefined,
                renderAfterRow: undefined,
              }}
            />
          )}
        </Table>
      </section>

      <section>
        <TablePagination />
      </section>
    </Paper>
  );
};

export default Table2;
