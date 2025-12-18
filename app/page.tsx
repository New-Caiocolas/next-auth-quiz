import { getQuizQuestions } from './lib/data'; 
import Quiz from '../components/Quiz';
import LayoutAdmin from '../components/LayoutAdmin'; 
import { Suspense } from 'react';

// Garante que a página sempre busque dados novos do banco
export const dynamic = 'force-dynamic';

export default async function QuizPage() {
  // Busca as perguntas no servidor
  const questions = await getQuizQuestions();

  // Tratamento caso o banco esteja vazio
  if (!questions || questions.length === 0) {
    return (
      <LayoutAdmin>
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500">Nenhuma pergunta disponível no momento.</p>
        </div>
      </LayoutAdmin>
    );
  }

  return (
    <main className="flex justify-center items-center bg-white w-screen h-screen">
      <Suspense fallback={<div className="text-2xl">Carregando Quiz...</div>}>
        <LayoutAdmin>
          {/* O Quiz recebe as perguntas via Props */}
          <Quiz initialQuestions={questions} />
        </LayoutAdmin>
      </Suspense>
    </main>
  );
}