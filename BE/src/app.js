import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './config/database.js';
import connectMQTT from './config/mqtt.js';
import routers from './routes/router.js';
import { saveData } from './controllers/dataController.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// MongoDB connection
connectDatabase();

// MQTT connection and subscription
// const mqttClient = connectMQTT();
// mqttClient.on('message', (topic, message) => {
//   saveData(topic, message.toString());
// });
// mqttClient.subscribe(process.env.MQTT_TOPIC);

// Routes
app.use('/api', routers);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;  // Thay đổi từ module.exports sang export default
