interface AccountModel{
    _id:string,
    name:string,
    email:string,
    phone:number,
    idCard:number,
    birthday:Date,
    role:{
        _id:string,
        name:string,
    },
    createdAt:Date,
    gender:Gender,
    address:string,

}
export default AccountModel;

export enum Gender{
    Male="MALE",
    Female="FEMALE",
    Other="OTHER",
}