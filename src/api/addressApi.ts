import { IAddress } from "../interfaces";

const fecthAddress = async (string: string) => {
  try {
    // Gửi yêu cầu tới Nominatim API
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search.php?q=${string}&format=json`
    );

    // Kiểm tra nếu có lỗi HTTP
    if (!response.ok) {
      throw new Error("Failed to fetch address data");
    }

    // Chuyển đổi dữ liệu từ JSON
    const data = await response.json();

    // Kiểm tra xem có kết quả nào không
    if (data.length === 0) {
      throw new Error("No results found");
    }

    // Trả về dữ liệu
    return data 
  } catch (error) {
    // Xử lý lỗi
    console.error("Error fetching address:", error);
    return [];
  }
};

export default { fecthAddress };
