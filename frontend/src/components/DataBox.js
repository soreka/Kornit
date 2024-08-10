import { useState } from 'react';
import { Box, Grid, Autocomplete, TextField, Button, Typography } from '@mui/material';
import Chart from './Chart';

const DataBox = ({ dataType, subDataType, mainDataValue, subDataValue, boxType, color, handleClick, isExpanded, data }) => {
    const [boxSizes, setBoxSizes] = useState(
        boxType === 'Big' ? { xs: 4, sm: 8, md: 8 } :
            { xs: 2, sm: 4, md: 4 }
    );
    const [boxColor, setBoxColor] = useState(
        color === 'primary' ? '#FFAB2B' :
            color === 'secondary' ? '#1BB934' :
                '#FF4081'
    );
    return (
        <Grid item xs={boxSizes.xs} sm={boxSizes.sm} md={boxSizes.md}>
            <Box className={`dataBox ${isExpanded ? 'expanded' : ''}`} sx={{ bgcolor: boxColor }} onClick={handleClick} >
                {!subDataType && <Typography variant='p' className='dataType'>{dataType}</Typography>}
                {isExpanded && <div className='expandedInfo'>
                    <Typography variant='p'>{dataType}</Typography>
                    <Typography variant='h5'>{mainDataValue}</Typography>
                </div>}
                {subDataType && <div className='dataTypeTitels'>
                    <Typography variant='p' className='dataType'>{dataType}</Typography>
                    <Typography variant='p' className='subDataType'>{subDataType}</Typography>
                </div>}
                {isExpanded && <div>
                    <Chart data={data} />
                </div>}
                {boxType === 'Big' && <Typography variant='h5' className='dataValue'>{mainDataValue}</Typography>}
                {boxType === 'Big' ?
                    <div className='dataTarget'>
                        <Typography variant='p'>{subDataValue}</Typography>
                        <Typography variant='p'>of target</Typography>
                    </div>
                    : <div className='dataValue'>
                        <Typography variant='h5' className='mainDataValue'>{mainDataValue}</Typography>
                        {subDataValue && <Typography variant='h5' className='subDataValue'>{subDataValue}</Typography>}
                    </div>
                }
            </Box>
        </Grid>
    )
}

export default DataBox;