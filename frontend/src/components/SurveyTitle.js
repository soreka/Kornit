import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import NonResponderCard from './NonResponderCard';
import QuestionBox from './QuestionBox';

const SurveyTitle = ({ title, expandedSurveyType, onClick, array1, array2, nonResponders }) => {
    const [activeComponent, setActiveComponent] = useState(null);
    const [expandedBoxId, setExpandedBoxId] = useState(null);
    
    const handleButtonClick = (e, component) => {
        e.stopPropagation();
        setActiveComponent(prev => (prev === component ? null : component));
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
                                border: 'none',
                                backgroundColor: 'transparent'
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
                                border: 'none',
                                backgroundColor: 'transparent'
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
                            {array2.length > 0 ? (
                                array2.map((responder, index) => (
                                    <NonResponderCard
                                        key={index}
                                        name={responder}
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
                            {array1.length > 0 ? (
                                array1.map(question => (
                                    <QuestionBox
                                        key={question.boxId}
                                        question={question.question}
                                        percentage={question.answeredPercentage}
                                        content={question.question}
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
