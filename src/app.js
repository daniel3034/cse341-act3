import express from 'express';
import routes from './routes/index.js';
import client from './models/db.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import './auth/passport.js';
import authRoutes from './routes/auth.js';


const app = express();
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CSE341 Project 2 API',
      version: '1.0.0',
      description: 'API documentation for CSE341 Project 2'
    }
  },
  apis: ['./src/routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(session({
  secret: process.env.SESSION_SECRET || 'Secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions'
  })
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/api', routes);

const PORT = 8080;

client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });
