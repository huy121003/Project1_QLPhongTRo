
const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;//kiểm tra email  hợp lệ hay không  (có ít nhất 1 ký tự, 1 số, 1 ký tự đặc biệt, 1 dấu chấm, 1 ký tự)
const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;//8 ký tự, ít nhất 1 chữ cái và 1 số
const regexName = /^[a-zA-Z]{2,}$/;

export const  checkEmail = (email: string) => {
    return regexEmail.test(email);

    }
export const checkPassword = (password: string) => {
    return regexPassword.test(password);//kiểm tra mật khẩu có ít nhất 8 ký tự, ít nhất 1 chữ cái và 1 số
    
    }
export const  checkName = (name: string) => {
    return regexName.test(name);//kiểm tra tên có ít nhất 2 ký tự
}


