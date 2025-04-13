const mqtt = require('mqtt');

// Kết nối tới MQTT Broker (Thay đổi URL nếu cần)
const brokerUrl = 'mqtt://test.mosquitto.org'; // Sử dụng broker miễn phí
const client = mqtt.connect(brokerUrl);

// Sự kiện khi kết nối thành công
client.on('connect', () => {
  console.log('Đã kết nối MQTT Broker');

  // Đăng ký một topic
  const topic = 'example/topic';
  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`Đã subscribe topic: ${topic}`);
    }
  });

  // Gửi một tin nhắn tới topic
  client.publish(topic, 'Hello MQTT');
});

// Sự kiện khi nhận được tin nhắn
client.on('message', (topic, message) => {
  console.log(`Nhận được tin nhắn từ ${topic}: ${message.toString()}`);
});

// Sự kiện lỗi
client.on('error', (err) => {
  console.error('Lỗi MQTT:', err);
});
