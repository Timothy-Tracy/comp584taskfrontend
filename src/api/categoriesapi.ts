import dotenv from 'dotenv'
import loginapi from './login'
dotenv.config()
   
  export const getCategories= async() => {
    console.log(process.env.API_URL)
    
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
   
    const body = await response.json()
    const result = { ok: response.ok, status: response.status, statusText: response.statusText, body: body}
    console.log(response)
    console.log(body)
    return result
    
    
    


  }

  export const postCategory= async(title:string) => {
    console.log(process.env.API_URL)
    
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body:JSON.stringify({
          title: title,

      })
    })
   
    const body = await response.json()
    const result = { ok: response.ok, status: response.status, statusText: response.statusText, body: body}
    console.log(response)
    console.log(body)
    return result
  }

  export const editCategory= async(id:number, title:string) => {
    console.log(process.env.API_URL)
    
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body:JSON.stringify({
          title: title,

      })
    })
   
    
    const result = { ok: response.ok, status: response.status, statusText: response.statusText}
    console.log(response)
  
    return result
  }

  export const deleteCategory= async(id:number) => {
    console.log(process.env.API_URL)
    
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category/${id}`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
   
    
    const result = { ok: response.ok, status: response.status, statusText: response.statusText}
    console.log(response)
    return result
    
    
    


  }

  
  