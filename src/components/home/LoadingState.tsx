import { Pulsar } from '@uiball/loaders'

const LoadingState = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full">
      <Pulsar />

      <p>Loading...</p>
    </div>
  )
}

export default LoadingState
