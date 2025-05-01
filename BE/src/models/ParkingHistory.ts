const mongoose = require('mongoose');

const ParkingHistorySchema = new mongoose.Schema({
  entryTime: { type: Date, required: false }, // Thời gian vào
  exitTime: { type: Date, required: false }, // Thời gian ra
  cost: { type: Number, required: false }, // Chi phí
  paymentType: { type: Number, required: false }, // Loại thanh toán
  parkingType: { type: Number, required: false }, // Loại vé (tháng/ngày)
  parkingLotID: { type: String, required: false }, // Mã bãi đỗ xe
  parkingAreaID: { type: String, required: false }, // Mã khu vực đỗ xe
  parkingAreaName: { type: String, required: false }, // Tên khu vực đỗ xe
  positionName: { type: String, required: false }, // Tên vị trí
  status: { type: Number, required: false }, // Trạng thái
  hourlyCost: { type: Number, required: false }, // Chi phí theo giờ

  // Extended fields
  latitude: { type: Number, required: false }, // Vĩ độ
  longitude: { type: Number, required: false }, // Kinh độ
  statusName: { type: String, required: false }, // Tên trạng thái
}, { _id: true }); // Mặc định MongoDB tự sinh _id

const ParkingHistory = mongoose.model('ParkingHistory', ParkingHistorySchema);

module.exports = ParkingHistory;
