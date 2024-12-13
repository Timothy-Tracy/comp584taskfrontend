import dotenv from 'dotenv'
import loginapi from './login'
dotenv.config()
   
  export const createaccountapi= async(username:string, email: string,  password:string) => {
    console.log(process.env.API_URL)
    
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/seed/users/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            userName: username,
            email: email,
            password: password
        })
    })
    console.log(response)
    const body = await response.json()
    const result = { ok: response.ok, status: response.status, statusText: response.statusText, body: body}
    console.log(body)
      if(!response.ok){
        console.log(response)
        return result
      } else {
        
        console.log(response)
        console.log(body)
      }
      if(response.status == 401){
        return result
      } else {
        return result
      }
    
    


  }

  export default createaccountapi
  