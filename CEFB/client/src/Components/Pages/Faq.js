import '../CSSContents/Faq.css'
import React, {useState, useEffect} from "react";
import axios from 'axios';

function Faq(){

    const [currentQuestionID, setCurrentQuestionID] = useState(null);
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [askQuestion, setAskQuestion] = useState(false);
    const [questionInput, setQuestionInput] = useState("");
    const [askSuccess, setAskSuccess] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:4000/faq/getAllQuestions`)
            .then((response) => {
                if (response.data) {                

                    const newQuestions = [];
                    response.data.forEach(questionObj => {

                        if(questionObj.answer !== null){
                            newQuestions.push(questionObj);
                        }
                    })
                    
                    newQuestions.sort((a,b) => b.qViews - a.qViews); //sorts the array desc order on views
                    setQuestions(newQuestions);
                    setLoading(false);
                }
            })
    }, []);

    // get all questions with answers

    // order answers by number of views

    // handle submitting questions

    // handle answering questions

    // increase view of each question each time it is seen per login session

    const onQuestionSelect = (qID) => {
        setAskSuccess(false);
        if(currentQuestionID !== qID){
            setCurrentQuestionID(qID);
        }else{
            setCurrentQuestionID(null);
        }
    }

    function onAskQuestion(){
        setAskSuccess(false);
        setAskQuestion(!askQuestion);
    }

    const onQuestionInput = (e) => {
        setQuestionInput(e.target.value)
    }

    function checkErrors(){
        const err = [];

        if (!questionInput.endsWith('?')) {
            err.push("- Your question must end with a question mark (?). ")
        }// add more validation - length > number
        
        return err;
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const err = checkErrors();
        setErrors(err);
        console.log(questionInput);
        if(err.length === 0){
            axios.post('http://localhost:4000/faq/askquestion', [questionInput])
            .then((response) => {
                if (response.data === 'FAQ question asked successfully') {
                    setAskQuestion(false);
                    setAskSuccess(true);
                }
            })
        }
    }

    return(
        <div className='Faq'>
            <div className='header'>FAQ - Frequently Asked Questions</div>
            <button className='question-button' onClick={onAskQuestion}>Ask a question</button>
            {askSuccess && <div className='success-text'>Question Submitted</div>}
            {askQuestion && <div>
                <input onChange={onQuestionInput}></input>
                <button className='question-submit-button' onClick={onSubmit}>Submit</button>

                {errors.map(err => (
                <div className='error-text'>{err}</div>
                ))}
            </div>}
            <br></br>
            <br></br>
            <div className='header'>Answered Questions</div>
            {!loading && <div className='questions-container'>
                    {questions.map(q => (
                        <div>
                            <button className='question-button' onClick={() => onQuestionSelect(q.qID)}>{q.question}</button>
                            {currentQuestionID === q.qID && <div className='question-answer'>{q.answer}</div>}
                            <br></br>
                            <br></br>
                        </div>
                    ))}
            </div>}
        </div>
    )
}

export default Faq;