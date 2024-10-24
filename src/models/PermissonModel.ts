export interface PermissionModel {
    _id: string,
    name: string,
    apiPath: string,
    method: Method,
    module: string,
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
export enum Method {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE",
    PATCH = "PATCH"
}
