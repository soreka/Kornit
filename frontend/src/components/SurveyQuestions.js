
import { Box, Typography } from '@mui/material';

const SurveyQuestions = ({ title, color }) => {
    const handleSurveyContentClick = (e) => {
        e.stopPropagation();
    }

    return (
        <>
        <Box className="question-box" onClick={(e) => handleSurveyContentClick(e)}>
            <Typography sx={{ bgcolor: color, p: 1, mb: 1 }}>{title} content goes here...</Typography>
            <Typography sx={{ bgcolor: color, p: 1, mb: 1 }}>{title} content goes here...</Typography>
            <Typography sx={{ bgcolor: color, p: 1 }}>{title} content goes here...</Typography>
        </Box>

        </>
    );
};

export default SurveyQuestions;