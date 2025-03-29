import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongodbURL } from './config.js';
import cors from 'cors';

//Sageevan
// import routes

import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoutes.js';

//Isuru
import taxRateRoute from './routes/taxRateRoute.js';
import taxReliefRoute from './routes/taxReliefRoute.js';

//Gihan
import expenseRoute from './routes/expense.js'; 
import incomeRoute from './routes/income.js';

//Dimuthu
import assetRoute from './routes/assetRoute.js';
import liabilityRoute from './routes/liabilityRoute.js';   

const app = express();
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extended: true}));
app.use(cors());

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Welcome to MERN Stack');
});

//Sageevan
// Routes for logics

app.use('/users', userRoute);
app.use('/auth', authRoute);

//Isuru
app.use('/taxRate', taxRateRoute);
app.use('/taxRelief', taxReliefRoute);

//Gihan
app.use('/expense', expenseRoute);
app.use('/income', incomeRoute);

//Dimuthu
app.use('/asset', assetRoute);
app.use('/liability', liabilityRoute);

mongoose
.connect(mongodbURL)
.then(() => {
    console.log('App Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
})
.catch((error) => {
    console.log('Failed to connect to MongoDB', error);
});