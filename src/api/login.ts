import dotenv from 'dotenv'
dotenv.config()

export const loginapi = async (username: string, password: string) => {
    console.log(process.env.API_URL)

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userName: username,
            password: password
        })
    })
    const body: any = await response.json()
    const result = { ok: response.ok, status: response.status, statusText: response.statusText, body: body }

    console.log(result)
    console.log(response)
    if (response.ok) {
        localStorage.setItem('token', body.token)
    }

    return result





}

export default loginapi
