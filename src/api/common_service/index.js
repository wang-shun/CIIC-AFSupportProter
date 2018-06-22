/**
 * Created by huangye on 2018/6/19.
 */
import axios from 'axios'

const COMMON_SERVICE_HOST = process.env.COMMON_SERVICE_HOST
const SYSTEM_MANAGE_SERVICE_HOST = process.env.SYSTEM_MANAGE_SERVICE_HOST

const CommonApi = {
  getUserInfoByToken: async (token) => {
    let response = await axios.post(`${COMMON_SERVICE_HOST}/api/getUserInfoByToken`, token)
    return await response
  },
  logout: async (token) => {
    let response = await axios.post(`${COMMON_SERVICE_HOST}/api/logout`, token)
    return await response
  },
  getMenuAuth: async (userId) => {
    let response = await axios.get(`${SYSTEM_MANAGE_SERVICE_HOST}/api/authservice/auth/getMenuAuth/${userId}?platformId=6&hasElement=false`)
    return await response.data
  },
  getPlatformAuth: async (userId) => {
    let response = await axios.get(`${SYSTEM_MANAGE_SERVICE_HOST}/api/authservice/auth/getPlatformAuth/${userId}`)
    return await response
  }
}

export {CommonApi}

