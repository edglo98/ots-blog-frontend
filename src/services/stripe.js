import axios from 'axios'

const LOOKUP_KEY = 'OTS-PREMIUM'

const apiUrl = 'https://ots-back.herokuapp.com'

export const createStripeCheckoutSession = async (userId) => {
  try {
    const token = window.localStorage.getItem('token')
    if (!token) {
      return null
    }
    const { data } = await axios.post(apiUrl + '/api/create-checkout-session', {
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
    const { data } = await axios.post(apiUrl + '/api/create-portal-session', {
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
