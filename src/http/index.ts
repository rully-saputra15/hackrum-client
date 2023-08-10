import axios from "axios"
import Cookies from "js-cookie"

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
    getQuestionById(id:string){
        return instance.get(`/questions/${id}`, {
            headers: {
                access_token: Cookies.get("access_token")
            }
        })
    }
}

export default api