import { isStringEmpty } from "../../utils";
// Validates a given set of program properties, retuning an array of error messages
export default function(
  program,
  fieldsToTest,
  existingProgramNames,
  runtimes,
  polyglot
) {
  const validationRules = [
    {
      field: "name",
      rule({ name }) {
        return !isStringEmpty(name);
      },
      errorMessage: "giveYourProgramAName"
    },
    {
      field: "name",
      rule({ name }) {
        return !existingProgramNames.includes(name);
      },
      errorMessage: "useADifferentName",
      messageArgs: { name: program.name }
    },
    {
      field: "runtime",
      rule({ runtime }) {
        return !isStringEmpty(runtime);
      },
      errorMessage: "chooseARuntimeError"
    },
    {
      field: "runtime",
      rule({ runtime }) {
        return runtimes.includes(runtime) || isStringEmpty(runtime);
        // an non-existent runtime technically isn't invalid
      },
      errorMessage: "runtimeInvalid"
    }
  ];

  return validationRules
    .map(({ field, rule, errorMessage, messageArgs }) =>
      !fieldsToTest.includes(field) || rule(program)
        ? null
        : polyglot.t(errorMessage, ...[messageArgs])
    )
    .filter(em => em !== null);
}
