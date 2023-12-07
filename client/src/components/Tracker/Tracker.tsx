import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { TimeModel } from "../../models/time.model";

type TrackerProps = {
  listOfMeasurements: Array<TimeModel>;
  setListOfMeasurements: (e) => void;
  text: string;
  setText: (e) => void;
  selectedProject: string;
  setSelectedProject: (e) => void;
  selectedTag: string;
  setSelectedTag: (e) => void;
  timer: number;
  setTimer: (e) => void;
  isTimerRunning: boolean;
  setIsTimerRunning: (e) => void;
};

const Tracker = (props: TrackerProps) => {
  useEffect(() => {
    let intervalId: number;

    if (props.isTimerRunning) {
      intervalId = setInterval(() => {
        props.setTimer((prevTimer: number) => prevTimer + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isTimerRunning]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleStartStop = () => {
    props.setIsTimerRunning(!props.isTimerRunning);

    if (!props.isTimerRunning) {
      props.setTimer(0); // Reset timer when starting
    }
  };

  return (
    <Box sx={{ display: "flex", borderBottom: "1px solid black" }}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          margin: "20px",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid gray",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          width="100%"
          flexWrap="wrap"
        >
          <TextField
            label="What are you working on?"
            variant="outlined"
            value={props.text}
            onChange={(e) => props.setText(e.target.value)}
            style={{ marginRight: 16, flex: 4 }}
          />

          <FormControl variant="outlined" style={{ marginRight: 16, flex: 1 }}>
            <InputLabel id="project-label">Project</InputLabel>
            <Select
              labelId="project-label"
              id="project"
              value={props.selectedProject}
              onChange={(e) => props.setSelectedProject(e.target.value)}
              label="Project"
            >
              <MenuItem value="project1">Project 1</MenuItem>
              <MenuItem value="project2">Project 2</MenuItem>
              {/* Add more projects as needed */}
            </Select>
          </FormControl>

          <FormControl variant="outlined" style={{ marginRight: 16, flex: 1 }}>
            <InputLabel id="tag-label">Tag</InputLabel>
            <Select
              labelId="tag-label"
              id="tag"
              value={props.selectedTag}
              onChange={(e) => props.setSelectedTag(e.target.value)}
              label="Tag"
            >
              <MenuItem value="tag1">Tag 1</MenuItem>
              <MenuItem value="tag2">Tag 2</MenuItem>
              {/* Add more tags as needed */}
            </Select>
          </FormControl>

          <Box
            style={{
              marginLeft: "2vh",
              marginRight: "2vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "30px",
            }}
          >
            <strong>{formatTime(props.timer)}</strong>
          </Box>

          <Button variant="contained" color="primary" onClick={handleStartStop}>
            {props.isTimerRunning ? "Stop Timer" : "Start Timer"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Tracker;
