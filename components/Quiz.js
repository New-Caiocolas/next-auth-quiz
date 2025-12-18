// components/Quiz.js
'use client'; // ISSO O TORNA UM CLIENT COMPONENT

import React, { useState } from 'react';

// O tipo de dado é recebido como prop
export default function Quiz({ initialQuestions }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = initialQuestions[currentQuestionIndex];

  // Função chamada ao clicar em uma opção
  const handleAnswerOptionClick = (option) => {
    if (isAnswered) return; // Não permite mudar a resposta depois de verificar

    setSelectedOption(option);
    setIsAnswered(true);

    // Lógica para verificar a resposta
    if (option === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  // Função para avançar para a próxima pergunta
  const handleNextQuestion = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < initialQuestions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowScore(true);
    }
  };

  if (showScore) {
    return (
      <div className="quiz-container">
        <h1>Resultado Final</h1>
        <p>Você acertou {score} de {initialQuestions.length} perguntas!</p>
        <button 
          onClick={() => window.location.reload()}
          className="reset-button"
        >
          Reiniciar Quiz
        </button>
      </div>
    );
  }

  // Estrutura do Quiz
  return (
    <div className="quiz-container">
      <div className="question-section">
        <div className="question-count">
          <span>Pergunta {currentQuestionIndex + 1}</span>/{initialQuestions.length}
        </div>
        <div className="question-text">
          {currentQuestion.question}
        </div>
      </div>
      <div className="answer-section">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerOptionClick(option)}
            // Estilização condicional para feedback
            className={`
              option-button 
              ${isAnswered ? 
                (option === currentQuestion.correctAnswer ? 'correct' : 
                (option === selectedOption ? 'incorrect' : ''))
              : ''}
              ${isAnswered && option !== selectedOption ? 'disabled' : ''}
            `}
            disabled={isAnswered && option !== selectedOption}
          >
            {option}
          </button>
        ))}
      </div>
      {isAnswered && (
        <button onClick={handleNextQuestion} className="next-button">
          {currentQuestionIndex === initialQuestions.length - 1 ? 'Ver Resultado' : 'Próxima Pergunta'}
        </button>
      )}
      
      {/* Exemplo de Estilos (Adicione ao seu global.css ou use Tailwind/CSS Modules) */}
      <style jsx global>{`

        .quiz-container {
          margin-top: 50%;
          width: 400px;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 1);
          background-color: #fafafaff;
          color: #000000ff;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .question-text {
          font-size: 1.5rem;
          margin-bottom: 20px;
          font-weight: 200;
          color: #000000ff;
        }
        .option-button {
          display: block;
          width: 100%;
          padding: 15px;
          margin-bottom: 10px;
          border: 1px solid #0e0e0eff;
          border-radius: 6px;
          background-color: #ddddddff;
          cursor: pointer;
          font-size: 1rem;
          text-align: left;
          transition: all 0.2s;
        }
        .option-button:hover:not(:disabled) {
          background-color: #d4edda;
        }
        .option-button.correct {
          background-color: #d4edda; /* Verde claro */
          border-color: #00ff3cff;
          color: #155724;
          font-weight: bold;
        }
        .option-button.incorrect {
          background-color: #f8d7da; /* Vermelho claro */
          border-color: #ff00196c;
          color: #ff0019ff;
          font-weight: bold;
        }
        .option-button:disabled {
            cursor: not-allowed;
            opacity: 0.6;
        }
        .next-button {
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #0070f3;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            float: right;
        }
        .reset-button {
            padding: 10px 20px;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            margin-top: 20px;
        }
      `}</style>
    </div>
  );
}