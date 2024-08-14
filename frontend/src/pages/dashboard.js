import '@fontsource/roboto/500.css';
import { Box, Grid, Autocomplete, TextField, Button, Typography, Alert, CircularProgress, Container } from '@mui/material';
import '../assets/styles/dashboard.css';
import { useMemo, useState, useEffect } from 'react';
import filterImg from '../assets/images/dashboard/filter.png';
import DataBoxSurvey from '../components/DataBoxSurvey';
import DataBoxPerformance from '../components/DataBoxPerformance';

import { useNavigate } from "react-router-dom";
import apiClient from './apiClient';

function DashBoard({ filter, setFilter }) {
    useMemo(() => {
        sessionStorage.setItem('filters', JSON.stringify(filter));
        console.log(filter);
    }, [filter]);

    console.log('rendered');

    const navigate = useNavigate();

    const [client, setClient] = useState('Mohamad');
    const [region, setRegion] = useState('USA');
    const [expanded, setExpanded] = useState(false);
    const [clickedDate, setClickedDate] = useState("Year");

    const [expandedBoxId, setExpandedBoxId] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);
    const [surveyData, setSurveyData] = useState(null);

    const handleExpand = (boxId) => {
        setExpandedBoxId(prevId => (prevId === boxId ? null : boxId));
    };

    const onDateChange = (date) => {
        setClickedDate(date);
    };

    useEffect(() => {
        setFilter(JSON.parse(sessionStorage.getItem('filters') ?? '{}'));
        console.log(JSON.stringify({
            "SelectedFilters": {
                "timeFilter": "YeartoDate",
                "regions": filter?.s?.map((value) => value.title),
                "clientNames": filter?.c?.filter(value => value.isSelected).map((value) => value.name),
                "machineTypes": filter?.m
            }
        }));
        const fetchDashboardData = async () => {
            try {
                const response = await apiClient.post('/dashboard-data', {

                    "SelectedFilters": {
                        "timeFilter": "YeartoDate",
                        "regions": filter?.s?.map((value) => value.title) ?? [],
                        "clientNames": filter?.c?.filter(value => value.isSelected).map((value) => value.name) ?? [],
                        "machineTypes": filter?.m ?? []
                    }

                });


                setDashboardData(response.data);
                console.log("Dashboard data:", response.data);

            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, []);

    useEffect(() => {
        const fetchSurveyData = async () => {
            try {
                const response = await apiClient.post('/dashboard-surveys');
                setSurveyData(response.data.data.surveys);
                console.log("Survey data:", response.data.data.surveys);

            } catch (error) {
                console.error('Error fetching survey data:', error);
            }
        };

        fetchSurveyData();
    }, []);
    if (dashboardData == null) return (
        <Container
            sx={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}
        >
            < CircularProgress color="inherit" />
        </Container>
    )
    return (

        <div className='dashboard'>
            <Grid container className='mt-0' spacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={1.8} sm={4} md={6}>
                    <TextField label="Client" className='dataFilter' disabled value={client} />
                </Grid>
                <Grid item xs={1.2} sm={2} md={3}>
                    <TextField label="Region" className='dataFilter' disabled value={region} />
                </Grid>
                <Grid item xs={1} sm={2} md={3}>
                    <Button className='dataFilter filterBT' variant='outlined' onClick={() => navigate('/filter')}>
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            Filter
                            <img
                                src={filterImg}
                                alt="filter"
                                style={{ paddingLeft: '8px', order: 999, width: '18px', height: '18px' }}
                                className="myIcon"
                            />
                        </span>
                    </Button>
                </Grid>
            </Grid>
            <Grid container className='mt-0 datesBox'>
                <div className='chooseDate'>
                    <Button variant="text" onClick={() => onDateChange("Week")}
                        className={clickedDate === "Week" ? "clickedDate" : ''}
                    >Last Week</Button>
                    <Button variant="text" onClick={() => onDateChange("Month")}
                        className={clickedDate === "Month" ? "clickedDate" : ''}
                    >Last Month</Button>
                    <Button variant="text" onClick={() => onDateChange("Year")}
                        className={clickedDate === "Year" ? "clickedDate" : ''}
                    >Year to date</Button>
                    <Button variant="text" onClick={() => onDateChange("Custom")}
                        className={clickedDate === "Custom" ? "clickedDate" : ''}
                    >Custom</Button>
                </div>
                <div className='chooseWeek'>
                    <div className='right-arrow' />
                    <div className='currentWeek'>
                        <Typography variant='p'>Week 29</Typography>
                        <Typography variant='p'>10/07 - 14/07</Typography>
                    </div>
                    <div className='left-arrow' />
                </div>
            </Grid >
            <Grid container className='mt-0'>
                <Grid container spacing={1} rowGap={2} columns={{ xs: 4, sm: 8, md: 12 }} className='mt-0'>
                    <Grid item xs={4} sm={8} md={12}>
                        <Typography variant='h6' className='dataTitle'>Performance</Typography>
                    </Grid>

                    {surveyData && surveyData.cfi.questions.map((survey, index) => (
                        <DataBoxSurvey key={index}
                            dataType={survey.question}
                            mainDataValue={survey.answer}
                            boxType='Small'
                            color='primary'
                            isExpanded={expandedBoxId === index}
                            onExpand={() => handleExpand(index)} />
                    ))}

                    <DataBoxSurvey dataType='Impression growth' mainDataValue='20%' subDataValue='+10pp' boxType='Small' color='secondary' isExpanded={expandedBoxId === 2}
                        onExpand={() => handleExpand(2)} />
                    <DataBoxSurvey dataType='Impression printed' mainDataValue='2.5M' subDataValue='+300k' boxType='Small' color='secondary' isExpanded={expandedBoxId === 3}
                        onExpand={() => handleExpand(3)} />
                    <DataBoxSurvey dataType='Handling time' subDataType='Seconds' mainDataValue='25' subDataValue='+3' boxType='Small' color='primary' isExpanded={expandedBoxId === 4}
                        onExpand={() => handleExpand(4)} />
                    <DataBoxSurvey dataType='Utilization' mainDataValue='33%' subDataValue='-10pp' boxType='Small' color='other' isExpanded={expandedBoxId === 5}
                        onExpand={() => handleExpand(5)} />
                </Grid>
            </Grid>
            <Grid container className='mt-0'>
                <Grid container spacing={1} rowGap={2} columns={{ xs: 4, sm: 8, md: 12 }} className='mt-0'>
                    <Grid item xs={4} sm={8} md={12}>
                        <Typography variant='h6' className='dataTitle'>Performance</Typography>
                    </Grid>
                    <DataBoxPerformance dataType='Impression vs. target' mainDataValue={dashboardData && dashboardData.totalImpressions} subDataValue='65%' boxType='Big' color='primary' handleClick={() => setExpanded(!expanded)} isExpanded={expanded} data={dashboardData && dashboardData.chartData} />
                    <DataBoxPerformance dataType='Impression growth' mainDataValue='20%' subDataValue='+10pp' boxType='Small' color='secondary' />
                    <DataBoxPerformance dataType='Impression printed' mainDataValue='2.5M' subDataValue='+300k' boxType='Small' color='secondary' />
                    <DataBoxPerformance dataType='Handling time' subDataType='Seconds' mainDataValue='25' subDataValue='+3' boxType='Small' color='primary' />
                    <DataBoxPerformance dataType='Utilization' mainDataValue='33%' subDataValue='-10pp' boxType='Small' color='other' />
                </Grid>
            </Grid>

        </div >
    )
}

export default DashBoard;
