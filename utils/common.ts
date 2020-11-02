export const isJson = (params: string) => {
    try {
        return JSON.parse(params)
    } catch (e: any) {
        return false
    }
}