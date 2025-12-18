// Função assincrona para buscar perguntas do quiz do MongoDB 

import { connectToDatabase } from './mongodb';
import Question from '../../models/Questions';

export async function getQuizQuestions() {
  await connectToDatabase();
  
  // Busca as 4 primeiras perguntas e as converte para um objeto JavaScript simples
  // O .lean() otimiza a busca no Mongoose
  // O .map() garante que o objeto seja serializável para passar a um Client Component
  const questions = await Question.find({}).limit(4).lean();

  return questions.map(question => ({
    ...question,
    _id: question._id.toString(), // Converte o ObjectId para string
  }));
}