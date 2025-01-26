import z from "zod";

type Passwords = {
    first_password : string,
    second_password : string
}

export const isValidPassword = (passwords : Passwords)=>{
    const isEqual = passwords.first_password === passwords.second_password
    const schema = z.string().min(6).max(20)
    try{
        schema.parse(passwords.first_password)
        schema.parse(passwords.second_password)
    }catch (e){
        return false
    }
    return isEqual
}
export const TASK_PAGE_SIZE = 5;
export const RECORD_PAGE_SIZE  = 5;