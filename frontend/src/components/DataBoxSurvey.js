import { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import SurveyTitle from './SurveyTitle';
import Chart from './Chart';

const DataBoxSurvey = ({ dataType, subDataType, mainDataValue, title1, title2, surveys, subDataValue, boxType, color, isExpanded, onExpand }) => {

    const initialSizes = boxType === 'Big' ? { xs: 4, sm: 8, md: 8 } : { xs: 2, sm: 4, md: 4 };
    const expandedSizes = { xs: 4, sm: 8, md: 8 };

    const boxSizes = isExpanded ? expandedSizes : initialSizes;
    const [expandedSurveyType, setExpandedSurveyType] = useState(null);
    const [data, setData] = useState([]);

    const handleSurveyTypeClick = (e, surveyType) => {
        e.stopPropagation();
        setExpandedSurveyType(prev => prev === surveyType ? null : surveyType);
    };

    return (
        <Grid item xs={boxSizes.xs} sm={boxSizes.sm} md={boxSizes.md}>
            <Box
                className="dataBox"
                sx={{
                    bgcolor: color === 'primary' ? '#FFAB2B' :
                        color === 'secondary' ? '#1BB934' :
                            '#FF4081',
                    height: isExpanded ? '325px' : '150px',
                    transition: 'height 0.3s ease',
                    cursor: 'pointer',
                    overflow: 'hidden'
                }}
                onClick={onExpand}
            >
                {!subDataType && <Typography variant='body1' className='dataType'>{dataType}</Typography>}
                {subDataType && <div className='dataTypeTitles'>
                    <Typography variant='body1' className='dataType'>{dataType}</Typography>
                    <Typography variant='body1' className='subDataType'>{subDataType}</Typography>
                </div>}

                {isExpanded && (
                    <div>
                        <Chart data={data} />
                    </div>
                )}

                {boxType === 'Big' && <Typography variant='h5' className='dataValue'>{mainDataValue}</Typography>}
                {boxType === 'Big' ?
                    <div className='dataTarget'>
                        <Typography variant='body1'>{subDataValue}</Typography>
                        <Typography variant='body1'>of target</Typography>
                    </div>
                    : <div className='dataValue'>
                        <Typography variant='h5' className='mainDataValue'>{mainDataValue}</Typography>
                        {subDataValue && <Typography variant='h5' className='subDataValue'>{subDataValue}</Typography>}
                    </div>
                }

                {isExpanded && (
                    <Box
                        sx={{
                            maxHeight: '200px',
                            overflowY: 'auto',
                        }}
                    >
                        <SurveyTitle
                            title='CFI'
                            percentage='65%'
                            expandedSurveyType={expandedSurveyType}
                            onClick={(e) => handleSurveyTypeClick(e, 'CFI')}
                            questions={title1}
                            nonResponders={title2}
                            array1={surveys["cfi"].array1}
                            array2={surveys["cfi"].array2} />

                        <SurveyTitle
                            title='Service Call'
                            percentage='65%'
                            expandedSurveyType={expandedSurveyType}
                            onClick={(e) => handleSurveyTypeClick(e, 'Service Call')}
                            questions={title1}
                            array1={surveys["service_calls"].array1}
                            array2={surveys["service_calls"].array2}
                            nonResponders={title2}
                        />
                        <SurveyTitle
                            title='Post Installation'
                            percentage='80%'
                            expandedSurveyType={expandedSurveyType}
                            onClick={(e) => handleSurveyTypeClick(e, 'Post Installation')}
                            questions={title1}
                            array1={surveys["machinetype_post_installation"].array1}
                            array2={surveys["machinetype_post_installation"].array2}
                            nonResponders={title2}
                        />
                        <SurveyTitle
                            title='Site Visit'
                            percentage='90%'
                            expandedSurveyType={expandedSurveyType}
                            onClick={(e) => handleSurveyTypeClick(e, 'Site Visit')}
                            questions={title1}
                            array1={surveys['maintainence'].array1}
                            array2={surveys['maintainence'].array2}
                            nonResponders={title2}
                        />
                    </Box>
                )}
            </Box>
        </Grid>
    );
};

export default DataBoxSurvey;
