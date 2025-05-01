// controllers/dataController.js

let data = [];  // Dummy array to hold data

// Controller to fetch data
export const getData = (req, res) => {
  res.json(data);
};

// Controller to save data
export const saveData = (topic, message) => {
  // Dummy save function (here you could save the data to MongoDB)
  data.push({ topic, message });
  console.log(`Data saved: ${topic} - ${message}`);
};
