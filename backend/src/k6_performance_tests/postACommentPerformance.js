import http from 'k6/http'
import {sleep,check} from 'k6'


export let options={
    vus:1,
    duration:'1s'
}

export default function () {
    const body= JSON.stringify({
        
        
        commentContent:"this is a Daniel's first  Comment"
         
    })

    const params={
        headers:{
            'Content-Type':'application/json',
             'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3OTk2ZGNmLTNlN2MtNGU1OC1hNjVkLTU5Mzg5Yjg4MWU2NSIsImZ1bGxOYW1lIjoiQWxhbWluIiwidXNlck5hbWUiOiJBbGFtaW5KdW1hIiwiZW1haWwiOiJBbGFtaW5AZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJwcm9maWxlSW1hZ2VVcmwiOiJodHRwOi8vcmVzLmNsb3VkaW5hcnkuY29tL2RweG1rZ290eS9pbWFnZS91cGxvYWQvdjE3MDI5NzczNzkvYTY4eXpsYXJ1NnZuZnBvMnE5Y3AucG5nIiwiZGF0ZUpvaW5lZCI6IkRlYyAxOSAyMDIzIDExOjI5QU0iLCJpc0RlbGV0ZWQiOjAsImlzV2VsY29tZWQiOjAsImlzUmVzZXRQYXNzd29yZEVtYWlsU2VudCI6MCwicmVzZXRQYXNzd29yZFRva2VuIjoiZW1wdHkiLCJiaW8iOiJJIGFtIGF0IHRlYWNoMmdpdmUiLCJyZXNldFRva2VuRXhwaXJ5IjpudWxsLCJyZXNldFRva2VuIjoiZW1wdHkiLCJpYXQiOjE3MDMxNDU2NzAsImV4cCI6MTcwMzE3OTY3MH0.4XJk9ThnvBzSdFmRV4KtcodNTSSUlZFysbYDAmhrCNM'
        },
        
    }


let response= http.post("http://localhost:3400/comments/new/02b56d7e-20ea-4d1c-8644-4934c3ef4d42",body,params)
 
check(response,{
    'is status 201?':(response)=>response.status==201,
    'contains "comment added"?':response.body.includes('comment added')
})

    sleep(1)

}