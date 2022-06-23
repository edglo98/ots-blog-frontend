import axios from 'axios'
import qs from 'qs'

const query = qs.stringify({
  populate: '*'
}, {
  encodeValuesOnly: true
})

export const login = async (email, pass) => {
  try {
    const { data } = await axios.post(process.env.STRAPI_API_URL + `/api/auth/local?${query}`, {
      identifier: email,
      password: pass
    })
    window.localStorage.setItem('token', data.jwt)
    return data
  } catch (error) {
    throw new Error(error)
  }
}

export const register = async ({ username, email, password }) => {
  try {
    const { data } = await axios.post(process.env.STRAPI_API_URL + `/api/auth/local/register?${query}`, {
      username,
      email,
      password
    })
    window.localStorage.setItem('token', data.jwt)
    return data
  } catch (error) {
    throw new Error(error)
  }
}

export const getUserSession = async () => {
  try {
    const token = window.localStorage.getItem('token')
    if (!token) {
      return null
    }
    const { data } = await axios.get(process.env.STRAPI_API_URL + `/api/users/me?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  } catch (error) {
    throw new Error(error)
  }
}

export const sendEmail = async ({
  business_type,
  email,
  name,
  need,
  perfile_type,
  request,
  sector_type,
  phone
}) => {
  try {
    const { data } = await axios.post(process.env.STRAPI_API_URL + '/api/send-email', {
      business_type,
      email,
      name,
      need,
      perfile_type,
      request,
      sector_type,
      phone
    })
    return data
  } catch (error) {
    throw new Error(error)
  }
}
