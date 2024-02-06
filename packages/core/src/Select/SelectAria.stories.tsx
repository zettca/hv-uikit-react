import { Meta, StoryObj } from "@storybook/react";
import { Item } from "@react-stately/collections";

import { HvSelect } from "./SelectAria";

export default {
  title: "Components/SelectAria",
  component: HvSelect,
} satisfies Meta<typeof HvSelect>;

export const Main: StoryObj = {
  argTypes: {},
  render: () => {
    return (
      <HvSelect label="Select" description="Desc" placeholder="Select a value">
        <Item>Red</Item>
        <Item>Green</Item>
        <Item>Blue</Item>
      </HvSelect>
    );
  },
};

export const Test = () => (
  <HvSelect label="Select" description="Desc" placeholder="Select a value">
    <Item>Red</Item>
    <Item>Green</Item>
    <Item>Blue</Item>
  </HvSelect>
);
