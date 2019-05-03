import PropTypes from "prop-types";

export const metroIconSize = PropTypes.oneOf([
  undefined,
  "lg",
  "2x",
  "3x",
  "4x",
  "5x"
]);

export const gitRepositoryDataPropType = PropTypes.shape({
  repositoryUrl: PropTypes.string,
  checkoutBranchOrTag: PropTypes.string
});

export const programPropType = PropTypes.shape({
  name: PropTypes.string,
  runtime: PropTypes.string,
  description: PropTypes.string,
  mainMethod: PropTypes.string,
  codeSource: PropTypes.string,
  codeData: PropTypes.oneOfType([PropTypes.string, gitRepositoryDataPropType]),
  lastEdited: PropTypes.number
});

export const pPropType = PropTypes.shape({
  t: PropTypes.func.isRequired,
  tc: PropTypes.func.isRequired,
  tu: PropTypes.func.isRequired,
  tm: PropTypes.func.isRequired
});

export const userEventPropType = PropTypes.shape({
  time: PropTypes.number.isRequired,
  node: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired
});
