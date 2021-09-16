import '.././App.css';
import { Paper, Grid, Link, Typography, AppBar, Toolbar, FormControlLabel, Button, Radio, RadioGroup, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';




export default function Quiz({ quiz, SetQuizIndex, id }) {

    const classes = useStyles();
    const [numRight, setNumRight] = useState(quiz.score ? quiz.score : 0);




    const handleAnswer = (e) => {
        const newItems = [...questions];
        newItems[e.target.name].answer_id = e.target.value
        setQuestions(newItems);

        if (newItems[e.target.name].answers[e.target.value].is_true) {
            const NumRight = numRight
            setNumRight(NumRight + 1)
        }

    };
    const [open, setOpen] = useState(false);

    const [questions, setQuestions] = useState(quiz.questions_answers);
    useEffect(() => {
        quiz.score = numRight
    }, [numRight]);

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
                    Score:  {quiz.score ? quiz.score + "/" + quiz.questions_answers.length : " -/-"}
                </Grid>

                <Grid container justifyContent="center">
                    <Button variant="outlined" color="default" className={classes.button}
                        onClick={() => setOpen(true)}
                    > Solve </Button>
                    <Button variant="outlined" color="primary" className={classes.button}
                        disabled={quiz.score}
                        onClick={() => SetQuizIndex(id)}
                    > Edit </Button>

                </Grid>
            </Grid>
            {
                <Dialog fullScreen open={open} onClose={() => setOpen(false)}
                    aria-labelledby="form-dialog-title">
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="black" onClick={(e) => setOpen(false)} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Title : {quiz.title}, Score : {numRight}/{quiz.questions_answers.length}
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
                                                        </Grid >
                                                    </Grid >

                                                </Grid >
                                                <RadioGroup
                                                    aria-label="gender"
                                                    name="controlled-radio-buttons-group"
                                                    disabled={true}
                                                    value={questionElement.answer_id ? Number(questionElement.answer_id) : null}
                                                    onChange={handleAnswer}
                                                >
                                                    {[...Array(questionElement.answers.length)].map((_, j) =>
                                                        <FormControlLabel disabled={questionElement.answer_id} value={j} name={i} control={<Radio />} label={questionElement.answers[j].text} />
                                                    )}
                                                </RadioGroup>

                                                <Grid container justifyContent="center" spacing={2}>
                                                    <Grid item xs={10}>
                                                        <Grid container justifyContent="center" spacing={2}>
                                                            <Grid item xs={10}>
                                                                {questionElement.answer_id && questionElement.answers[questionElement.answer_id].is_true ? <Typography style={{ color: "Green" }} variant="h5">{questionElement.feedback_true}</Typography> :
                                                                    null
                                                                }
                                                                {questionElement.answer_id && !questionElement.answers[questionElement.answer_id].is_true ? <Typography style={{ color: "Red" }} variant="h5">{questionElement.feedback_false}</Typography> :
                                                                    null
                                                                }

                                                            </Grid>

                                                        </Grid >
                                                    </Grid >

                                                </Grid >

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
    
    grid: {
        margin: theme.spacing(5),
    },
    
    button: {
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