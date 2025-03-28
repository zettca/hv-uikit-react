import { useMemo } from "react";
import {
  HvLoading,
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableInstance,
  HvTableRow
} from "@hitachivantara/uikit-react-core";

import { getColumns, NewEntry } from "lib/utils/listView";

interface TableProps {
  instance: HvTableInstance<NewEntry>;
  isLoading: boolean;
}

/**
 * The requests table.
 *
 * @param {instance} Object the instance returned by the `useHvData` data.
 * @param {isLoading} boolean indicates whether or not the data is loading.
 */
const Table = ({ instance, isLoading }: TableProps) => {
  const columns = useMemo(() => getColumns(), []);

  return (
    <HvTableContainer style={{ padding: "2px" }}>
      <HvTable variant="listrow" {...instance.getTableProps()}>
        <HvTableHead>
          <HvTableRow>
            <HvTableCell variant="listcheckbox" />
            {columns.map(col => (
              <HvTableHeader key={col.Header as string}>
                {col.Header as string}
              </HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        {isLoading ? (
          <tbody>
            <tr>
              <td colSpan={7}>
                <div style={{ marginTop: 40, marginBottom: 40 }}>
                  <HvLoading label="Loading data..." />
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <HvTableBody withNavigation {...instance.getTableBodyProps()}>
            {instance.page.map(row => {
              instance.prepareRow(row);
              return (
                <HvTableRow {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <HvTableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </HvTableCell>
                  ))}
                </HvTableRow>
              );
            })}
          </HvTableBody>
        )}
      </HvTable>
    </HvTableContainer>
  );
};

export default Table;
