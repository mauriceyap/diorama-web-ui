import { noop } from "./utils";
import { HTTP_SERVER_BASE_ADDRESS } from "./constants";

const ZIP_FILE_UPLOAD_ENDPOINT_PATH = "/uploadZipFile";
const SAVE_NETWORK_TOPOLOGY_ENDPOINT_PATH = "/saveNetworkTopology";

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

export function saveNetworkTopology(
  rawNetworkTopology,
  language,
  onSuccessResponse,
  onErrorResponse
) {
  httpServerFetch(
    SAVE_NETWORK_TOPOLOGY_ENDPOINT_PATH,
    onSuccessResponse,
    onErrorResponse,
    "POST",
    {
      "Content-Type": "application/json"
    },
    JSON.stringify({ rawNetworkTopology, language }),
    true
  );
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
