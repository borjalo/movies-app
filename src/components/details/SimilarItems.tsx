import { useSelector } from 'react-redux'
import { IStore } from '../../app/store'
import { POSTER_PATH_BASE_URL } from '../../lib/constants'
import NoImage from '../../images/no-image.jpeg'

const SimilarItems = () => {
  const { selectedItem } = useSelector((store: IStore) => store.home)
  const { similarItems } = useSelector((store: IStore) => store.details)

  return (
    <div className="my-8 flex flex-col gap-y-2">
      <h2 className="text-xl font-bold tracking-tight text-gray-800">
        Similar {!selectedItem?.name ? 'movies' : 'TV shows'}
      </h2>

      <div className="grid grid-cols-4 gap-4">
        {similarItems?.map((item) => (
          <div
            key={item.id}
            className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md"
          >
            <img
              className="rounded-lg object-cover h-full"
              src={
                item.poster_path
                  ? `${POSTER_PATH_BASE_URL}${item.poster_path}`
                  : NoImage
              }
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SimilarItems
