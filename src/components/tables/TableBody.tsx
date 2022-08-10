import MaterialCheckbox from "@mui/material/Checkbox";
import { usePagination } from "@table-library/react-table-library/pagination";
import {
  Select,
  useRowSelect,
} from "@table-library/react-table-library/select";
import { Body, Cell, Row, TableNode } from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import { Virtualized } from "@table-library/react-table-library/virtualized";
import TableHeader from "./TableHeader";
// export type { TableNode };

interface TableBodyProps {
  select: Select;
  row: any;
  columns: any[];
}

const TableBody = (props: TableBodyProps) => {
  const { select, row, columns } = props;

  return (
    <Row item={row}>
      <Cell stiff>
        <MaterialCheckbox
          inputProps={{ "aria-label": "select item" }}
          size="small"
          checked={select.state.ids.includes(row.id)}
          onChange={() => select.fns.onToggleById(row.id)}
        />
      </Cell>
      {columns.map((column) => (
        <Cell key={column.label}>{row[column.field] || ""}</Cell>
      ))}

      <Cell>{`操作`}</Cell>
    </Row>
  );
};

export default TableBody;
