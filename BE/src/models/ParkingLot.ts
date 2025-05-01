const ParkingPositionSchema = new mongoose.Schema({
  positionX: { type: Number, required: false },
  positionY: { type: Number, required: false },
  latitude: { type: Number, required: false },
  longitude: { type: Number, required: false },
  status: { type: Number, required: false },
  parkingAreaID: { type: String, required: false },
  positionName: { type: String, required: false },
}, { _id: true }); 


const ParkingPosition = mongoose.model('ParkingPosition', ParkingPositionSchema);

module.exports = ParkingPosition;
