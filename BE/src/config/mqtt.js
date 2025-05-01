import mqtt from 'mqtt';  


const connectMQTT = () => {
  const client = mqtt.connect(process.env.MQTT_BROKER_URL);

  client.on('connect', () => {
    console.log('MQTT connected successfully');
  });

  client.on('error', (error) => {
    console.error('MQTT connection failed:', error.message);
  });

  return client;
};

export default connectMQTT;
