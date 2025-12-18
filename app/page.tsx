// app/page.js - Server Component

// Importação ajustada, assumindo que lib/data está na raiz do projeto
import { getQuizQuestions } from '../app/lib/data'; 
import Quiz from '../components/Quiz';
import LayoutAdmin from '../components/LayoutAdmin'; // Componente de Layout
import { Suspense } from 'react';

// O Server Component busca os dados
export default async function QuizPage() {
  // 1. Data Fetching (Server-Side)
  const questions = await getQuizQuestions();

  if (questions.length === 0) {
    return (
      <main className="container">
        <h1>Quiz App</h1>
        <p>Nenhuma pergunta encontrada no banco de dados.</p>
      </main>
    );
  }

  // 2. Renderização do Layout e do Quiz
  // O <LayoutAdmin> pode ser um Server Component ou um Client Component,
  // mas como ele envolve o <Quiz> (que é 'use client'),
  // ele deve receber os props do servidor (initialQuestions) e repassá-los.
  return (
    <main className="flex justify-center bg-white w-screen h-screen">
      <Suspense fallback={<div>Carregando Layout...</div>}>
        <LayoutAdmin>
          <Quiz initialQuestions={questions} />
        </LayoutAdmin>
      </Suspense>
    </main>
  );
}
