import { Box, Button, Grid, LinearProgress, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const onSubmit = () => {
  console.log("Submited form and logged user");
};

const SingIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        p: "1em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        component="form"
        onSubmit={onSubmit}
        sx={{
          display: "flex",
          gap: "0.8em",
          width: { xs: "100%", sm: "80%" },
          maxWidth: "600px",
        }}
      >
        <TextField label="Email" className="form-field" type="email" />
        <TextField label="Password" className="form-field" type="password" />
        <Button variant="contained" sx={{ p: 1.2 }} type="submit">
          Login
        </Button>
        {isLoading && <LinearProgress></LinearProgress>}
        <Grid className="flex-end">
          <Box>
            You don't have account? <Link to="/">Sing up</Link>
          </Box>
        </Grid>
      </Stack>
    </Box>
  );
};

export default SingIn;
