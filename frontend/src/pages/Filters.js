import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import "../../src/assets/styles/filter.css";
import Search from "../components/Search";
import { Button, Grid } from "@mui/material";
export default function Filters() {
  const [value, setValue] = React.useState([]);
  const discard = () => {
    setValue([]);
  };
  const apply = () => {
    console.log(value);
  };
  return (
    <>
      <nav
        style={{
          background: "#FFFFFF",
          padding: "10px 15px",
          margin: 0,
          textAlign: "left",
          display: "flex",
          alignContent: "center",
        }}
      >
        <Link>
          <ArrowBackIosIcon />
        </Link>
      </nav>
      <Grid container spacing={2} gridRow={"auto"}>
        <Grid item xs={12}>
          <Search value={value} setValue={setValue} />
        </Grid>
        <Grid item container xs={12} spacing={10}>
          <Grid item xs={4}>
            <Button fullWidth>History</Button>
          </Grid>
          <Grid
            item
            xs={8}
            padding={2}
            justifyContent={"space-between"}
            style={{ display: "flex" }}
          >
            <Button
              style={{ width: "48% " }}
              variant="outlined"
              onClick={discard}
            >
              Discard
            </Button>
            <Button
              style={{ width: "48% " }}
              variant="contained"
              onClick={apply}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
