// import React from 'react';
// import { Grid, Typography } from '@mui/material';

// function QuestionBox({ question, percentage, content, boxId, expandedBoxId, handleExpand }) {
//     const isExpanded = expandedBoxId === boxId;

//     return (
//         <Grid item xs={12}
//             onClick={() => handleExpand(boxId)}
//             sx={{
//                 backgroundColor: isExpanded ? '#1BB934' : '#4CAF50',
//                 justifyContent: "space-between",
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 padding: '2%',
//                 boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
//                 display: 'flex',
//                 transition: 'all 0.3s ease-in-out',
//                 cursor: 'pointer',
//                 height: isExpanded ? 'auto' : '45px',
//                 overflow: 'hidden',
//             }}>
//             <Grid container sx={{ justifyContent: 'space-between', width: '100%', flexDirection: 'row', display: 'flex', }}>
//                 <Grid sx={{width:'80%'}}>
//                     <Typography variant='h6' sx={{ color: '#354450', textAlign: 'left', flexGrow: 1 }}>
//                         {question}
//                     </Typography>
//                 </Grid>
//                 <Typography variant='h6' sx={{ 
//                     color: 'black', 
//                 }}>
//                     {percentage}
//                 </Typography>
//             </Grid>
//             {isExpanded && (
//                 <Typography variant='body1' sx={{ color: '#354450', marginTop: 2, textAlign: 'left', width: '100%' }}>
//                     {content}
//                 </Typography>
//             )}
//         </Grid>
//     );
// }

// export default QuestionBox;
import React from 'react';
import { Grid, Typography } from '@mui/material';

function QuestionBox({ question, percentage, content, boxId, expandedBoxId, handleExpand }) {
    const isExpanded = expandedBoxId === boxId;

    const handleClick = (e) => {
        e.stopPropagation(); 
        handleExpand(boxId); 
    };
    const percentageValue = parseFloat(percentage);

    let backgroundColor;
    if (percentageValue > 70) {
        backgroundColor = '#1BB934'; // Green
    } else if (percentageValue >= 40) {
        backgroundColor = '#FFAB2B'; // Orange
    } else {
        backgroundColor = '#FF4081'; // Pink
    }
    return (
        <Grid 
            item 
            xs={12}
            onClick={handleClick}
            sx={{
                backgroundColor: {backgroundColor},
                justifyContent: "space-between",
                flexDirection: 'column',
                alignItems: 'center',
                padding: '2%',
                boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.2)`,
                display: 'flex',
                transition: 'all 0.3s ease-in-out',
                cursor: 'pointer',
                height: isExpanded ? 'auto' : '45px',
                overflow: 'hidden',
                marginBottom: '10px', // Add space below each box
            }}
        >
            <Grid 
                container 
                sx={{ 
                    justifyContent: 'space-between', 
                    width: '100%', 
                    flexDirection: 'row', 
                    display: 'flex'
                }}
            >
                <Grid sx={{ width: '80%' }}>
                    <Typography 
                        variant='h6' 
                        sx={{ 
                            color: '#354450', 
                            textAlign: 'left', 
                            flexGrow: 1 
                        }}
                    >
                        {question}
                    </Typography>
                </Grid>
                <Typography 
                    variant='h6' 
                    sx={{ 
                        color: '#000', 
                        textAlign: 'right', 
                        width: '20%'
                    }}
                >
                    {percentage}
                </Typography>
            </Grid>
            {isExpanded && (
                <Typography 
                    variant='body1' 
                    sx={{ 
                        color: '#354450', 
                        marginTop: 2, 
                        textAlign: 'left', 
                        width: '100%' 
                    }}
                >
                    {content}
                </Typography>
            )}
        </Grid>
    );
}

export default QuestionBox;
