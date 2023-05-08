import { DOMAttributes, useState } from "react";
import {
  HvGrid,
  HvGlobalActions,
  HvButton,
  HvInput,
  HvTextArea,
  HvInputProps,
  HvLoading,
} from "@hitachivantara/uikit-react-core";
import { Map } from "@hitachivantara/uikit-react-icons";
import { fields, allCountries } from "./utils";
import classes from "./styles";

const submit = async (data: Record<string, unknown>) => {
  await new Promise((res) => setTimeout(res, 2000));
  console.log(data);
  alert(JSON.stringify(data, null, 2));
};

/** Handler for the suggestions on the location input. */
const suggestionHandler: HvInputProps["suggestionListCallback"] = (val) => {
  if (typeof val !== "string" || !val) return null;
  const foundCountries = allCountries.filter((country) =>
    country.toUpperCase().includes(val.toUpperCase())
  );

  if (foundCountries.length === 0) return null;

  return foundCountries.map((country, idx) => ({
    id: `c_${idx}`,
    label: country,
  }));
};

const Form = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit: DOMAttributes<HTMLFormElement>["onSubmit"] = async (
    event
  ) => {
    event.preventDefault();

    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    await submit(Object.fromEntries(formData.entries())); // // mock submit
    setIsSubmitting(false);
  };

  return (
    <>
      <HvGlobalActions title="Deploy" className={classes.section} />

      <form onSubmit={handleSubmit}>
        <HvGrid container className={classes.section}>
          <HvGrid item xs={12}>
            <HvGlobalActions title="Project Details" variant="section" />
          </HvGrid>
          <HvGrid item md={6} xs={12}>
            <HvInput required {...fields.asset} />
          </HvGrid>

          <HvGrid item md={6} xs={12}>
            <HvInput
              required
              suggestionListCallback={suggestionHandler}
              endAdornment={<Map />}
              {...fields.location}
            />
          </HvGrid>

          <HvGrid item md={6} xs={12}>
            <HvInput required {...fields.project} />
          </HvGrid>

          <HvGrid item md={6} xs={12}>
            <HvInput
              required
              type="number"
              inputProps={{ pattern: "\\d+" }}
              {...fields.version}
            />
          </HvGrid>

          <HvGrid item xs={12}>
            <HvInput required {...fields.name} />
          </HvGrid>

          <HvGrid item xs={12}>
            <HvTextArea
              required
              rows={5}
              maxCharQuantity={256}
              {...fields.description}
            />
          </HvGrid>
        </HvGrid>

        <div className={classes.footer}>
          <HvButton
            type="submit"
            disabled={isSubmitting}
            variant="primaryGhost"
          >
            {isSubmitting ? <HvLoading small /> : "Submit"}
          </HvButton>
        </div>
      </form>
    </>
  );
};

export default Form;
