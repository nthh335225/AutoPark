
const ParkingAreaSchema = new mongoose.Schema({
  name: { type: String, required: false }, // Tên khu vực đỗ xe
  address: { type: String, required: false }, // Địa chỉ
  urlImage: { type: String, required: false }, // URL hình ảnh
  distance: { type: Number, required: false }, // Khoảng cách
  latitude: { type: Number, required: false }, // Vĩ độ
  longitude: { type: Number, required: false }, // Kinh độ
  status: { type: Number, required: false }, // Trạng thái
  totalParkingSpaces: { type: Number, required: false }, // Tổng số chỗ đỗ
  availableParkingSpaces: { type: Number, required: false }, // Số chỗ trống
  numColumn: { type: Number, required: false }, // Số cột
  numRow: { type: Number, required: false }, // Số hàng
  hourlyCost: { type: Number, required: false }, // Chi phí theo giờ
}, { _id: true }); // Mặc định MongoDB tự sinh _id

const ParkingArea = mongoose.model('ParkingArea', ParkingAreaSchema);

module.exports = ParkingArea;
