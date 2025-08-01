import dotenv from 'dotenv';
dotenv.config();
import app from './src/app';

const PORT = 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});