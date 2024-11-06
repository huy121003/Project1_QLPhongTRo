interface AccountModel{
    _id:string,
    name:string,
    email:string,
    phone:number,
    password:string,
    idCard:number,
    birthday:Date,
    role:{
        _id:string,
        name:string,
    },
    images:{imagePath:string}[]
    gender:Gender,
    address:string,
    createdAt:Date,
    
    updatedAt:Date,
    createdBy:{
        _id:string,
        email:string,
    },
    updatedBy:{
        _id:string,
        email:string,
    }

}
export default AccountModel;

export enum Gender{
    Male="MALE",
    Female="FEMALE",
    Other="OTHER",
}