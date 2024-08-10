import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import "../../src/assets/styles/filter.css";
import Search from "../components/Search";
import { Button, Grid } from "@mui/material";
import ClientFilter from '../components/ClientsFilter'
import { useNavigate } from "react-router-dom";

export default function Filters() {
  const navigate = useNavigate();
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
        <Link to='dashboard' onClick={(e) =>{
          e.preventDefault();
          navigate('/dashboard')
        } }>
          <ArrowBackIosIcon />
        </Link>
      </nav>
      <Grid container spacing={2} gridRow={"auto"}>
        <Grid item xs={12}>
          <Search value={value} setValue={setValue} />
        </Grid>
        </Grid>
        <ClientFilter />
        <Grid container spacing={2} gridRow={"auto"}>
        <Grid item container xs={12} spacing={3}>
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
