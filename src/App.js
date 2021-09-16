import './App.css';
import QuizCreatorEditor from './modules/QuizCreatorEditor'
import Quiz from './modules/Quiz'
import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, TextareaAutosize, Collapse, IconButton, FormControlLabel, Button, Checkbox, TextField } from "@material-ui/core";

function App() {
  const classes = useStyles();
  const [mode, setMode] = useState("view");
  const [quizzes, setquizzes] = useState(quizzesInitial);
  const [quiz, setQuiz] = useState({
    created: "", description: "", modified: "", questions_answers: [], score: null, title: "", url: ""
  });
  useEffect(() => {
    if (mode == "new") {
      setquizzes([...quizzes, quiz])
      setMode("view")
      setQuiz({
        created: "", description: "", modified: "", questions_answers: [], score: null, title: "", url: ""
      })
    }
    console.log(quizzes)

  }, [quiz]);

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
          <QuizCreatorEditor quizElement={quiz} setQuizElement={setQuiz} />
        </Grid> : null}



        {mode == "view" && quizzes && quizzes.length > 0 && quizzes.map((quizElement, i) => {
          return (
          <Grid item xs={10}>
            <Quiz quiz={quizElement} />
          </Grid>
          )

        })}






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

const quizzesInitial = [{
  "created": "2020-09-09 09:26:39",
  "description": "Description",
  "id": 29,
  "modified": "2020-09-09 09:26:39",
  "questions_answers": [
    {
      "answer_id": null,
      "answers": [
        {
          "id": 122,
          "is_true": false,
          "text": "question 1 answer 1 false"
        },
        {
          "id": 123,
          "is_true": false,
          "text": "question 1 answer 2 false"
        },
        {
          "id": 124,
          "is_true": true,
          "text": "question 1 answer 3 true"
        },
        {
          "id": 125,
          "is_true": false,
          "text": "question 1 answer 4 false"
        }
      ],
      "feedback_false": "question 1 false feedback",
      "feedback_true": "question 1 true feedback",
      "id": 53,
      "text": "question 1 text"
    },
    {
      "answer_id": null,
      "answers": [
        {
          "id": 126,
          "is_true": true,
          "text": "question 2 answer 1 true"
        },
        {
          "id": 127,
          "is_true": false,
          "text": "question 2 answer 2 false"
        }
      ],
      "feedback_false": "question 2 false feedback",
      "feedback_true": "question 2 true feedback",
      "id": 54,
      "text": "question 2 text"
    },
    {
      "answer_id": null,
      "answers": [
        {
          "id": 128,
          "is_true": false,
          "text": "question 3 answer 1 false"
        },
        {
          "id": 129,
          "is_true": true,
          "text": "question 3 answer 2 true"
        },
        {
          "id": 130,
          "is_true": false,
          "text": "question 3 answer 3 false"
        }
      ],
      "feedback_false": "question 3 false feedback",
      "feedback_true": "question 3 true feedback",
      "id": 55,
      "text": "question 3 text"
    }
  ],
  "score": null,
  "title": "quiz title",
  "url": "https://www.youtube.com/watch?v=e6EGQFJLl04"
}]


export default App;
