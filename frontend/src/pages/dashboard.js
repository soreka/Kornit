import '@fontsource/roboto/500.css';
import { Box, Grid, Autocomplete, TextField, Button, Typography, Alert } from '@mui/material';
import '../assets/styles/dashboard.css'
import { useMemo, useState } from 'react';
import filterImg from '../assets/images/dashboard/filter.png'
import DataBox from '../components/DataBox';
import { useNavigate } from "react-router-dom";

function DashBoard({ filter }) {
    useMemo(() => {
        console.log(filter)
    }, [filter])
    console.log('rendered')
    const navigate = useNavigate();
    const [chartData, setChartData] = useState([
        { value: 100, maxValue: 200, minValue: 0, Title: 'performace' },
        { value: 50, maxValue: 120, minValue: 10, Title: 'speed' },
        { value: 0, maxValue: 100, minValue: 0, Title: 'time' },
        { value: 20, maxValue: 100, minValue: 0, Title: 'delay' },
        { value: 70, maxValue: 100, minValue: 0, Title: 'bugs' }
    ]);
    const [client, setClient] = useState('Mohamad')
    const [region, setRegion] = useState('USA')
    const [expanded, setExpanded] = useState(false);
    const [clickedDate, setClickedDate] = useState("Year")
    const onDateChange = (date) => {
        setClickedDate(date);
    }
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
                    <Button className='dataFilter filterBT' variant='outlined' onClick={() => navigate('/filter')}><span style={{ display: 'flex', alignItems: 'center' }} onClick={() => navigate('/filter')}>
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
                    <Button variant="text" onClick={() => onDateChange("Year")}
                        className={clickedDate === "Year" ? "clickedDate" : ''}
                    >Year to date</Button>
                    <Button variant="text" onClick={() => onDateChange("Month")}
                        className={clickedDate === "Month" ? "clickedDate" : ''}
                    >Month</Button>
                    <Button variant="text" onClick={() => onDateChange("Week")}
                        className={clickedDate === "Week" ? "clickedDate" : ''}
                    >Last Week</Button>
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
                    <DataBox dataType='Impression vs. target' mainDataValue='-16K' subDataValue='65%' boxType='Big' color='primary' handleClick={() => setExpanded(!expanded)} isExpanded={expanded} data={chartData} />
                    <DataBox dataType='Impression growth' mainDataValue='20%' subDataValue='+10pp' boxType='Small' color='secondary' />
                    <DataBox dataType='Impression printed' mainDataValue='2.5M' subDataValue='+300k' boxType='Small' color='secondary' />
                    <DataBox dataType='Handling time' subDataType='Seconds' mainDataValue='25' subDataValue='+3' boxType='Small' color='primary' />
                    <DataBox dataType='Utilization' mainDataValue='33%' subDataValue='-10pp' boxType='Small' color='other' />
                </Grid>
            </Grid>
        </div >
    )
}

export default DashBoard