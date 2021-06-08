//export const base_api:string = 'https://cewa-food.herokuapp.com'
export const base_api: string = 'http://localhost:5000'

export const login_api = base_api + '/api/auth/login'
export const refresh_token_api = base_api + '/refresh-token'

export const store_api: string = base_api + '/api/stores'
export const saved_store_api = base_api + '/api/stores/favorite'
export const food_api:string = base_api + '/api/foods'