import { hexToRgb, alpha } from "@mui/material/styles";

export const hexToRgbA = (hex, factor = 0.8) => alpha(hexToRgb(hex), factor);
