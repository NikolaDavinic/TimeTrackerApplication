import { Box, Stack, TextField } from "@mui/material";

const Home = () => {
  return (
    <Box className="h-full">
      <Box>
        <Box
          sx={{
            p: "1em",
          }}
        >
          <Stack
            sx={{
              border: "1px solid black",
              p: "1em",
            }}
          >
            <Box>
              <Box>
                {/* FIRST TWO INPUTS */}
                <Box>
                  <TextField type="text" label="What are you working on?" />
                  <TextField type="text" label="What are you working on?" />
                </Box>
                {/* SECOND PART OF FILTER */}
                <Box>
                  <Box>
                    {/* TAGS */}
                    <Box></Box>
                    {/* TIMER AND BUTTON */}
                    <Box>
                      {/* TIMER */}
                      <Box></Box>

                      {/* BUTTON */}
                      <Box></Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Box>
        <Box></Box>
      </Box>
      <Stack></Stack>
    </Box>
  );
};

export default Home;
