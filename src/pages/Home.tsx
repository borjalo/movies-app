import { useSelector, useDispatch } from 'react-redux'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { useEffect } from 'react'
import { AppDispatch, IStore } from '../app/store'
import HomeItem from '../components/home/HomeItem'
import { getItems, setSelectedItem } from '../features/home/homeSlice'
import ErrorState from '../components/home/ErrorState'
import LoadingState from '../components/home/LoadingState'

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
    return <LoadingState />
  }

  if (error) {
    return <ErrorState />
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
