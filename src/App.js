import './App.css';
import QuizCreatorEditor from './modules/QuizCreatorEditor'
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, TextareaAutosize, Collapse, IconButton, FormControlLabel, Button, Checkbox, TextField } from "@material-ui/core";

function App() {
  const classes = useStyles();
  const [mode, setMode] = useState("view");
  return (
    <div className="App">


      <Grid container justifyContent="center" className={classes.Margin}  >
        {/* Control Buttons [CREATE NEW] */}

        <Grid item xs={2}>
          <Button variant="contained" color="primary"
            onClick={e => {
              setMode("new")
            }}>Create New</Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant="outlined" color="secondary"
            disabled={mode == "view"}
            onClick={e => {
              setMode("view")
            }}>Cancel</Button>
        </Grid>


      </Grid>


      <Grid container justifyContent="center" spacing={2}>
        {mode != "view" ? <Grid item xs={10}>
          <QuizCreatorEditor />
        </Grid> : null}


      </Grid>


    </div >
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  TableCell: {
    wordWrap: "break-word",
  },
  button: {
    margin: theme.spacing(2),
  },
  Margin: {
    margin: theme.spacing(2),
  },
  control: {
    padding: theme.spacing(2),
  },
  paper: {

    padding: theme.spacing(2),
    margin: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
  },


}));

export default App;
