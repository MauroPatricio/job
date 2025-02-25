import express from 'express'; 
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';
import http from 'http';
import { Server } from 'socket.io';
import categoryRouter from './routes/categoryRoutes.js';
import path, { dirname } from 'path';
import provinceRoutes from './routes/provinceRoutes.js';
import documentTypeRoutes from './routes/documentTypeRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import notificationRoutesNhabanga from './routes/notificationRoutesNhabanga.js';

import admin from 'firebase-admin';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';
import bookingRouter from './routes/BookingRoutes.js';
import paymentStatusRouter from './routes/PaymentStatusRoutes.js';
import reviewRouter from './routes/ReviewRoutes.js';
import serviceRouter from './routes/serviceRoutes.js';
import serviceStatusRouter from './routes/serviceStatusRoutes.js';
import userTypeRouter from './routes/UserTypeRoutes.js';

// Definir __dirname corretamente
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carregar variáveis de ambiente
dotenv.config();

// Conectar ao MongoDB com melhor tratamento de erro
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado ao MongoDB com sucesso!'))
  .catch((err) => console.error('❌ Erro ao conectar ao MongoDB:', err.message));

const app = express();

// Configuração do CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para evitar problemas de CORS em requisições específicas
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Rotas
app.use('/api/bookings', bookingRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/documenttypes', documentTypeRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/paymentstatus', paymentStatusRouter);
app.use('/api/provinces', provinceRoutes);
app.use('/api/reviews', reviewRouter);
app.use('/api/services', serviceRouter);
app.use('/api/servicestatus', serviceStatusRouter);
app.use('/api/users', userRouter);
app.use('/api/usertypes', userTypeRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/notificationsNhabanga', notificationRoutesNhabanga);


// Servindo arquivos estáticos para frontend
app.use(express.static(path.join(__dirname, '/frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ message: err.message });
});

// Configuração do servidor e WebSocket
const port = process.env.PORT || 5000;
const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

const users = [];

io.on('connection', (socket) => {
  console.log('🔵 Usuário conectado:', socket.id);

  socket.on('disconnect', () => {
    const user = users.find((x) => x.socketId === socket.id);
    if (user) {
      user.online = false;
      console.log('🔴 Usuário offline:', user.name);

      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit('updateUser', user);
      }
    }
  });

  socket.on('onLogin', (user) => {
    const updatedUser = {
      ...user,
      online: true,
      socketId: socket.id,
      messages: [],
    };
    const existUser = users.find((x) => x._id === updatedUser._id);
    if (existUser) {
      existUser.socketId = socket.id;
      existUser.online = true;
    } else {
      users.push(updatedUser);
    }

    console.log('🟢 Online:', user.name);
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      io.to(admin.socketId).emit('updateUser', updatedUser);
    }
    if (updatedUser.isAdmin) {
      io.to(updatedUser.socketId).emit('listUsers', users);
    }
  });

  socket.on('onUserSelected', (user) => {
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      const existUser = users.find((x) => x._id === user._id);
      io.to(admin.socketId).emit('selectUser', existUser);
    }
  });

  socket.on('onMessage', (message) => {
    if (message.isAdmin) {
      const user = users.find((x) => x._id === message._id && x.online);
      if (user) {
        io.to(user.socketId).emit('message', message);
        user.messages.push(message);
      }
    } else {
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit('message', message);
        const user = users.find((x) => x._id === message._id && x.online);
        if (user) {
          user.messages.push(message);
        }
      } else {
        io.to(socket.id).emit('message', {
          name: 'Admin',
          body: 'Me desculpe. Neste momento não estou disponível.',
        });
      }
    }
  });
});

// Inicializar Firebase Admin SDK dentro de uma função assíncrona
const initializeFirebase = async () => {
  try {
    const serviceAccountPath = new URL('./reactnativepushnotificat-a322b-firebase-adminsdk-n3ra9-635e334e58.json', import.meta.url);
    const serviceAccount = await readFile(serviceAccountPath, 'utf-8').then(JSON.parse);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log('✅ Firebase Admin SDK inicializado com sucesso.');
  } catch (error) {
    console.error('❌ Erro ao inicializar Firebase Admin SDK:', error.message);
  }
};

// Chamada da função para iniciar Firebase
// initializeFirebase();

// Iniciar o servidor
httpServer.listen(port, () => {
  console.log(`🚀 Servidor executando na porta: http://localhost:${port}`);
});
