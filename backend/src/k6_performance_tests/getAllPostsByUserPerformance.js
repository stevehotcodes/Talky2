import http from 'k6/http'
import {sleep,check} from 'k6'


export const option={
    vus:1,
    duration:'1s'
}


export default function(){
    const params={
             headers:{
                'Content-Type':'application/json',
                'token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3OTk2ZGNmLTNlN2MtNGU1OC1hNjVkLTU5Mzg5Yjg4MWU2NSIsImZ1bGxOYW1lIjoiQWxhbWluIiwidXNlck5hbWUiOiJBbGFtaW5KdW1hIiwiZW1haWwiOiJBbGFtaW5AZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJwcm9maWxlSW1hZ2VVcmwiOiJodHRwOi8vcmVzLmNsb3VkaW5hcnkuY29tL2RweG1rZ290eS9pbWFnZS91cGxvYWQvdjE3MDI5NzczNzkvYTY4eXpsYXJ1NnZuZnBvMnE5Y3AucG5nIiwiZGF0ZUpvaW5lZCI6IkRlYyAxOSAyMDIzIDExOjI5QU0iLCJpc0RlbGV0ZWQiOjAsImlzV2VsY29tZWQiOjAsImlzUmVzZXRQYXNzd29yZEVtYWlsU2VudCI6MCwicmVzZXRQYXNzd29yZFRva2VuIjoiZW1wdHkiLCJiaW8iOiJJIGFtIGF0IHRlYWNoMmdpdmUiLCJyZXNldFRva2VuRXhwaXJ5IjpudWxsLCJyZXNldFRva2VuIjoiZW1wdHkiLCJpYXQiOjE3MDMxNTM5NjcsImV4cCI6MTcwMzE4Nzk2N30.G-qwCrrSGS_EHQeK0wKhSW2hf9Ko-wnUhE0AKSBsOBI"
            }
    
    }


    let response=http.post('http://localhost:3400/posts/user',params)



    check(response,{
        'is status 200?': (response)=>response.status===200
    })

    sleep(1)
}