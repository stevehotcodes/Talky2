import http from 'k6/http'
import {sleep,check} from 'k6'


export let options={
    vus:20,
    duration:'1s'
}

export default function () {
    const body= JSON.stringify({
        
     email:"Alamin@gmail.com",
     password:"12345678"
    })

    const params={
        headers:{
            'Content-Type':'application/json'
        }
    }


let response= http.post("http://localhost:3400/users/login",body,params)
 
check(response,{
    'is status 200?':(response)=>response.status==200,
    'is successfully logged in?':response.body.includes('LogIn successful')
})

sleep(1)

}