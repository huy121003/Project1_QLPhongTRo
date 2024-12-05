export const checkEmail = (email:string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const checkPassword = (password: string): boolean => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/;
  return regex.test(password);
};


const validCityCodes: string[] = [];
for (let i = 1; i <= 96; i++) {
    validCityCodes.push(i.toString().padStart(3, '0'));
}

export function checkIdCard(cccd: string | undefined): boolean {
    // Kiểm tra xem cccd có phải là chuỗi hợp lệ không
    if (!cccd || typeof cccd !== 'string' || cccd.length !== 12) {
        console.log("CCCD không hợp lệ (độ dài không đúng hoặc không phải chuỗi).");
        return false;
    }

    // 1. Mã thành phố/tỉnh (3 chữ số đầu)
    const cityCode = cccd.substring(0, 3);
    if (!validCityCodes.includes(cityCode)) {
        console.log(`Mã thành phố/tỉnh không hợp lệ: ${cityCode}`);
        return false;
    }

    // 2. Mã thế kỷ và giới tính (1 chữ số thứ 4)
    const genderCenturyCode = parseInt(cccd[3], 10);
    if (![0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(genderCenturyCode)) {
        console.log(`Mã thế kỷ và giới tính không hợp lệ: ${genderCenturyCode}`);
        return false;
    }

    // 3. Mã năm sinh (2 chữ số tiếp theo)
    const birthYear = cccd.substring(4, 6);
    const birthYearNumber = Number(birthYear);
    if (isNaN(birthYearNumber) || birthYearNumber < 0 || birthYearNumber > 99) {
        console.log(`Mã năm sinh không hợp lệ: ${birthYear}`);
        return false;
    }

    // 4. 6 chữ số ngẫu nhiên
    const randomCode = cccd.substring(6, 12);
    if (isNaN(Number(randomCode)) || randomCode.length !== 6) {
        console.log(`Mã ngẫu nhiên không hợp lệ: ${randomCode}`);
        return false;
    }

    // Nếu tất cả kiểm tra hợp lệ, trả về true
    return true;
}


export const checkPhoneNumberVN = (phoneNumber: string) => {
  return String(phoneNumber).match(/^(0[3|5|7|8|9])\d{8}$/);
}

