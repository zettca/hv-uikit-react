import { useMemo, useState } from "react";
import {
  HvActionGeneric,
  HvBulkActions,
  HvButton,
  HvControls,
  HvGlobalActions,
  HvGrid,
  HvLeftControl,
  HvPagination,
  HvRightControl,
  useHvBulkActions,
  useHvData,
  useHvFilters,
  useHvGlobalFilter,
  useHvPagination,
  useHvRowSelection,
  useHvSortBy
} from "@hitachivantara/uikit-react-core";

import Kpi from "components/listView/Kpi";
import Table from "components/listView/Table";
import { actions, getColumns, makeData, NewEntry } from "lib/utils/listView";
import useStyles from "./styles";

const ListView = () => {
  const classes = useStyles();
  const originalData = useMemo(() => makeData(25), []);
  const [data] = useState(originalData);
  const columns = useMemo(() => getColumns(), []);
  const [isLoading, setIsLoading] = useState(false);
  const [kpiSelection, setKpiSelection] = useState<number | undefined>();
  const breakpoints = { xl: 3, lg: 3, md: 3, sm: 6, xs: 12 };

  const instance = useHvData<NewEntry>(
    {
      data,
      columns,
      initialState: { pageSize: 5 }
    },
    useHvGlobalFilter,
    useHvFilters,
    useHvSortBy,
    useHvPagination,
    useHvRowSelection,
    useHvBulkActions
  );

  const idsToControl = {
    cards: "cardsGrid",
    list: "itemList"
  };

  // Mock refresh function just simulating some time spent on re-fetching data
  const doRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
    instance.setFilter?.("status", "");
  };

  const handleAction = (
    event: React.SyntheticEvent,
    id: string,
    action: HvActionGeneric
  ) => {
    if (action.id === "refresh") {
      doRefresh();
    }
  };

  const bulkActionProps = instance.getHvBulkActionsProps?.();

  const getRequestCount = (status: number) => {
    return instance.initialRows.filter(r => r.original.status === status)
      .length;
  };

  return (
    <div className={classes.root}>
      <HvGlobalActions title="Requests" backButton={false}>
        <HvButton variant="primary">Request Server</HvButton>
      </HvGlobalActions>

      <HvGrid container className={classes.marginLg}>
        <HvGrid item {...breakpoints}>
          <Kpi
            title="Success Requests"
            count={getRequestCount(0)}
            color="sema0"
            variation="up"
            status={0}
            instance={instance}
            kpiSelection={kpiSelection}
            setKpiSelection={setKpiSelection}
          />
        </HvGrid>
        <HvGrid item {...breakpoints}>
          <Kpi
            title="Error Requests"
            count={getRequestCount(1)}
            color="sema0"
            variation="down"
            status={1}
            instance={instance}
            kpiSelection={kpiSelection}
            setKpiSelection={setKpiSelection}
          />
        </HvGrid>
        <HvGrid item {...breakpoints}>
          <Kpi
            title="Open Requests"
            count={getRequestCount(2)}
            color="sema0"
            variation="down"
            status={2}
            instance={instance}
            kpiSelection={kpiSelection}
            setKpiSelection={setKpiSelection}
          />
        </HvGrid>
        <HvGrid item {...breakpoints}>
          <Kpi
            title="Unassigned Requests"
            count={getRequestCount(3)}
            color="sema0"
            variation="up"
            status={3}
            instance={instance}
            kpiSelection={kpiSelection}
            setKpiSelection={setKpiSelection}
          />
        </HvGrid>
      </HvGrid>

      <HvControls
        className={classes.marginLg}
        views={[]}
        defaultView="card"
        callbacks={instance}>
        <HvLeftControl
          placeholder="Search"
          searchProps={{
            inputProps: {
              "aria-controls": `${idsToControl.cards} ${idsToControl.list}`
            }
          }}
        />
        <HvRightControl hideSortBy />
      </HvControls>

      <HvBulkActions
        className={classes.marginSm}
        {...bulkActionProps}
        numTotal={data.length}
        numSelected={instance.selectedFlatRows.length}
        maxVisibleActions={2}
        onSelectAll={() => bulkActionProps?.onSelectAll()}
        onSelectAllPages={() => bulkActionProps?.onSelectAllPages()}
        actions={actions}
        actionsDisabled={false}
        actionsCallback={handleAction}
        checkboxProps={{
          "aria-controls": `${idsToControl.cards} ${idsToControl.list}`
        }}
      />

      <div className={classes.marginSm}>
        <Table instance={instance} isLoading={isLoading} />
        {instance.page?.length ? (
          <HvPagination {...instance.getHvPaginationProps?.()} />
        ) : undefined}
      </div>
    </div>
  );
};

export default ListView;
