import { Config, transform } from "@svgr/core";

const config: Config = {
  plugins: ["@svgr/plugin-jsx"],
  jsxRuntime: "automatic",

  // we only care about the JSX part of the generated React component
  template: (vars, { tpl }) => tpl`${vars.jsx}`,
  // disable other (desirable) utils for now, we're already doing this internally
  /*
  replaceAttrValues: {
    "#414141": "currentColor",
  },
  icon: true,
  expandProps: "end",
  typescript: true,
  ref: true,
  memo: true,
  svgProps: { role: "none", focusable: "false" },
  */
};

export function transformToJsx(svgCode: string, componentName?: string) {
  return transform.sync(svgCode, config, { componentName });
}
