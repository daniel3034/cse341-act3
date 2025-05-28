import express from 'express';
import routes from './routes/index.js';
import client from './models/db.js';

const app = express();
app.use(express.json());
app.use('/api', routes);

const PORT = 3000;

client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });
