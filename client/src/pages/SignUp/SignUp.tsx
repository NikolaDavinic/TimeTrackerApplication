import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Stack,
  TextField,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

interface FormInputs {
  email: string;
  password: string;
  repeatPassword: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormInputs>({
    reValidateMode: "onChange",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = (data: FormInputs) => {
    setIsLoading(true);

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  };

  const repeatPasswordValidator = useCallback(
    (value: string) => getValues("password") === value,
    [getValues]
  );

  return (
    <Box
        sx={{
            height: '100%',
            p: '1em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}
    >
      <Stack
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        sx={{
            display: 'flex',
            gap: '0.6em',
            width: {xs: '100%', sm: '80%'},
            maxWidth: '600px',
        }}
      >
        <TextField
          label="Email"
          type="email"
          className="form-field"
          error={Boolean(errors.email)}
          helperText={errors.email && "Email is required"}
          {...register("email", { required: true })}
        />
        <TextField
          label="Password"
          type="password"
          className="form-field"
          error={Boolean(errors.password)}
          helperText={errors.password && "Password is required"}
          {...register("password", { required: true })}
        />
        <TextField
          label="Repeat password"
          type="password"
          className="form-field"
          error={Boolean(errors.repeatPassword)}
          helperText={errors.repeatPassword && "Password don't match"}
          {...register("repeatPassword", {
            required: true,
            validate: repeatPasswordValidator,
          })}
        />
        {isLoading && <LinearProgress />}
        <Button type="submit" variant="contained" color="primary">
          Registration
        </Button>
        <Grid container justifyContent="flex-end">
          <Box>
            Already have account? <Link to="/signin">Sign in</Link>
          </Box>
        </Grid>
      </Stack>
    </Box>
  );
};

export default SignUp;
