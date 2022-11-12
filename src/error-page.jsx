import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  // Note that useRouteError provides the error that was thrown. When the user navigates to routes that don't exist you'll get an error response with a "Not Found" statusText
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
