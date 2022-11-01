import { useSelector, useDispatch } from 'react-redux'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/solid'
import { useEffect } from 'react'
import { Pulsar } from '@uiball/loaders'
import { AppDispatch, IStore } from '../app/store'
import HomeItem from '../components/home/HomeItem'
import { getItems, setSelectedItem } from '../features/home/homeSlice'

const Home = () => {
  const { items, selectedItem, loading, error } = useSelector(
    (store: IStore) => store.home
  )
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getItems())
  }, [])

  const nextItem = () => {
    const currentIndex = items.findIndex((item) => item.id === selectedItem?.id)

    currentIndex === items.length - 1
      ? dispatch(setSelectedItem(items[0].id))
      : dispatch(setSelectedItem(items[currentIndex + 1].id))
  }

  const previousItem = () => {
    const currentIndex = items.findIndex((item) => item.id === selectedItem?.id)

    currentIndex === 0
      ? dispatch(setSelectedItem(items[items.length - 1].id))
      : dispatch(setSelectedItem(items[currentIndex - 1].id))
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center h-full">
        <Pulsar />
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center h-full">
        <ExclamationCircleIcon className="w-12 h-12 text-red-500" />
        <p className="text-red-500">Something went wrong</p>
        <button
          onClick={getItems}
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-cyan-700 focus:outline-none"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full">
      <h1 className="text-xl font-bold leading-8 tracking-tight text-gray-800 sm:text-2xl">
        Most popular movies and TV shows
      </h1>

      <div className="flex gap-6">
        <button onClick={previousItem}>
          <ChevronLeftIcon className="h-10 w-10 text-cyan-500" />
        </button>

        <HomeItem />

        <button onClick={nextItem}>
          <ChevronRightIcon className="h-10 w-10 text-cyan-500" />
        </button>
      </div>
    </div>
  )
}

export default Home
