import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useNavigate } from "react-router-dom";
import "../../src/assets/styles/filter.css";
import Search from "../components/Search";
import { Button, Grid, Typography } from "@mui/material";
import ClientFilter from '../components/ClientsFilter'
import { useNavigate } from "react-router-dom";
import apiClient from "./apiClient";

export default function Filters({ setFilter }) {
  const navigate = useNavigate();


  const [valueC, setValueC] = React.useState([
    { name: "mohamad", isSelected: false },
    { name: "amazon", isSelected: false },
    { name: "google", isSelected: false },
    { name: "khaled", isSelected: false },
    { name: "kholod", isSelected: false }
  ]);
  const [valueS, setValueS] = React.useState([]);

  const discard = () => {
    setValueS([]);
  };

  const apply = () => {
    setFilter({
      valueS,
      valueC
    })

  };

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await apiClient.get("/filters");
        setFilters(response.data);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };
    fetchFilters();
  }, []);


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
        <Link to='dashboard' onClick={(e) => {
          e.preventDefault();
          navigate('/dashboard');
        }}>
          <ArrowBackIosIcon />
        </Link>
      </nav>
      <Grid container spacing={2} gridRow={"auto"}>
        <Grid item xs={12}>
          <Search value={valueS} setValue={setValueS} />
        </Grid>
      </Grid>
      <ClientFilter clients={valueC} setClients={setValueC} />
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
              style={{ width: "48%" }}
              variant="outlined"
              onClick={discard}
            >
              Discard
            </Button>
            <Button
              style={{ width: "48%" }}
              variant="contained"
              onClick={apply}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
      </Grid>


      <div style={{ marginTop: '20px' }}>
        <Typography variant="h6">Filters Data:</Typography>
        {filters.length > 0 ? (
          <ul>
            {filters.map((filter, index) => (
              <li key={index}>{JSON.stringify(filter)}</li>
            ))}
          </ul>
        ) : (
          <Typography variant="body1">No filters available</Typography>
        )}
      </div>
    </>
  );
}
