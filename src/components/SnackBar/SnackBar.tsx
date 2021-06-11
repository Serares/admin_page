import React, { useEffect, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

export default function SnackBar() {
  const classes = useStyles();
  // const { status, message, type, snackBarUpdate } = useStore('useSnackBarStore');
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  useEffect(() => {
    //TODO don't do this
    window.addEventListener("message", function (event) {
      if (event.data === "TOGGLE_SNACKBAR") {
        setSnackbarOpen(!isSnackbarOpen)
      }
    })
  }, [])
  const handleClose = () => {
    setSnackbarOpen(false);
    // snackBarUpdate({
    //   payload: {
    //     message: "",
    //     status: false,
    //     type: ""
    //   }
    // });
  };

  return (
    <div className={classes.root}>
      {/* @ts-ignore */}
      <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleClose}>
        {/* <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert> */}
      </Snackbar>
    </div>
  );
}
