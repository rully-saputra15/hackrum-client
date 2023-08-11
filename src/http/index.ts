import axios from "axios"
import Cookies from "js-cookie"
import { CreateQuestionParams, UpdateQuestionParams } from "../interfaces"

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

const api = {
    login(token:string){
        return instance.post("/login",null,{
            headers: {
                google_token: token
            }
        })
    },
    getAll(){
        return instance.get("/questions", {
            headers: {
                access_token: Cookies.get("access_token")
            }
        })
    },
    getTypes(){
        return instance.get("/types", {
            headers: {
                access_token: Cookies.get("access_token")
            }
        })
    },
    getQuestionById(id:string){
        return instance.get(`/questions/${id}`, {
            headers: {
                access_token: Cookies.get("access_token")
            }
        })
    },
    createQuestion(data:CreateQuestionParams){
        return instance.post("/questions", data, {
            headers: {
                access_token: Cookies.get("access_token")
            }
        })
    },
    answerQuestion(data:UpdateQuestionParams){
        return instance.patch(`/questions/${data.id}`, data, {
            headers: {
                access_token: Cookies.get("access_token")
            }
        })
    }
}

export default api