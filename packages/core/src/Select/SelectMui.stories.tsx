import { useState } from "react";
import { css } from "@emotion/css";
import { Decorator, Meta, StoryObj } from "@storybook/react";

import { HvSelect, HvSelectProps } from "./SelectMui";
import { HvButton } from "../Button";
import { HvOption } from "./Option";
import { HvOptionGroup } from "./OptionGroup";

const decorator: Decorator = (Story) => (
  <div style={{ width: 300, minHeight: 300 }}>{Story()}</div>
);

export default {
  title: "Components/SelectMui",
  component: HvSelect,
} satisfies Meta<typeof HvSelect>;

const options = [
  { value: "ar", label: "Argentina", flag: "🇦🇷" },
  { value: "bg", label: "Belgium", flag: "🇧🇪" },
  { value: "pt", label: "Portugal", flag: "🇵🇹" },
  { value: "pl", label: "Poland", flag: "🇵🇱" },
  { value: "sp", label: "Spain", flag: "🇪🇸" },
  { value: "us", label: "United States", flag: "🇺🇸" },
];

export const Main: StoryObj<HvSelectProps<{}, false>> = {
  args: {
    // open: true,
    multiple: false,
  },
  argTypes: {},
  decorators: [decorator],
  render: (args) => {
    return (
      <HvSelect
        required
        name="country"
        label="Country"
        description="Select your favorite country"
        placeholder="Select country"
        onChange={(evt, val) => console.log(val)}
        {...args}
      >
        <HvOptionGroup label="America">
          <HvOption value="ar">Argentina</HvOption>
          <HvOption value="us">United States</HvOption>
        </HvOptionGroup>
        <HvOptionGroup label="Europe">
          <HvOption value="bg">Belgium</HvOption>
          <HvOption value="pt">Portugal</HvOption>
          <HvOption value="pl">Poland</HvOption>
          <HvOption value="sp">Spain</HvOption>
        </HvOptionGroup>
      </HvSelect>
    );
  },
};

export const Variants: StoryObj<HvSelectProps<{}, false>> = {
  parameters: {
    docs: {
      description: {
        story: "Selects in their various form state variants.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        className={css({
          display: "flex",
          flexFlow: "row wrap",
          gap: 16,
          "& > *": { width: 200 },
        })}
      >
        {Story()}
      </div>
    ),
  ],
  render: () => {
    return (
      <>
        <HvSelect required label="Required" />
        <HvSelect disabled label="Disabled" />
        <HvSelect readOnly label="Read-only" />
        <HvSelect status="invalid" label="Invalid" />
      </>
    );
  },
};

export const Form: StoryObj<HvSelectProps<{}, false>> = {
  decorators: [decorator],
  render: () => {
    return (
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          const formData = new FormData(evt.currentTarget);
          alert(JSON.stringify(Object.fromEntries(formData)));
        }}
      >
        <HvSelect
          multiple
          required
          name="countries"
          label="Country"
          description="Select your favorite countries"
          placeholder="Select countries"
          options={options}
          getSerializedValue={(values) => values.map((v) => v.value).join(",")}
          onChange={(evt, val) => console.log(val)}
        >
          {options.map(({ value, label, flag }) => (
            <HvOption key={value} value={value} label={label}>
              {`${flag} ${label}`}
            </HvOption>
          ))}
        </HvSelect>
        <br />
        <HvButton type="submit" variant="secondarySubtle">
          Submit
        </HvButton>
      </form>
    );
  },
};

export const Controlled: StoryObj<HvSelectProps<{}, false>> = {
  decorators: [decorator],
  render: () => {
    const [selection, setSelection] = useState<string[]>([]);

    const anySelected = selection.length > 0;

    return (
      <>
        <HvSelect
          multiple
          required
          name="countries"
          label="Country"
          description="Select your favorite countries"
          placeholder="Select countries"
          value={selection}
          onChange={(evt, val) => setSelection(val)}
        >
          {options.map(({ value, label, flag }) => (
            <HvOption key={value} value={value} label={label}>
              {`${flag} ${label}`}
            </HvOption>
          ))}
        </HvSelect>
        <br />
        <HvButton
          variant="secondarySubtle"
          onClick={() => {
            setSelection(anySelected ? [] : options.map((o) => o.value));
          }}
        >
          {anySelected ? "Deselect all" : "Select all"}
        </HvButton>
      </>
    );
  },
};
