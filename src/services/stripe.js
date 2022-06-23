import axios from 'axios'

const LOOKUP_KEY = 'OTS_SUB'

export const createStripeCheckoutSession = async (userId) => {
  try {
    const token = window.localStorage.getItem('token')
    if (!token) {
      return null
    }
    const { data } = await axios.post(process.env.STRAPI_API_URL + '/api/create-checkout-session', {
      lookup_key: LOOKUP_KEY,
      user_id: userId
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  } catch (error) {
    throw new Error(error)
  }
}

export const createStripePortalSession = async (sessionId, subId) => {
  try {
    const token = window.localStorage.getItem('token')
    if (!token) {
      return null
    }
    const { data } = await axios.post(process.env.STRAPI_API_URL + '/api/create-portal-session', {
      session_id: sessionId,
      sub_id: subId
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  } catch (error) {
    throw new Error(error)
  }
}
