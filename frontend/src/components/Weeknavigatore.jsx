import React, { useState } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { IconButton, Typography } from "@mui/material";
import { format, addWeeks, startOfWeek, endOfWeek } from "date-fns";

const WeekNavigator = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const handlePrevWeek = () => {
    setCurrentWeek((prev) => addWeeks(prev, -1));
  };

  const handleNextWeek = () => {
    setCurrentWeek((prev) => addWeeks(prev, 1));
  };

  const weekNumber = Math.ceil(
    (currentWeek - new Date(currentWeek.getFullYear(), 0, 1)) /
      (7 * 24 * 60 * 60 * 1000)
  );
  const startOfWeekDate = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const endOfWeekDate = endOfWeek(currentWeek, { weekStartsOn: 1 });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconButton onClick={handlePrevWeek}>
        <ArrowLeftIcon />
      </IconButton>
      <div style={{ textAlign: "center", padding: "0 16px" }}>
        <Typography variant="subtitle1">Week {weekNumber}</Typography>
        <Typography variant="body2">
          {format(startOfWeekDate, "dd/MM")} - {format(endOfWeekDate, "dd/MM")}
        </Typography>
      </div>
      <IconButton onClick={handleNextWeek}>
        <ArrowRightIcon />
      </IconButton>
    </div>
  );
};

export default WeekNavigator;
