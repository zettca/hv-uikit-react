import { Link } from "react-router-dom";

import {
  Breakpoint,
  HvActionBar,
  HvButton,
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvCheckBox,
  HvSemanticColorKeys,
  HvSimpleGrid,
  HvTableInstance,
  HvTypography
} from "@hitachivantara/uikit-react-core";

import { useHvNavigation } from "@hitachivantara/app-shell-navigation";

import { getStatusIcon } from "lib/utils/assetInventory";

interface CarViewProps {
  instance: HvTableInstance<AssetInventoryModel>;
}

/**
 * The card view of the Asset Inventory.
 *
 * @param {Object} instance - the instance returned by the `useHvData` data.
 */
const CardView = ({ instance }: CarViewProps) => {
  const { getViewRoute } = useHvNavigation();
  return (
    <HvSimpleGrid
      breakpoints={
        [
          { minWidth: 1270, cols: 4, spacing: "md" },
          { minWidth: 960, cols: 3, spacing: "md" },
          { minWidth: 600, cols: 2, spacing: "sm" },
          { minWidth: 0, cols: 1, spacing: "sm" }
        ] as Breakpoint[]
      }>
      {instance.page.map(row => {
        const rowId = row?.original?.id ?? "";
        return (
          <HvCard
            bgcolor="atmo1"
            key={`${row?.values?.name}-row`}
            style={{ width: "100%" }}
            statusColor={row?.original?.statusColor}
            icon={getStatusIcon(
              row?.original?.statusColor as HvSemanticColorKeys
            )}>
            <HvCardHeader title={row?.values?.name} />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap"
              }}>
              <div>
                <HvCardContent>
                  <HvTypography variant="label">Event</HvTypography>
                  <HvTypography noWrap>{row?.values?.eventType}</HvTypography>
                </HvCardContent>
                <HvCardContent>
                  <HvTypography variant="label">Severity</HvTypography>
                  <HvTypography noWrap>{row?.values?.severity}</HvTypography>
                </HvCardContent>
              </div>
              <div>
                <HvCardContent>
                  <HvTypography variant="label">Status</HvTypography>
                  <HvTypography noWrap>{row?.values?.status}</HvTypography>
                </HvCardContent>
                <HvCardContent>
                  <HvTypography variant="label">Priority</HvTypography>
                  <HvTypography noWrap>{row?.values?.priority}</HvTypography>
                </HvCardContent>
              </div>
            </div>
            <HvActionBar>
              <HvCheckBox
                onChange={() => instance.toggleRowSelected?.(row.id)}
                checked={instance.selectedFlatRows.some(r => r.id === row.id)}
                value="value"
                inputProps={{ "aria-label": "leaf input" }}
              />
              <div style={{ flex: 1 }} />
              <HvButton
                aria-label="view1"
                component={Link}
                variant="secondaryGhost"
                to={
                  getViewRoute({
                    viewBundle: "/pages/Details",
                    pathParams: {
                      cardId: rowId,
                      cardText: "Descriptive card text"
                    }
                  }) ?? ""
                }>
                View
              </HvButton>
            </HvActionBar>
          </HvCard>
        );
      })}
    </HvSimpleGrid>
  );
};
export default CardView;
