import '.././App.css';
import { Paper, Grid, Link, Typography, AppBar, Toolbar, FormControlLabel, Button, Radio, RadioGroup, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import Alert from "@material-ui/lab/Alert";

import DeleteIcon from '@material-ui/icons/Delete';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';



const initialAlert = { on: false, type: "", message: "", errors: [] }
export default function Quiz({ quiz, SetQuizIndex, id }) {

    const classes = useStyles();
    const [alert, setAlert] = useState(initialAlert);


    const handleAnswer = (e) => {

        const newItems = [...questions];
        newItems[e.target.name].answer_id=e.target.value

        setQuestions(newItems);
        console.log(questions)

        
    };
    const [open, setOpen] = useState(false);

    const [questions, setQuestions] = useState(quiz.questions_answers);
    const [answer, setAnswer] = useState({
        is_true: false,
        text: ""
    });
    const [question, setQuestion] = useState({
        answer_id: null, text: "", feedback_false: "", feedback_true: "", answers: [
        ]
    });


    return (
        <Paper variant="outlined" style={{ margin: 10, padding: 10, backgroundColor: "azure" }}>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={10} >
                    Title: {quiz.title}
                </Grid>
                <Grid item xs={10} >
                    Description:  {quiz.description}
                </Grid>
                <Grid item xs={10} >
                    Youtube URL: <Link href={quiz.url}>{quiz.url}</Link>
                </Grid>
                <Grid item xs={10} >
                    Score:  {quiz.score ? quiz.score : " -/-"}
                </Grid>

                <Grid container justifyContent="center">
                    <Button variant="outlined" color="default" className={classes.button}
                        onClick={() => setOpen(true)}
                    > Solve </Button>
                    <Button variant="outlined" color="primary" className={classes.button}
                        onClick={() => SetQuizIndex(id)}
                    > Edit </Button>

                </Grid>
            </Grid>
            {
                <Dialog fullScreen open={open} onClose={() => setOpen(false)}
                    aria-labelledby="form-dialog-title">
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="h6" className={classes.title}>
                                {quiz.title}
                            </Typography>

                        </Toolbar>
                    </AppBar>
                    <DialogContent>
                        <div className="App">
                            <Grid container justifyContent="center" className={classes.grid} spacing={2}>
                                {questions && questions.length > 0 && questions.map((questionElement, i) => {
                                    return (
                                        <Grid item xs={10}>
                                            <Paper variant="outlined" className={classes.paper}  >
                                                <Grid container justifyContent="center" spacing={2}>
                                                    <Grid item xs={10}>
                                                        <Grid container justifyContent="center" spacing={2}>
                                                            <Grid item xs={10}>

                                                                <Typography variant="h5">{`${i + 1})`} {questionElement.text}</Typography>
                                                            </Grid>
                                                            {/*<Grid item xs={10}>
                                                        <TextField variant="outlined" fullWidth
                                                            label={`Question Positive Feedback ${i}`} value={questionElement.feedback_true}
                                                            required />
                                                    </Grid>
                                                    <Grid item xs={10}>
                                                        <TextField variant="outlined" fullWidth
                                                            label={`Question Negative Feedback ${i}`} value={questionElement.feedback_false}
                                                            required />
                                                    </Grid> */}

                                                        </Grid >
                                                    </Grid >

                                                </Grid >
                                                <RadioGroup
                                                    aria-label="gender"
                                                    name="controlled-radio-buttons-group"
                                                    disabled={true}
                                                    value={questionElement.answer_id?Number(questionElement.answer_id):null}
                                                    onChange={handleAnswer}
                                                >
                                                    {[...Array(questionElement.answers.length)].map((_, j) =>
                                                        <FormControlLabel disabled={questionElement.answer_id} value={j} name={i} control={<Radio />} label={questionElement.answers[i].text} />

                                                    )}
                                                </RadioGroup>

                                            </Paper>
                                        </Grid>)

                                })}

                            </Grid>
                        </div>

                    </DialogContent>

                </Dialog>
            }
        </Paper>

    );
}



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    grid: {
        margin: theme.spacing(5),
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
        margin: theme.spacing(3),
        textAlign: "center",
        color: theme.palette.text.secondary,
        "& > * + *": {
            marginTop: theme.spacing(1),
        },
    },


}));