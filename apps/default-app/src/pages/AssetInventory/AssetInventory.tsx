import { useState, useMemo } from "react";
import {
  HvBulkActions,
  HvPagination,
  HvActionGeneric,
  HvControls,
  HvLeftControl,
  HvRightControl,
  useHvData,
  useHvSortBy,
  useHvGlobalFilter,
  useHvRowSelection,
  useHvBulkActions,
  useHvPagination
} from "@hitachivantara/uikit-react-core";

import ListView from "components/assetInventory/ListView";
import CardView from "components/assetInventory/CardView";
import {
  getColumns,
  makeData,
  actions,
  views,
  idsToControl
} from "lib/utils/assetInventory";

import initAppI18n, { namespace } from "lib/i18n";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18next from "i18next";
import useStyles from "./styles";

const rightControlValues = [
  {
    id: "nameAsc",
    accessor: "name",
    label: "Name Ascending",
    desc: false
  },
  {
    id: "nameDesc",
    accessor: "name",
    label: "Name Descending",
    desc: true
  },
  {
    id: "eventTypeAsc",
    accessor: "eventType",
    label: "Event Type Ascending",
    desc: false
  },
  {
    id: "eventTypeDesc",
    accessor: "eventType",
    label: "Event Type Descending",
    desc: true
  },
  {
    id: "severityAsc",
    accessor: "severity",
    label: "Severity Ascending",
    desc: false
  },
  {
    id: "severityDesc",
    accessor: "severity",
    label: "Severity Descending",
    desc: true
  }
];

initAppI18n();

const AssetInventory = () => {
  const { t } = useTranslation(namespace, { i18n: i18next });
  const classes = useStyles();
  const originalData = useMemo(() => makeData(10), []);
  const [currentView, setCurrentView] = useState("card");
  const [data] = useState(originalData);
  const columns = useMemo(() => getColumns(), []);
  const instance = useHvData<AssetInventoryModel>(
    {
      data,
      columns,
      initialState: { pageSize: 8 }
    },
    useHvGlobalFilter,
    useHvSortBy,
    useHvPagination,
    useHvRowSelection,
    useHvBulkActions
  );

  const bulkActionProps = instance.getHvBulkActionsProps?.();

  const actionsCallbackHandler = (
    event: React.SyntheticEvent,
    id: string,
    action: HvActionGeneric
  ) =>
    alert(
      `Callback for action ${action.label} on items ${instance.selectedFlatRows
        .map(r => r.id)
        .join(", ")}`
    );

  const viewChangeHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => setCurrentView(id);

  const selectAllHandler = () => bulkActionProps?.onSelectAll();

  const selectAllPagesHandler = () => bulkActionProps?.onSelectAllPages();

  return (
    <I18nextProvider i18n={i18next}>
      <div className={classes.root}>
        <h1>{t("intro")}</h1>
        <HvControls
          views={views}
          defaultView="card"
          callbacks={instance}
          onViewChange={viewChangeHandler}>
          <HvLeftControl
            placeholder="Search"
            searchProps={{
              inputProps: {
                "aria-controls": `${idsToControl.cards} ${idsToControl.list}`
              }
            }}
          />
          <HvRightControl
            values={rightControlValues}
            sortProps={{
              "aria-controls": `${idsToControl.cards} ${idsToControl.list}`
            }}
          />
        </HvControls>

        <HvBulkActions
          {...bulkActionProps}
          numTotal={data.length}
          numSelected={instance.selectedFlatRows.length}
          maxVisibleActions={2}
          onSelectAll={selectAllHandler}
          onSelectAllPages={selectAllPagesHandler}
          actions={actions}
          actionsCallback={actionsCallbackHandler}
          checkboxProps={{
            "aria-controls": `${idsToControl.cards} ${idsToControl.list}`
          }}
        />

        {currentView === "card" && <CardView instance={instance} />}
        {currentView === "list" && <ListView instance={instance} />}

        {instance.page?.length ? (
          <HvPagination
            {...instance.getHvPaginationProps?.()}
            pageSizeOptions={[8, 16, 32, 64]}
          />
        ) : undefined}
      </div>
    </I18nextProvider>
  );
};

export default AssetInventory;
