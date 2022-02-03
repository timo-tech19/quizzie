import React from 'react'
import { Answer } from '../App'

interface Props {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer?: Answer;
    questionNum: number;
    totalQuestions: number;
}

function QuestionCard({ question, answers, callback, userAnswer, questionNum, totalQuestions} : Props) {
    return (
        <div>
            <p className="number">
                Question: { questionNum } / {totalQuestions}  
            </p>
            <p dangerouslySetInnerHTML={{ __html: question }} />  
            <div>
                {
                    answers.map(answer => (
                        <div key={answer}>
                            <button disabled={Boolean(userAnswer)} value={answer} onClick={callback}>
                                <span dangerouslySetInnerHTML={{ __html: answer }} />
                            </button>
                        </div>
                    ))
                }
            </div>      
        </div>
    )
}

export default QuestionCard
