import axios from 'axios'
import qs from 'qs'

const query = qs.stringify({
  populate: '*'
}, {
  encodeValuesOnly: true
})

const backUrl = 'https://ots-back.herokuapp.com'

export const login = async (email, pass) => {
  try {
    const { data } = await axios.post(backUrl + `/api/auth/local?${query}`, {
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
    const { data } = await axios.post(backUrl + `/api/auth/local/register?${query}`, {
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
    const { data } = await axios.get(backUrl + `/api/users/me?${query}`, {
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
    const { data } = await axios.post(backUrl + '/api/send-email', {
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
