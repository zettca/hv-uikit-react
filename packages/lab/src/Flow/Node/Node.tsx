import { useState } from "react";
import {
  ExtractNames,
  HvActionsGeneric,
  HvActionsGenericProps,
  HvButton,
  HvButtonProps,
  HvTooltip,
  HvTypography,
  useLabels,
} from "@hitachivantara/uikit-react-core";
import { Down, Info, Up } from "@hitachivantara/uikit-react-icons";

import { useFlowContext, useFlowNode } from "../hooks";
import { HvFlowNodeParam } from "../types";
import { staticClasses, useClasses } from "./Node.styles";
import { ParamRenderer } from "./Parameters";
import { HvFlowBaseNode, HvFlowBaseNodeProps } from "./BaseNode";

export { staticClasses as flowNodeClasses };

export type HvFlowNodeClasses = ExtractNames<typeof useClasses>;

const DEFAULT_LABELS = {
  collapseLabel: "Collapse",
  expandLabel: "Expand",
};

export interface HvFlowNodeProps<T = any> extends HvFlowBaseNodeProps<T> {
  /** Node description. */
  description?: string;
  /** Node actions. */
  actions?: HvActionsGenericProps["actions"];
  /**
   * Node action callback.
   *
   * @deprecated Use `onAction` instead.
   * */
  actionCallback?: HvActionsGenericProps["actionsCallback"]; // TODO - remove in v6
  /** Node action callback. */
  onAction?: HvActionsGenericProps["onAction"];
  /** Whether the actions should be all icon buttons when visible. @default true */
  actionsIconOnly?: HvActionsGenericProps["iconOnly"];
  /** Node maximum number of actions visible. */
  maxVisibleActions?: HvActionsGenericProps["maxVisibleActions"];
  /** Node subtitle - this is typically the node "name" */
  subtitle?: string;
  /** Node group ID */
  groupId?: string;
  /** Node ID to match with the `nodeGroups`'s item */
  nodeId?: string;
  /** Node expanded */
  expanded?: boolean;
  /** Node parameters */
  params?: HvFlowNodeParam[];
  /** Props to be passed to the expand parameters button. */
  expandParamsButtonProps?: HvButtonProps;
  /** Labels used on the node. */
  labels?: HvFlowBaseNodeProps["labels"] & Partial<typeof DEFAULT_LABELS>;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvFlowNodeClasses;
}

export const HvFlowNode = ({
  id,
  type,
  headerItems,
  actions,
  actionCallback, // TODO - remove in v6
  onAction,
  maxVisibleActions = 1,
  expanded = false,
  actionsIconOnly = true,
  params: paramsProp,
  classes: classesProp,
  labels: labelsProps,
  children,
  expandParamsButtonProps,
  title: titleProp,
  subtitle: subtitleProp,
  description,
  groupId,
  nodeId,
  color: colorProp,
  icon: iconProp,
  ...props
}: HvFlowNodeProps<unknown>) => {
  const { classes } = useClasses(classesProp);
  const [showParams, setShowParams] = useState(expanded);
  const { nodeGroups, defaultActions } = useFlowContext();
  const labels = useLabels(DEFAULT_LABELS, labelsProps);
  const node = useFlowNode();

  const nodeGroup = (groupId && nodeGroups && nodeGroups[groupId]) || undefined;
  const nodeGroupItem =
    nodeGroup?.items?.find((item) => item.id === nodeId) ||
    nodeGroup?.items?.find((item) => item.nodeType === type) ||
    undefined;
  const title = titleProp || nodeGroup?.label;
  const icon = iconProp || nodeGroup?.icon;
  const color = colorProp || nodeGroup?.color;
  const subtitle = subtitleProp || nodeGroupItem?.subtitle;
  const params = paramsProp || nodeGroupItem?.params;

  const hasParams = !!(params && params.length > 0);

  return (
    <HvFlowBaseNode
      id={id}
      type={type}
      title={title}
      icon={icon}
      color={color}
      nodeActions={defaultActions}
      classes={classes}
      headerItems={
        <>
          {headerItems}
          {description && (
            <HvTooltip title={description}>
              <div>
                <Info role="presentation" color="base_dark" />
              </div>
            </HvTooltip>
          )}
          {hasParams && (
            <HvButton
              icon
              overrideIconColors={false}
              onClick={() => setShowParams((p) => !p)}
              aria-label={
                showParams ? labels?.collapseLabel : labels?.expandLabel
              }
              {...expandParamsButtonProps}
            >
              {showParams ? (
                <Up role="presentation" color="base_dark" />
              ) : (
                <Down role="presentation" color="base_dark" />
              )}
            </HvButton>
          )}
        </>
      }
      labels={labels as HvFlowNodeProps["labels"]}
      {...props}
    >
      {(subtitle || actions) && (
        <div className={classes.subtitleContainer}>
          {subtitle && (
            <div>
              <HvTypography>{subtitle}</HvTypography>
            </div>
          )}
          {actions && (
            <HvActionsGeneric
              className={classes.actions}
              classes={{ button: classes.actionsButton }}
              actions={actions}
              actionsCallback={actionCallback}
              onAction={onAction}
              maxVisibleActions={maxVisibleActions}
              iconOnly={actionsIconOnly}
            />
          )}
        </div>
      )}
      {children}
      {showParams && params && (
        <div className={classes.paramsContainer}>
          <ParamRenderer params={params} data={node?.data} />
        </div>
      )}
    </HvFlowBaseNode>
  );
};
