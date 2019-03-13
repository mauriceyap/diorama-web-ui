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
  }
};

export function getErrorDisplayMessage(errorMessage, errorData, polyglot) {
  if (!errorData) {
    return polyglot.t(errorMessage);
  }
  return messageWithDataGetters[errorMessage](errorData, polyglot);
}
