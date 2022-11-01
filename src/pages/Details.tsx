import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { AppDispatch, IStore } from '../app/store'
import SimilarItems from '../components/details/SimilarItems'
import {
  getItemDetails,
  getSimilarItems
} from '../features/details/detailsSlice'
import { POSTER_PATH_BASE_URL } from '../lib/constants'

const Details = () => {
  const { isMovie } = useSelector((store: IStore) => store.home)
  const { item } = useSelector((store: IStore) => store.details)
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getItemDetails({ id: Number(id), isMovie }))
    dispatch(getSimilarItems({ id: Number(id), isMovie }))
  }, [id])

  return (
    <div className="pt-10 flex flex-col gap-4 max-w-3xl mx-auto">
      <div className="flex items-center gap-x-4 self-start">
        <button onClick={() => navigate(-1)}>
          <ChevronLeftIcon className="w-10 h-10 text-cyan-500" />
        </button>

        <h1 className="text-2xl font-bold text-gray-800">Details</h1>
      </div>

      <div className="grid grid-cols-2 gap-x-4 mb-8">
        <img
          className="rounded-t-lg object-cover"
          src={`${POSTER_PATH_BASE_URL}${item?.poster_path}`}
          alt=""
        />

        <div className="flex flex-col gap-y-3">
          <h2 className="text-2xl font-bold tracking-tight text-gray-800">
            {item?.title || item?.name}
          </h2>

          <p>{item?.overview ? item.overview : 'No overview'}</p>
        </div>
      </div>

      <div className="w-full border-t border-gray-300" />

      <SimilarItems />
    </div>
  )
}

export default Details
