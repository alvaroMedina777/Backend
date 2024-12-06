import app from './app.js';
import {connectDB} from './db/mongoClient.js';

const PORT = 4000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
    
    });