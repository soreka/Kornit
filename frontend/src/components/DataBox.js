


// import { useState } from 'react';
// import { Box, Grid, Typography } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// import SurveyTitle from './SurveyTitle';
// import SurveyQuestions from './SurveyQuestions';

// const DataBox = ({ dataType, subDataType, mainDataValue, subDataValue, boxType, color, isExpanded, onExpand }) => {
//     const initialSizes = boxType === 'Big' ? { xs: 4, sm: 8, md: 8 } : { xs: 2, sm: 4, md: 4 };
//     const expandedSizes = { xs: 4, sm: 8, md: 8 };

//     const [boxColor] = useState(
//         color === 'primary' ? '#FFAB2B' :
//             color === 'secondary' ? '#1BB934' :
//                 '#FF4081'
//     );

//     const boxSizes = isExpanded ? expandedSizes : initialSizes;
//     const boxHeight = isExpanded ? '300px' : 'auto';
//     const [expandedSurveyType, setExpandedSurveyType] = useState(null); 

//     const handleSurveyTypeClick = (e, surveyType) => {
//         e.stopPropagation();
//         setExpandedSurveyType(prev => prev === surveyType ? null : surveyType);
//     };
//     const mockQuestions = [
//         {
//             boxId: '1',
//             question: 'How satisfied are you with our product?',
//             percentage: '85%',
//             content: 'The majority of our customers are very satisfied with the product, highlighting its quality and usability as key factors.'
//         },
//         {
//             boxId: '2',
//             question: 'How likely are you to recommend our service to others?',
//             percentage: '90%',
//             content: 'Most of our users would recommend our service to friends and family, citing our excellent customer support and reliability.'
//         },
//         {
//             boxId: '3',
//             question: 'What do you think about our customer service?',
//             percentage: '75%',
//             content: 'Many customers appreciate the prompt responses and helpfulness of our customer service team, though there are some suggestions for improvement.'
//         }];
//         const mockNonResponders = [
//             {
//                 name: 'John Doe',
//                 email: 'john.doe@example.com',
//                 phone_number: '123-456-7890',
//                 mobile_phone_number: '987-654-3210',
//             },
//             {
//                 name: 'Jane Smith',
//                 email: 'jane.smith@example.com',
//                 phone_number: '234-567-8901',
//                 mobile_phone_number: '876-543-2109',
//             },
//         ];
//     return (
//         <Grid item xs={boxSizes.xs} sm={boxSizes.sm} md={boxSizes.md}>
//             <Box
//                 className="dataBox"
//                 sx={{
//                     bgcolor: boxColor,
//                     height: isExpanded ? '325px' : '150px', 
//                     transition: 'height 0.3s ease', 
//                     cursor: 'pointer',
//                     overflow: 'hidden', 
//                 }}
//                 onClick={onExpand} 
//             >
//                 {!subDataType && <Typography variant='body1' className='dataType'>{dataType}</Typography>}
//                 {subDataType && <div className='dataTypeTitles'>
//                     <Typography variant='body1' className='dataType'>{dataType}</Typography>
//                     <Typography variant='body1' className='subDataType'>{subDataType}</Typography>
//                 </div>}
//                 {boxType === 'Big' && <Typography variant='h5' className='dataValue'>{mainDataValue}</Typography>}
//                 {boxType === 'Big' ?
//                     <div className='dataTarget'>
//                         <Typography variant='body1'>{subDataValue}</Typography>
//                         <Typography variant='body1'>of target</Typography>
//                     </div>
//                     : <div className='dataValue'>
//                         <Typography variant='h5' className='mainDataValue'>{mainDataValue}</Typography>
//                         {subDataValue && <Typography variant='h5' className='subDataValue'>{subDataValue}</Typography>}
//                     </div>
//                 }

//                 {isExpanded && (
//                     <Box
//                         sx={{
//                             maxHeight: '200px', 
//                             overflowY: 'auto', 
             
//                         }}
//                     >


//                         <SurveyTitle
//                             title='CFI'
//                             percentage='65%'
//                             expandedSurveyType={expandedSurveyType}
//                             onClick={(e) => handleSurveyTypeClick(e, 'CFI')}
//                             questions={mockQuestions}
//                             nonResponders={mockNonResponders}
                            
   
//                         />
//                         <SurveyTitle
//                             title='Service Call'
//                             percentage='65%'
//                             expandedSurveyType={expandedSurveyType}
//                             onClick={(e) => handleSurveyTypeClick(e, 'Service Call')}
//                             questions={mockQuestions}
//                             nonResponders={mockNonResponders}
//                         />
// {/* 
//                         {expandedSurveyType === 'Service Call' && (
//                             <SurveyQuestions title="Service Call Questions" color='green' />
//                         )} */}

//                         <SurveyTitle
//                             title='Post Installation'
//                             percentage='80%'
//                             expandedSurveyType={expandedSurveyType}
//                             onClick={(e) => handleSurveyTypeClick(e, 'Post Installation')}
//                             questions={mockQuestions}
//                             nonResponders={mockNonResponders}
//                         />
//                         {/* {expandedSurveyType === 'Post Installation' && (
//                             <SurveyQuestions title="Post Installation Questions" color='green' />
//                         )} */}

//                         <SurveyTitle
//                             title='Site Visit'
//                             percentage='90%'
//                             expandedSurveyType={expandedSurveyType}
//                             onClick={(e) => handleSurveyTypeClick(e, 'Site Visit')}
//                             questions={mockQuestions}
//                             nonResponders={mockNonResponders}
//                         />
//                         {/* {expandedSurveyType === 'Site Visit' && (
//                             <SurveyQuestions title="Site Visit Questions" color='green' />
//                         )} */}
//                     </Box>
//                 )}
//             </Box>
//         </Grid>
//     );
// };

// export default DataBox;
import { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import SurveyTitle from './SurveyTitle';
import SurveyQuestions from './SurveyQuestions';

const DataBox = ({ dataType, subDataType, mainDataValue, subDataValue, boxType, color, isExpanded, onExpand }) => {
    const initialSizes = boxType === 'Big' ? { xs: 4, sm: 8, md: 8 } : { xs: 2, sm: 4, md: 4 };
    const expandedSizes = { xs: 4, sm: 8, md: 8 };

    const boxSizes = isExpanded ? expandedSizes : initialSizes;
    const boxHeight = isExpanded ? '300px' : 'auto';
    const [expandedSurveyType, setExpandedSurveyType] = useState(null);

    const handleSurveyTypeClick = (e, surveyType) => {
        e.stopPropagation();
        setExpandedSurveyType(prev => prev === surveyType ? null : surveyType);
    };

    const mockQuestions = [
        { boxId: '1', question: 'How satisfied are you with our product?', percentage: '85%', content: 'The majority of our customers are very satisfied with the product, highlighting its quality and usability as key factors.' },
        { boxId: '2', question: 'How likely are you to recommend our service to others?', percentage: '30%', content: 'Most of our users would recommend our service to friends and family, citing our excellent customer support and reliability.' },
        { boxId: '3', question: 'What do you think about our customer service?', percentage: '55%', content: 'Many customers appreciate the prompt responses and helpfulness of our customer service team, though there are some suggestions for improvement.' }
    ];

    const mockNonResponders = [
        { name: 'John Doe', email: 'john.doe@example.com', phone_number: '123-456-7890', mobile_phone_number: '987-654-3210' },
        { name: 'Jane Smith', email: 'jane.smith@example.com', phone_number: '234-567-8901', mobile_phone_number: '876-543-2109' }
    ];

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
                {isExpanded && <div>
                    <Chart data={data} />
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
                            maxHeight: '200px',
                            overflowY: 'auto',
                        }}
                    >
                        <SurveyTitle
                            title='CFI'
                            percentage='65%'
                            expandedSurveyType={expandedSurveyType}
                            onClick={(e) => handleSurveyTypeClick(e, 'CFI')}
                            questions={mockQuestions}
                            nonResponders={mockNonResponders}
                        />
                        <SurveyTitle
                            title='Service Call'
                            percentage='65%'
                            expandedSurveyType={expandedSurveyType}
                            onClick={(e) => handleSurveyTypeClick(e, 'Service Call')}
                            questions={mockQuestions}
                            nonResponders={mockNonResponders}
                        />
                        <SurveyTitle
                            title='Post Installation'
                            percentage='80%'
                            expandedSurveyType={expandedSurveyType}
                            onClick={(e) => handleSurveyTypeClick(e, 'Post Installation')}
                            questions={mockQuestions}
                            nonResponders={mockNonResponders}
                        />
                        <SurveyTitle
                            title='Site Visit'
                            percentage='90%'
                            expandedSurveyType={expandedSurveyType}
                            onClick={(e) => handleSurveyTypeClick(e, 'Site Visit')}
                            questions={mockQuestions}
                            nonResponders={mockNonResponders}
                        />
                    </Box>
                )}
            </Box>
        </Grid>
    );
};

export default DataBox;
