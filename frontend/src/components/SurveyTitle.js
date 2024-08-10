import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import NonResponderCard from './NonResponderCard'; // Import the NonResponderCard component
import QuestionBox from './QuestionBox'; // Import the QuestionBox component

const SurveyTitle = ({ title, expandedSurveyType, onClick, questions, nonResponders }) => {
    const [activeComponent, setActiveComponent] = useState(null); // Track which component to display
    const [expandedBoxId, setExpandedBoxId] = useState(null);

    const handleButtonClick = (e, component) => {
        e.stopPropagation(); // Prevent the event from reaching the parent component
        setActiveComponent(prev => (prev === component ? null : component)); // Toggle the display of components
    };

    const handleExpand = (boxId) => {
        setExpandedBoxId(prevId => (prevId === boxId ? null : boxId));
    };

    return (
        <div className='surveyType' onClick={onClick}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6">{title}</Typography>
                {expandedSurveyType === title && (
                    <Box display="flex" alignItems="center">
                        <Button
                            onClick={(e) => handleButtonClick(e, 'Nonresponders')}
                            sx={{ 
                                color: activeComponent === 'Nonresponders' ? '#4860C1' : '#354052',
                                textTransform: 'none',
                                fontSize: 'small',
                                padding: 0,
                                minWidth: 'auto',
                                mr: 2,
                                border: 'none', // Remove border
                                backgroundColor: 'transparent' // Ensure background is transparent
                            }}
                        >
                            Non-responders
                        </Button>
                        <Button
                            onClick={(e) => handleButtonClick(e, 'Questions')}
                            sx={{ 
                                color: activeComponent === 'Questions' ? '#4860C1' : '#354052',
                                textTransform: 'none',
                                fontSize: 'small',
                                padding: 0,
                                minWidth: 'auto',
                                border: 'none', // Remove border
                                backgroundColor: 'transparent' // Ensure background is transparent
                            }}
                        >
                            Questions
                        </Button>
                    </Box>
                )}
                {expandedSurveyType === title ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>

            {expandedSurveyType === title && (
                <Box>
                    {activeComponent === 'Nonresponders' && (
                        <Box>
                            {nonResponders.length > 0 ? (
                                nonResponders.map((responder, index) => (
                                    <NonResponderCard 
                                        key={index}
                                        name={responder.name}
                                        email={responder.email}
                                        phone_number={responder.phone_number}
                                        mobile_phone_number={responder.mobile_phone_number}
                                    />
                                ))
                            ) : (
                                <Typography>No non-responders available</Typography>
                            )}
                        </Box>
                    )}

                    {activeComponent === 'Questions' && (
                        <Box>
                            {questions.length > 0 ? (
                                questions.map(question => (
                                    <QuestionBox 
                                        key={question.boxId}
                                        question={question.question}
                                        percentage={question.percentage}
                                        content={question.content}
                                        boxId={question.boxId}
                                        expandedBoxId={expandedBoxId}
                                        handleExpand={handleExpand} 
                                    />
                                ))
                            ) : (
                                <Typography>No questions available</Typography>
                            )}
                        </Box>
                    )}
                </Box>
            )}
        </div>
    );
};

export default SurveyTitle;
