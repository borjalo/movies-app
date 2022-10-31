import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { useSelector } from 'react-redux'
import { IStore } from '../app/store'
import { Link } from 'react-router-dom'

const POSTER_PATH_BASE_URL = process.env.REACT_APP_POSTER_PATH_BASE_URL

const HomeItem = () => {
  const { selectedItem } = useSelector((store: IStore) => store.home)

  return (
    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <img
        className="rounded-t-lg object-cover"
        src={`${POSTER_PATH_BASE_URL}${selectedItem?.poster_path}`}
        alt=""
      />

      <div className="p-5">
        <div className="mb-2 flex items-center justify-between gap-x-2">
          <h5 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">
            {selectedItem?.title || selectedItem?.name}
          </h5>

          <span className="inline-flex items-center rounded-md bg-cyan-100 px-2.5 py-0.5 text-sm font-medium text-cyan-800">
            {selectedItem?.vote_average}/10
          </span>
        </div>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
          {selectedItem?.overview ? selectedItem.overview : 'No overview'}
        </p>

        <Link
          to={`/details/${selectedItem?.id}`}
          className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-cyan-700 rounded-lg hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          View details
          <ArrowRightIcon className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  )
}

export default HomeItem
