import axios from 'axios'
import { getToken } from '../components/auth/Auth'

const baseUrl = 'https://ga-winebored.herokuapp.com'

export const getAllWines = () => {
  return axios.get(`${baseUrl}/wines`)
}

export const getSingleWine = (id) => {
  return axios.get(`${baseUrl}/wines/${id}`)
}
 
export const createWine = (formData) => {
  const requestConfig = {
    headers: { Authorisation: `Bearer ${getToken()}` }
  }
  return axios.post(`${baseUrl}/wines`, formData, requestConfig)
}

export const editWine = (id, formData) => {
  const requestConfig = {
    headers: { Authorisation: `Bearer ${getToken()}` }
  }
  return axios.put(`${baseUrl}/wines/${id}`, formData, requestConfig)
}

// AUTH METHODS

export const registerUser = (formData) => {
  return axios.post(`${baseUrl}/register`, formData)
}

export const loginUser = (formData) => {
  return axios.post(`${baseUrl}/login`, formData)
}
