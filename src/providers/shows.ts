import axios from 'axios'

export const getPopularShows = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}tv/popular?api_key=${process.env.REACT_APP_API_KEY}`
  )

  return data
}

export const getShowDetails = async (id: number) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}tv/${id}?api_key=${process.env.REACT_APP_API_KEY}`
  )

  return data
}

export const getSimilarShows = async (id: number) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}tv/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}`
  )

  return data
}
