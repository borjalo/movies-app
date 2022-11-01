import { Pulsar } from '@uiball/loaders'

const LoadingState = () => {
  return (
    <div className="h-full flex flex-col gap-2 items-center justify-center">
      <Pulsar />
      <p>Loading...</p>
    </div>
  )
}

export default LoadingState
