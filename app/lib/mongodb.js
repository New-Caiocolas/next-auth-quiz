import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Movemos a verificação para DENTRO da função
// Isso impede que o erro trave o "npm run build"
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  // Verificação de segurança apenas quando a função for chamada
  if (!MONGODB_URI) {
    throw new Error(
      'Por favor, defina a variável MONGODB_URI dentro do painel da Vercel ou no .env.local'
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ Conectado ao MongoDB');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}