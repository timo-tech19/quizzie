import React, { useState } from 'react';
import { Difficulty, fetchQuizQuestions, QuestionState } from './API';
import QuestionCard from './components/QuestionCard';

export interface Answer {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;
function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([])
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true)

  // console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY))

  console.log(questions)
  
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setLoading(false);
  }
  
  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if(nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
      setNumber(0);
    } else {
      setNumber(nextQuestion);
    }
  }
  
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;

      if(correct) setScore(prev => prev + 1);

      const answerObject: Answer = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }

      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  return (
    <div className="App">
      <h1>React TypeScript Quiz App</h1>
      {gameOver ? <button className="startBtn" onClick={startTrivia}>Start</button> : null}
      {!gameOver ? <p className="score">Score: {score}/{TOTAL_QUESTIONS} </p>: null}
      { loading ? <p>Loading Questions...</p> : null}
      { !loading && !gameOver && <QuestionCard 
        questionNum={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number]?.question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number]: undefined }
        callback={checkAnswer}
      /> }

      {
        !loading && !gameOver && userAnswers.length === number + 1 ? (
          <button className='nextBtn' onClick={nextQuestion}>Next Question</button>
        ): null
      }
    </div>
  );
}

export default App;
