import axios from 'axios'

export const getPopularMovies = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}movie/popular?api_key=${process.env.REACT_APP_API_KEY}`
  )

  return data
}

export const getMovieDetails = async (id: number) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`
  )

  return data
}

export const getSimilarMovies = async (id: number) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}movie/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}`
  )

  return data
}
