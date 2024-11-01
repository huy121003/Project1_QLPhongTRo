export interface RoleModel {
    _id: string,
    name: string,
    description: string,
    permissions: string[],
    createdBy:{
        _id: string,
        email: string
    },
    createdAt: Date,
    updatedAt: Date
    updatedBy:{
        _id: string,
        email: string
    }
}