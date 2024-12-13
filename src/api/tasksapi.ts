import dotenv from 'dotenv'
import loginapi from './login'
dotenv.config()
   
  export const getTasks= async() => {
    console.log("geting task")
    
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Task`, {
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
  export const toggleTask= async(id:number) => {
    console.log("geting task")
    
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Task/toggle/${id}`, {
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

  export const postTask= async(body:string) => {
    console.log(process.env.API_URL)
    
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Task`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body:JSON.stringify({
          body: body,

      })
    })
   
    const bodyy = await response.json()
    const result = { ok: response.ok, status: response.status, statusText: response.statusText, body: bodyy}
    console.log(response)
    console.log(bodyy)
    return result
  }

  export const AddTaskToCategory= async(taskId:number, categoryId: number) => {
    console.log(process.env.API_URL)
    
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Task/category`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body:JSON.stringify({
          taskId: taskId,
          categoryId: categoryId

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

  export const deleteTask= async(id:number) => {
    console.log(process.env.API_URL)
    
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Task/${id}`, {
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

  
  