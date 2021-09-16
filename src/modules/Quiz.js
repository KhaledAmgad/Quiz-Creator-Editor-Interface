import { Paper, Grid, TextareaAutosize, Collapse, IconButton, FormControlLabel, Button, Checkbox, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import DeleteIcon from '@material-ui/icons/Delete';


 

const initialAlert = { on: false, type: "", message: "", errors: [] }
export default function Quiz({ quiz,SetQuizIndex,id }) {

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

/*
  const handleChangeQuiz = e => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value }, console.log(quiz));
  };*/

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
/*
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
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
 
    setQuiz({
      ...quiz, questions_answers: questions, created: date + '/' + month + '/' + year
        + ' ' + hours + ':' + min + ':' + sec
    }, console.log(quiz))
    setQuizElement({
      ...quiz, questions_answers: questions, created: year + '-' + month + '-' + date
        + ' ' + hours + ':' + min + ':' + sec
    })
    setAlert({ on: true, type: "success", message: "Saved successfully", });

  };
*/

  return (
    <Paper variant="outlined" style={{ margin: 10, padding: 10, backgroundColor: "azure" }}>
              <Grid  container justifyContent="center" spacing={2}>
                <Grid item xs={10} >
                  Title: {quiz.title}
                </Grid>
                <Grid item xs={10} >
                Description:  {quiz.description}
                </Grid>
                <Grid item xs={10} >
                Score:  {quiz.score?quiz.score:" -/-"}
                </Grid>

                <Grid container justifyContent="center">
                  <Button variant="outlined" color="default" className={classes.button}
                    //disabled={!employee.status}
                    //</Grid>onClick={() => handleView(request)}
                    > View </Button>
                  <Button variant="outlined" color="primary" className={classes.button}
                    //disabled={!employee.ismanager && !fromEMRSettings || !employee.status}
                    onClick={() => SetQuizIndex(id)}
                    > Edit </Button>
                  
                </Grid>
              </Grid>
            </Paper> 

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