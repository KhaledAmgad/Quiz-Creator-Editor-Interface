import { Paper, Grid, TextareaAutosize, Collapse, IconButton, FormControlLabel, Button, Checkbox, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import DeleteIcon from '@material-ui/icons/Delete';




const initialAlert = { on: false, type: "", message: "", errors: [] }
export default function QuizCreatorEditor({ quizElement, setQuizElement, mode, setSaved }) {


  const [quiz, setQuiz] = useState(quizElement);

  const classes = useStyles();
  const [alert, setAlert] = useState(initialAlert);

  const [questions, setQuestions] = useState(quiz.questions_answers);
  const [answer, setAnswer] = useState({
    is_true: false,
    text: ""
  });
  const [question, setQuestion] = useState({
    answer_id: null, text: "", feedback_false: "", feedback_true: "", answers: [
    ]
  });


  const handleChangeNewQuestion = e => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleChangeNewAnswer = e => {
    setAnswer({ ...answer, [e.target.name]: e.target.value });

    switch (e.target.type) {
      case "checkbox":
        setAnswer({ ...answer, [e.target.name]: e.target.checked });
        break;
      default:
        setAnswer({ ...answer, [e.target.name]: e.target.value });
    }
  };




  const handleAddQuestion = () => {
    if (
      !question.text || !question.feedback_false || !question.feedback_true || question.answers.length < 2 || question.answers.filter((v) => v.is_true).length === 0
    ) {
      setAlert({ on: true, type: "error", message: "Please fill all question fields" })
      return;
    }
    setQuestions([...questions, question])
    setQuestion({
      answer_id: null, text: "", feedback_false: "", feedback_true: "", answers: []
    });

    setAlert({ on: true, type: "success", message: "Added successfully", });

    setTimeout(() => {
      setAlert(initialAlert);
    }, 1000);

  }
  const handleAddAnswer = () => {
    const error = question.answers.filter((v) => v.is_true).length >= 1 && answer.is_true;
    if (
      !answer.text
    ) {
      setAlert({ on: true, type: "error", message: "Please fill all New Answer fields" })
      return;
    }
    if (error) {
      setAlert({ on: true, type: "error", message: "Every question should have only one correct answer" })
      return;
    }
    setQuestion({ ...question, answers: [...question.answers, answer] })
    setAnswer({
      is_true: false,
      text: ""
    })

    setAlert({ on: true, type: "success", message: "Added successfully", });
    setTimeout(() => {
      setAlert(initialAlert);
    }, 1000);

  }


  const handleChangeQuiz = e => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  const handleRemoveQuestion = i => {
    const newItems = [...questions];

    newItems.splice(i, 1);
    setQuestions(newItems);

  };

  const handleRemoveAnswer = i => {
    const newItems = [...question.answers];

    newItems.splice(i, 1);
    setQuestion({ ...question, answers: newItems })
  };

  const handleSave = () => {
    if (
      questions.length === 0
    ) {
      setAlert({ on: true, type: "error", message: "Please Add Questions" })
      return;
    }
    if (
      !quiz.title || !quiz.description || !quiz.url
    ) {
      setAlert({ on: true, type: "error", message: "Please fill all quiz fields" })
      return;
    }

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();
    setSaved(true)
    if (mode !== "edit") {
      setQuiz({
        ...quiz, questions_answers: questions, created: year + '-' + month + '-' + date
          + ' ' + hours + ':' + min + ':' + sec
      })
      setQuizElement({
        ...quiz, questions_answers: questions, created: year + '-' + month + '-' + date
          + ' ' + hours + ':' + min + ':' + sec
      })
    }
    else {
      setQuiz({
        ...quiz, questions_answers: questions, modified: year + '-' + month + '-' + date
          + ' ' + hours + ':' + min + ':' + sec
      })
      setQuizElement({
        ...quiz, questions_answers: questions, modified: year + '-' + month + '-' + date
          + ' ' + hours + ':' + min + ':' + sec
      })
    }

    setAlert({ on: true, type: "success", message: "Saved successfully", });

  };


  return (
    <Paper variant="outlined" className={classes.paper}>

      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={10}>
          <TextField variant="outlined" fullWidth

            name="title" label="Title" value={quiz.title} onChange={handleChangeQuiz}
            required />
        </Grid>
        <Grid item xs={10}>
          <TextareaAutosize
            style={{ width: "99%", height: "100", resize: "vertical", overflow: "auto" }}
            id="input"
            label="Description"
            minRows={10}
            variant="outlined"
            fullWidth={true}
            required
            value={quiz.description}
            name="description"
            placeholder="Description"
            onChange={handleChangeQuiz}
          />
        </Grid>

        <Grid item xs={10}>
          <TextField variant="outlined" fullWidth

            name="url" label="YouTube URL" value={quiz.url} onChange={handleChangeQuiz}
            required />
        </Grid>
      </Grid>
      {questions && questions.length > 0 && questions.map((questionElement, i) => {
        return (
          <Paper variant="outlined" className={classes.paper}  >
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={9}>
                <Grid container justifyContent="center" spacing={2}>
                  <Grid item xs={10}>
                    <TextField variant="outlined" fullWidth
                      disabled={true}
                      label={`Question ${i}`} value={questionElement.text}
                      required />
                  </Grid>
                  <Grid item xs={10}>
                    <TextField variant="outlined" fullWidth
                      disabled={true}
                      label={`Question Positive Feedback ${i}`} value={questionElement.feedback_true}
                      required />
                  </Grid>
                  <Grid item xs={10}>
                    <TextField variant="outlined" fullWidth
                      disabled={true}
                      label={`Question Negative Feedback ${i}`} value={questionElement.feedback_false}
                      required />
                  </Grid>
                </Grid >
              </Grid >
              <Grid item xs={1} >
                <Button variant="outlined" color="secondary"
                  onClick={() => handleRemoveQuestion(i)}
                >
                  <DeleteIcon />
                </Button>
              </Grid >
            </Grid >

            {[...Array(questionElement.answers.length)].map((_, i) =>
              <Paper variant="outlined" className={classes.paper}  >


                <Grid container justifyContent="center" spacing={2}>

                  <Grid item xs={7}>

                    <TextField variant="outlined" fullWidth
                      disabled={true}
                      name="text" label={`Answer ${i}`} value={questionElement.answers[i].text}
                      required />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={questionElement.answers[i].is_true}
                          disabled={true}
                          name="is_true"

                          color="primary"
                        />
                      }
                      label="Correct Answer"
                    >

                    </FormControlLabel>
                  </Grid>
                </Grid>
              </Paper>
            )}

          </Paper>)

      })}
      <Paper variant="outlined" className={classes.paper}  >

        <Grid container justifyContent="center" spacing={2}>

          <Grid item xs={10}>

            <TextField variant="outlined" fullWidth

              name="text" label="New Question Text" value={question.text} onChange={handleChangeNewQuestion}
              required />
          </Grid>
          <Grid item xs={10}>
            <TextField variant="outlined" fullWidth
              name="feedback_true" label="New Question Positive Feedback" value={question.feedback_true} onChange={handleChangeNewQuestion}
              required />
          </Grid>
          <Grid item xs={10}>
            <TextField variant="outlined" fullWidth
              name="feedback_false" label="New Question Negative Feedback" value={question.feedback_false} onChange={handleChangeNewQuestion}
              required />
          </Grid>
        </Grid >



        {[...Array(question.answers.length)].map((_, i) =>
          <Paper variant="outlined" className={classes.paper}  >


            <Grid container justifyContent="center" spacing={2}>

              <Grid item xs={6}>

                <TextField variant="outlined" fullWidth

                  name="text" label={`Answer ${i}`} value={question.answers[i].text}
                  required />
              </Grid>
              <Grid item xs={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={question.answers[i].is_true}

                      name="is_true"

                      color="primary"
                    />
                  }
                  label="Correct Answer"
                >
                </FormControlLabel>
              </Grid>
              <Grid item xs={1} >
                <Button variant="outlined" color="secondary"
                  onClick={() => handleRemoveAnswer(i)}
                >
                  <DeleteIcon />
                </Button>
              </Grid >
            </Grid>
          </Paper>
        )}



        <Paper variant="outlined" className={classes.paper}  >

          <Grid container justifyContent="center" spacing={2}>

            <Grid item xs={7}>

              <TextField variant="outlined" fullWidth

                name="text" label="New Answer" value={answer.text} onChange={handleChangeNewAnswer}
                required />
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={answer.is_true}
                    onChange={handleChangeNewAnswer}
                    name="is_true"
                    color="primary"
                  />
                }
                label="Correct Answer"
              >

              </FormControlLabel>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item xs={3}>
              <Button variant="outlined" color="primary" fullWidth

                onClick={handleAddAnswer}
              >Add Answer</Button>
            </Grid>

          </Grid>

        </Paper>




        <Grid container justifyContent="center">
          <Grid item xs={3}>
            <Button variant="outlined" color="primary" fullWidth

              onClick={handleAddQuestion}
            >Add Question</Button>
          </Grid>

        </Grid>

      </Paper>


      <Grid container justifyContent="center">
        <Grid item xs={3}>
          <Button variant="outlined" color="primary" fullWidth

            onClick={handleSave}
          >Save</Button>
        </Grid>

      </Grid>
      {/* Alerts */}
      <Grid container justify="center" align="center">
        <Collapse in={alert.on} timeout="auto" >
          {/* prettier-ignore*/}
          <Alert severity={alert.type} action={
            <IconButton aria-label='close' color='inherit' size='small'
              onClick={() => { setAlert(initialAlert); }}>
              <CloseIcon fontSize='inherit' />
            </IconButton>}> {alert.message}
          </Alert>
        </Collapse>
      </Grid>

    </Paper >

  );
}



const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
  },
  TextField: {
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