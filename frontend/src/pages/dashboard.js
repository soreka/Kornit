import '@fontsource/roboto/500.css';
import { Box, Grid, Autocomplete, TextField, Button, Typography } from '@mui/material';
import '../assets/styles/dashboard.css'
import { useState } from 'react';
import filterImg from '../assets/images/dashboard/filter.png'
import DataBox from '../components/DataBox';

function DashBoard() {
    const [client, setClient] = useState('Mohamad')
    const [region, setRegion] = useState('USA')
    const [clickedDate, setClickedDate] = useState("Year")

    const [expandedBoxId, setExpandedBoxId] = useState(null);


const handleExpand = (boxId) => {
    setExpandedBoxId(prevId => (prevId === boxId ? null : boxId));
};
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
                    <Button className='dataFilter filterBT' variant='outlined'><span style={{ display: 'flex', alignItems: 'center' }}>
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
                    
                    <DataBox dataType='Impression vs. target'
                     mainDataValue='-16K' 
                     subDataValue='65%'
                      boxType='Big' 
                      color='primary'
                    isExpanded={expandedBoxId === 1}
                    onExpand={() => handleExpand(1)}/>
           
                    <DataBox dataType='Impression growth' mainDataValue='20%' subDataValue='+10pp' boxType='Small' color='secondary' isExpanded={expandedBoxId === 2}
                        onExpand={() => handleExpand(2)}/>
                    <DataBox dataType='Impression printed' mainDataValue='2.5M' subDataValue='+300k' boxType='Small' color='secondary' isExpanded={expandedBoxId === 3}
                        onExpand={() => handleExpand(3)}/>
                    <DataBox dataType='Handling time' subDataType='Seconds' mainDataValue='25' subDataValue='+3' boxType='Small' color='primary' isExpanded={expandedBoxId === 4}
                        onExpand={() => handleExpand(4)}/>
                    <DataBox dataType='Utilization' mainDataValue='33%' subDataValue='-10pp' boxType='Small' color='other'  isExpanded={expandedBoxId === 5}
                        onExpand={() => handleExpand(5)}/>
                </Grid>
            </Grid>
        </div >
    )
}

export default DashBoard;
