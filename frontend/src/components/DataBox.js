import { useState } from 'react';
import { Box, Grid, Autocomplete, TextField, Button, Typography } from '@mui/material';


const DataBox = ({ dataType, subDataType, mainDataValue, subDataValue, boxType, color }) => {
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
            <Box className="dataBox" sx={{ bgcolor: boxColor }}>
                {!subDataType && <Typography variant='p' className='dataType'>{dataType}</Typography>}
                {subDataType && <div className='dataTypeTitels'>
                    <Typography variant='p' className='dataType'>{dataType}</Typography>
                    <Typography variant='p' className='subDataType'>{subDataType}</Typography>
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