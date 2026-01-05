import dotenv from 'dotenv';
import app from './index';
import { connectDB } from './config/db';

dotenv.config();

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
