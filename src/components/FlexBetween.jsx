import React from 'react';
import { Box } from "@mui/material";
import { styled } from "@mui/system";
//reusing css as style component using css in react and can be used in diffrent areas

const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
