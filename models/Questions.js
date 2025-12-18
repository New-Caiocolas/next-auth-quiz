// Define a estrutura do modelo de perguntas no MongoDB usando Mongoose

import mongoose from 'mongoose';

const { Schema } = mongoose;

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,// Define que o campo é obrigatório
  },
  options: { // As opções de múltipla escolha
    type: [String],
    required: true,// Define que o campo é obrigatório
  },
  correctAnswer: { // O texto da resposta correta para comparação
    type: String,
    required: true, // Define que o campo é obrigatório
  },
});

// Se o modelo já existe, usa ele. Se não cria.
const Question = mongoose.models.Question || mongoose.model('Question', questionSchema);

export default Question;