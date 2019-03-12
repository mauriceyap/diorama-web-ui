import { noop } from "./utils";
import { HTTP_SERVER_BASE_ADDRESS } from "./constants";

const ZIP_FILE_UPLOAD_ENDPOINT_PATH = "/uploadZipFile";

function httpServerFetch(
  endpointPath = "/",
  onSuccessResponse = noop(),
  onErrorResponse = noop(),
  method = "GET",
  headers = {},
  body = null,
  noCors = false
) {
  fetch(`${HTTP_SERVER_BASE_ADDRESS}${endpointPath}`, {
    method,
    headers,
    body,
    ...(noCors ? { mode: "no-cors" } : {})
  })
    .then(onSuccessResponse)
    .catch(onErrorResponse);
}

export function uploadZipFile(
  file,
  programName,
  onSuccessResponse,
  onErrorResponse
) {
  httpServerFetch(
    `${ZIP_FILE_UPLOAD_ENDPOINT_PATH}/${programName}`,
    onSuccessResponse,
    onErrorResponse,
    "POST",
    {
      "Content-Type": "application/zip"
    },
    file,
    true
  );
}
