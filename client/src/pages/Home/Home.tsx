import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Tracker from "../../components/Tracker/Tracker";
import { TimeModel } from "../../models/time.model";
import MeasuredTimeCard from "../../components/TimeList/TimeList";

const Home = () => {
  const [text, setText] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

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

  const [listOfMeasurements, setListOfMeasurements] = useState<
    Array<TimeModel>
  >([
    {
      id: 1,
      projectName: "Hello there",
      tag: "Tag1",
      time: formatTime(5),
    },
    {
      id: 2,
      projectName: "Hello there2",
      tag: "Tag2",
      time: formatTime(5),
    },
    {
      id: 3,
      projectName: "Hello there3",
      tag: "Tag3",
      time: formatTime(5),
    },
    {
      id: 3,
      projectName: "Hello there3",
      tag: "Tag3",
      time: formatTime(5),
    },
    {
      id: 3,
      projectName: "Hello there3",
      tag: "Tag3",
      time: formatTime(5),
    },
  ]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Tracker
          listOfMeasurements={listOfMeasurements}
          setListOfMeasurements={setListOfMeasurements}
          text={text}
          setText={setText}
          isTimerRunning={isTimerRunning}
          setIsTimerRunning={setIsTimerRunning}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          timer={timer}
          setTimer={setTimer}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {listOfMeasurements.map((el: TimeModel) => {
          return (
            <MeasuredTimeCard
              key={el.id}
              id={el.id}
              projectName={el.projectName}
              date={el.date}
              tag={el.tag}
              time={el.time}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Home;
