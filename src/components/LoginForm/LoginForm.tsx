import React, { FunctionComponent } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from '@material-ui/core/CircularProgress';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -9,
    marginLeft: -9,
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

type FormData = {
  email: string;
  password: string;
}

type LoginFormProps = {
  handleForm: any;
  loading: boolean;
  goToSignup: () => void;
}

const schema = yup.object().shape({
  email: yup.string().email().required("No email"),
  password: yup.string().required("Please add password"),
});

const LoginForm: FunctionComponent<LoginFormProps> = ({ handleForm, loading, goToSignup }) => {
  const classes = useStyles();
  const {
    handleSubmit,
    register,
    formState: { errors } } = useForm<FormData>({ resolver: yupResolver(schema) });


  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <SupervisorAccountIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Formular de logare
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...register("email")}
            required={errors.email ? true : false}
            error={errors.email ? true : false}
            helperText={errors.email && errors.email.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password")}
            required={errors.password ? true : false}
            error={errors.password ? true : false}
            helperText={errors.password && errors.password.message}
          />
          <div className={classes.wrapper}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              className={classes.submit}
            >
              Intra in cont
          </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
          <div>
            <Button
              type="button"
              onClick={goToSignup}
              fullWidth
              variant="contained"
              color="secondary"
              disabled={loading}
              className={classes.submit}
            >
              Creaza cont
          </Button>
          </div>
          <div>
            <p>Testing account:</p>
            <p>Email: admin@email.com</p>
            <p>password: 12345678</p>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default LoginForm
