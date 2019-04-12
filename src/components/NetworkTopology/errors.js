import { createListString } from "../../utils";
import { ALLOWED_BASE_KEYS } from "./constants";

const messageWithDataGetters = {
  NT_ERROR_PARSING(data, polyglot) {
    return polyglot.t("NT_ERROR_PARSING", {
      parserErrorMessage: data
    });
  },
  NT_ERROR_MAP_TYPE(data, polyglot) {
    return polyglot.t("NT_ERROR_MAP_TYPE", {
      type: polyglot.t(data)
    });
  },
  NT_ERROR_BASE_KEYS(data, polyglot) {
    return (
      polyglot.t("NT_ERROR_BASE_KEYS", {
        invalidKeys: createListString(
          data,
          polyglot.t("normalDelimiter"),
          polyglot.t("finalDelimiter")
        ),
        smart_count: data.length
      }) +
      " " +
      polyglot.t("onlyAllowedKeys", {
        allowedKeys: createListString(
          ALLOWED_BASE_KEYS,
          polyglot.t("normalDelimiter"),
          polyglot.t("finalDelimiter")
        )
      })
    );
  },
  NT_ERROR_BASE_VALUE_NOT_LIST_OF_DICTS(data, polyglot) {
    return polyglot.t("NT_ERROR_BASE_VALUE_NOT_LIST_OF_DICTS", { key: data });
  },
  NT_ERROR_NO_NID_SINGLE_NODES(data, polyglot) {
    return polyglot.t("NT_ERROR_NO_NID_SINGLE_NODES", { index: data });
  },
  NT_ERROR_NO_PROGRAM_SINGLE_NODES(data, polyglot) {
    return polyglot.t("NT_ERROR_NO_PROGRAM_SINGLE_NODES", { index: data });
  },
  NT_ERROR_NID_SINGLE_NODES_NOT_STRING(data, polyglot) {
    return polyglot.t("NT_ERROR_NID_SINGLE_NODES_NOT_STRING", { index: data });
  },
  NT_ERROR_PROGRAM_SINGLE_NODES_NOT_STRING(data, polyglot) {
    return polyglot.t("NT_ERROR_PROGRAM_SINGLE_NODES_NOT_STRING", {
      index: data
    });
  },
  NT_ERROR_CONNECTIONS_SINGLE_NODES_NOT_LIST_OF_STRINGS(data, polyglot) {
    return polyglot.t("NT_ERROR_CONNECTIONS_SINGLE_NODES_NOT_LIST_OF_STRINGS", {
      index: data
    });
  },
  NT_ERROR_INVALID_NID(data, polyglot) {
    return polyglot.t("NT_ERROR_INVALID_NID", { nid: data });
  }
};

export function getErrorDisplayMessage(errorMessage, errorData, polyglot) {
  if (!errorData) {
    return polyglot.t(errorMessage);
  }
  return messageWithDataGetters[errorMessage](errorData, polyglot);
}
