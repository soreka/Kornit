import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useNavigate } from "react-router-dom";
import "../../src/assets/styles/filter.css";
import Search from "../components/Search";
import { Button, Grid, Typography, Box, Checkbox, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import PrintIcon from '@mui/icons-material/Print';
import SettingsIcon from '@mui/icons-material/Settings';
import ClientFilter from '../components/ClientsFilter';
import apiClient from './apiClient'

export default function Filters({ setFilter, filter }) {
  const navigate = useNavigate();

  // State for checkboxes in the left and right containers
  const [checkedLeft, setCheckedLeft] = React.useState(Array(6).fill(false));
  const [checkedRight, setCheckedRight] = React.useState(Array(6).fill(false));
  const [valueC, setValueC] = React.useState([
    { name: "mohamad", isSelected: false },
    { name: "amazon", isSelected: false },
    { name: "google", isSelected: false },
    { name: "khaled", isSelected: false },
    { name: "kholod", isSelected: false }
  ]);
  const [valueS, setValueS] = React.useState([]);
  const [valueM, setValueM] = React.useState([]);


  // Lists of items for left and right containers
  const leftItems = [
    "Atlas MAX",
    "Avalanche HD6",
    "Presto MAX",
    "Storm HD6 Lite",
    "Avalanche HDK",
    "Allegro",
  ];

  const rightItems = [
    "Storm HD6",
    "Poly Pro",
    "Apollo",
    "Atlas",
    "Poly",
    "Presto",
  ];

  const discard = () => {
    setValueS([]);
  };

  const apply = () => {
    setFilter({
      s: valueS,
      c: valueC,
      m: [...leftItems.filter((_, index) => checkedLeft[index]), ...rightItems.filter((_, index) => checkedRight[index])]
    })

  };


  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await apiClient.get("/filters");
        setFilter(response.data);
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
      <Grid container spacing={2} gridRow={"auto"} sx={{ padding: "20px" }}>
        <Grid item xs={12}>
          <Typography variant="h6" style={{ marginBottom: "20px" }}>
            Machine Type
          </Typography>
          <Box sx={{ backgroundColor: "#FFFFFF", padding: "16px", borderRadius: "8px", border: "1px solid #d0d0d0" }}>
            <Grid container spacing={2} justifyContent="space-between">
              <Grid item xs={6}>
                <List disablePadding sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {leftItems.map((item, index) => (
                    <ListItem key={item} disableGutters sx={{ marginBottom: "8px", alignItems: "center", display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PrintIcon fontSize="small" sx={{ color: '#354052' }} />
                        <SettingsIcon fontSize="small" sx={{ color: '#354052', marginLeft: "-8px" }} />
                        <ListItemText
                          primary={item}
                          sx={{
                            margin: 0,
                            padding: 0,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontSize: '0.95rem',
                            marginLeft: "8px",
                            color: '#354052',
                            fontWeight: '900',
                          }}
                        />
                      </Box>
                      <Checkbox
                        checked={checkedLeft[index]}
                        onChange={() => {
                          const newChecked = [...checkedLeft];
                          newChecked[index] = !newChecked[index];
                          setCheckedLeft(newChecked);
                        }}
                        icon={<Box sx={{ width: 20, height: 20, bgcolor: "white", borderRadius: "4px", border: "1px solid #d0d0d0" }} />}
                        checkedIcon={<Box sx={{ width: 20, height: 20, bgcolor: "#007BFF", borderRadius: "4px" }} />}
                        sx={{
                          padding: 0,
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={6}>
                <List disablePadding sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {rightItems.map((item, index) => (
                    <ListItem key={item} disableGutters sx={{ marginBottom: "8px", alignItems: "center", display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PrintIcon fontSize="small" sx={{ color: '#354052' }} />
                        <SettingsIcon fontSize="small" sx={{ color: '#354052', marginLeft: "-8px" }} />
                        <ListItemText
                          primary={item}
                          sx={{
                            margin: 0,
                            padding: 0,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontSize: '0.95rem',
                            marginLeft: "8px",
                            color: '#354052',
                            fontWeight: '900', // Increased font weight to make the text thicker
                          }}
                        />
                      </Box>
                      <Checkbox
                        checked={checkedRight[index]}
                        onChange={() => {
                          const newChecked = [...checkedRight];
                          newChecked[index] = !newChecked[index];
                          setCheckedRight(newChecked);
                        }}
                        icon={<Box sx={{ width: 20, height: 20, bgcolor: "white", borderRadius: "4px", border: "1px solid #d0d0d0" }} />}
                        checkedIcon={<Box sx={{ width: 20, height: 20, bgcolor: "#007BFF", borderRadius: "4px" }} />}
                        sx={{
                          padding: 0,
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item container xs={12} spacing={3} style={{ marginTop: "20px" }}>
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

// what is this ? style tag injection maybe
      <style jsx global>{`
        /* Custom Scrollbar Styling */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>


      <div style={{ marginTop: '20px' }}>
        <Typography variant="h6">Filters Data:</Typography>
        {filter.length > 0 ? (
          <ul>
            {filter.map((filter, index) => (
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
