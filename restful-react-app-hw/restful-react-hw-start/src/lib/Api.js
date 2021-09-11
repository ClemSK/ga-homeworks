import axios from 'axios'
import { getToken } from '../components/auth/Auth'

const baseUrl = 'https://ga-winebored.herokuapp.com'

export const getAllWines = () => {
  return axios.get(`${baseUrl}/wines`)
}

export const getSingleWine = (id) => {
  return axios.get(`${baseUrl}/wines/${id}`)
}

// header is a parameter and represents meta-data associated wiht the Api response for:
// Request and Response Body
// Request Authorization
// Response Caching
// Response Cookies

export const createWine = (formData) => {
  const requestConfig = {
    // function asks for the user token to verify they are logged in and can make changes
    headers: { Authorisation: `Bearer ${getToken()}` }
  }
  return axios.post(`${baseUrl}/wines`, formData, requestConfig)
}

export const editWine = (id, formData) => {
  const requestConfig = {
    headers: { Authorisation: `Bearer ${getToken()}` }
  }
  return axios.put(`${baseUrl}/wines/${id}`, formData, requestConfig) // here we get the wine ID to identify which wine we're editing
}

export const deleteWine = (id) => {
  const requestConfig = {
    headers: { Authorisation: `Bearer ${getToken()}` }
  }
  return axios.delete(`${baseUrl}/wines/${id}`, requestConfig)
}

// AUTH METHODS

// post is used to add info to the Api
export const registerUser = (formData) => {
  return axios.post(`${baseUrl}/register`, formData)
}

// very similar to registering, here we post user information to the Api
export const loginUser = (formData) => {
  return axios.post(`${baseUrl}/login`, formData)
}
