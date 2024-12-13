import dotenv from 'dotenv'
dotenv.config()
   
  export const getAuthStatus= async() => {
    try{
      const response = await fetch(`${process.env.API_URL}/api/task/status`, {cache:'no-store',credentials:'include'})
      if(!response.ok){
        return false
      }
      if(response.status == 401){
        return false
      } else {
        return true
      }
    } catch {
      return false
    }
    


  }

  export default getAuthStatus
  