import http from 'k6/http'
import {sleep,check} from 'k6'


export let options={
    vus:12,
    duration:'12s'
    
}

export default function () {
    // const body= JSON.stringify({
        
        
    //       postImageUrl:"https://images.pexels.com/photos/6194122/pexels-photo-6194122.jpeg?auto=compress&cs=tinysrgb&w=600",
    //       postContent:"This is Daniel's first  Post "
         
         
    // })

    // const params={
    //     headers:{
    //         'Content-Type':'application/json',
    //          'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3OTk2ZGNmLTNlN2MtNGU1OC1hNjVkLTU5Mzg5Yjg4MWU2NSIsImZ1bGxOYW1lIjoiQWxhbWluIiwidXNlck5hbWUiOiJBbGFtaW5KdW1hIiwiZW1haWwiOiJBbGFtaW5AZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJwcm9maWxlSW1hZ2VVcmwiOiJodHRwOi8vcmVzLmNsb3VkaW5hcnkuY29tL2RweG1rZ290eS9pbWFnZS91cGxvYWQvdjE3MDI5NzczNzkvYTY4eXpsYXJ1NnZuZnBvMnE5Y3AucG5nIiwiZGF0ZUpvaW5lZCI6IkRlYyAxOSAyMDIzIDExOjI5QU0iLCJpc0RlbGV0ZWQiOjAsImlzV2VsY29tZWQiOjAsImlzUmVzZXRQYXNzd29yZEVtYWlsU2VudCI6MCwicmVzZXRQYXNzd29yZFRva2VuIjoiZW1wdHkiLCJiaW8iOiJJIGFtIGF0IHRlYWNoMmdpdmUiLCJyZXNldFRva2VuRXhwaXJ5IjpudWxsLCJyZXNldFRva2VuIjoiZW1wdHkiLCJpYXQiOjE3MDMxNDU2NzAsImV4cCI6MTcwMzE3OTY3MH0.4XJk9ThnvBzSdFmRV4KtcodNTSSUlZFysbYDAmhrCNM'
    //     },
        
    // }


// let response= http.post("http://localhost:3400/posts/new",body,params)
 
// check(response,{
//     'is status 201?':(response)=>response.status==201,
//     'contains "Post created successfully"?' :response.body.includes('Post created successfully')
// })

let response=http.get("http://localhost:3400/example")

console.log(response)

sleep(1)

}