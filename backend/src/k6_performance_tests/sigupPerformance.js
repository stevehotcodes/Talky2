import http from 'k6/http'
import{sleep,check} from 'k6'

export let options={
    vus:1,
    duration:'1s'
}

export default function () {
    const body= JSON.stringify({
    
    fullName:"Daniel Kitheka",
    userName:"Dk12",   
     email:"daniel@yopmial.com",
     password:"12345678"
    })

    const params={
        headers:{
            'Content-Type':'application/json'
        }
    }


let response= http.post("http://localhost:3400/users/signup",body,params)
 
check(response,{
    'is status 201?':(response)=>response.status==201,
    'contains "Account created successfully"?':response.body.includes('Account created successfully')
})

sleep(1)

}
