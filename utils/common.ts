export const isJson = (params: string) => {
    try {
        return JSON.parse(params)
    } catch (e: any) {
        console.error(e)
        return false
    }
}