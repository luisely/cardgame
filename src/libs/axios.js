import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://crudcrud.com/api/5714d07c62b14393a411e62c86dfffb5/',
  timeout: 1000,
})
