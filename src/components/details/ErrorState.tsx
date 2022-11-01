import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../app/store'
import { getItemDetails } from '../../features/details/detailsSlice'

interface IErrorStateProps {
  id: string | undefined
}

const ErrorState: FC<IErrorStateProps> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full">
      <ExclamationCircleIcon className="w-12 h-12 text-red-500" />

      <p className="text-red-500">Something went wrong</p>

      <button
        onClick={() => dispatch(getItemDetails({ id: Number(id) }))}
        type="button"
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-cyan-700 focus:outline-none"
      >
        Try again
      </button>
    </div>
  )
}

export default ErrorState
