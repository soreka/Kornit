import { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SurveyTitle from './SurveyTitle';
import SurveyQuestions from './SurveyQuestions';

const DataBox = ({ dataType, subDataType, mainDataValue, subDataValue, boxType, color, isExpanded, onExpand }) => {
    const initialSizes = boxType === 'Big' ? { xs: 4, sm: 8, md: 8 } : { xs: 2, sm: 4, md: 4 };
    const expandedSizes = { xs: 4, sm: 8, md: 8 };

    const [boxColor] = useState(
        color === 'primary' ? '#FFAB2B' :
            color === 'secondary' ? '#1BB934' :
                '#FF4081'
    );

    const boxSizes = isExpanded ? expandedSizes : initialSizes;

    const [expandedSurveyType, setExpandedSurveyType] = useState(null); // Track which survey type is expanded

    const handleSurveyTypeClick = (e, surveyType) => {
        e.stopPropagation(); // Prevent the event from reaching the parent Box
        setExpandedSurveyType(prev => prev === surveyType ? null : surveyType);
    };

    const handleSurveyContentClick = (e) => {
        e.stopPropagation(); // Prevent the event from bubbling up
    };

    return (
        <Grid item xs={boxSizes.xs} sm={boxSizes.sm} md={boxSizes.md}>
            <Box
                className="dataBox"
                sx={{
                    bgcolor: boxColor,
                    height: isExpanded ? '325px' : '150px', // Fixed height
                    transition: 'height 0.3s ease', // Smooth transition effect
                    cursor: 'pointer',
                    overflow: 'hidden', // Hide overflow for the main box
                }}
                onClick={onExpand} // This handles the card expand/collapse
            >
                {!subDataType && <Typography variant='body1' className='dataType'>{dataType}</Typography>}
                {subDataType && <div className='dataTypeTitles'>
                    <Typography variant='body1' className='dataType'>{dataType}</Typography>
                    <Typography variant='body1' className='subDataType'>{subDataType}</Typography>
                </div>}
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
                            maxHeight: '200px', // Set a fixed height for scrolling
                            overflowY: 'auto', // Enable vertical scrolling
                        }}
                    >
                        <SurveyTitle
                            title='CFI'
                            percentage='65%'
                            expandedSurveyType={expandedSurveyType}
                            onClick={(e) => handleSurveyTypeClick(e, 'CFI')}
                            handleSurveyContentClick={(e) => handleSurveyTypeClick(e, expandedSurveyType)

                             }
                        />
                        <SurveyTitle
                            title='Service Call'
                            percentage='70%'
                            expandedSurveyType={expandedSurveyType}
                            onClick={(e) => handleSurveyTypeClick(e, 'Service Call')}
                            handleSurveyContentClick={(e) => handleSurveyTypeClick(e, expandedSurveyType) }
                        />
                        <SurveyTitle
                            title='Post Installation'
                            percentage='80%'
                            expandedSurveyType={expandedSurveyType}
                            onClick={(e) => handleSurveyTypeClick(e, 'Post Installation')}
                            handleSurveyContentClick={(e) => handleSurveyTypeClick(e, expandedSurveyType) }
                        />
                        <SurveyTitle
                            title='Site Visit'
                            percentage='90%'
                            expandedSurveyType={expandedSurveyType}
                            onClick={(e) => handleSurveyTypeClick(e, 'Site Visit')}
                            handleSurveyContentClick={(e) => handleSurveyTypeClick(e, expandedSurveyType) }
                        />


                        {expandedSurveyType === 'CFI' && (
                            <SurveyQuestions title="CFI Questions" color='green'/>
                        )}
                        {expandedSurveyType === 'Service Call' && (
                            <SurveyQuestions title="Service Call Questions" color='green' />
                        )}
                        {expandedSurveyType === 'Post Installation' && (
                            <SurveyQuestions title="Post Installation Questions" color='green' />
                        )}
                        {expandedSurveyType === 'Site Visit' && (
                            <SurveyQuestions title="Site Visit Questions" color='green' />
                        )}
                    </Box>
                )}
            </Box>
        </Grid>
    );
};

export default DataBox;