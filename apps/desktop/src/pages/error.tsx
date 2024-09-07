import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export const ErrorPage = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1 color="white">Oops, something went wrong!</h1>
        <h2>Try re-opening the app.</h2>
        <p>{error.statusText}</p>
      </div>
    )
  }

  return <p>Oops, something went wrong! Try re-opening the app.</p>
}
