export interface ILogin {
    email: string,
    password: string
}

export interface IRegister extends ILogin {
    email: string,
    rePassword: string,
    phone: string,
}