export default {
  normalDelimiter: ", ",
  finalDelimiter: " and ",

  // Python types
  int: "an integer",
  str: "a string",
  float: "a floating point number",
  complex: "a complex number",
  list: "a list",
  tuple: "a tuple",

  preferences: "preferences",
  colourScheme: "colour scheme",
  dateAndTimeFormat: "date and time format",
  language: "language",
  done: "done",

  // Colour schemes
  default: "default",
  strange: "strange",

  programs: "Programs",
  newProgram: "New program",
  lastModified: "Last modified",
  rawCode: "raw code",
  gitRepo: "Git repository",
  zipFile: "ZIP file upload",
  runtime: "runtime",
  areYouSureYouWantToDeleteProgram: "Are you sure you want to delete %{name}?",
  itWillBeLostForever: "It will be lost forever!",
  yesIAmSure: "Yes, I'm sure!",
  noIDoNot: "No I don't",
  giveYourProgramAName: "Please give your program a name!",
  nameMustBeLowerCase: "The name must start with a lower case letter.",
  useADifferentName:
    "You already have a program called %{name}. Please call it something different!",
  chooseARuntimeError: "Please choose a runtime!",
  runtimeInvalid: "That runtime isn't available, so please choose another one!",

  cancel: "cancel",
  save: "save",
  chooseARuntime: "choose a runtime",
  giveItAName: "give it a name",
  youCanAlwaysChangeItLater: "you can always change it later!",

  description: "description",
  whatDoesThisNodeDo: "What does this node do?",
  codeSource: "code source",
  mainHandler: "main handler",
  mainFunction: "main function",
  repositoryUrl: "repository URL",
  chooseZipFile: "choose zip file",
  selectedFile: "selected file",
  existingUploadedFile:
    "You've already uploaded a file, but you can overwrite it by uploading another one.",
  checkoutBranchOrTag: "Branch/tag name or commit SHA",
  programAPIDocumentation: "program API documentation",

  networkTopology: "network topology",
  networkTopologyAPIDocumentation: "network topology API documentation",
  revert: "revert",
  topologySaved: "Topology saved!",
  onlyAllowedKeys: "The only allowed keys are %{allowedKeys}.",
  NT_ERROR_PARSING:
    "There's a syntax error in your code somewhere. This is the error message: %{parserErrorMessage}",
  NT_ERROR_MAP_TYPE:
    "This needs to be a map/dictionary, but you've given %{type}.",
  NT_ERROR_BASE_KEYS:
    "You have an invalid key in your topology definition. The key, %{invalidKeys}, is not allowed. |||| You have invalid keys in your topology definition. The keys, %{invalidKeys}, are not allowed.",
  NT_ERROR_BASE_VALUE_NOT_LIST_OF_DICTS:
    "The value for %{key} must be a list of maps/dictionaries.",
  NT_ERROR_NO_NID_SINGLE_NODES:
    "All nodes in single_nodes must include a key-value pair for nid, but element %{index} of your single_nodes list doesn't.",
  NT_ERROR_NID_SINGLE_NODES_NOT_STRING:
    "The nid value for all nodes in single_nodes must be a string, but element %{index} of your single_nodes list isn't.",
  NT_ERROR_NO_PROGRAM_SINGLE_NODES:
    "All nodes in single_nodes must include a key-value pair for program, but element %{index} of your single_nodes list doesn't.",
  NT_ERROR_PROGRAM_SINGLE_NODES_NOT_STRING:
    "The program value for all nodes in single_nodes must be a string, but element %{index} of your single_nodes list isn't.",
  NT_ERROR_CONNECTIONS_SINGLE_NODES_NOT_LIST_OF_STRINGS:
    "The connections value for all nodes in single_nodes must be a list of strings, but element %{index} of your single_nodes list isn't.",
  NT_ERROR_INVALID_NID:
    "%{nid} doesn't match the pattern, [a-zA-Z0-9][a-zA-Z0-9_.-]+. All nids must match this pattern.",

  configuration: "configuration",
  customConfig: "custom configuration",
  selfConnectedNodes: "self-connected nodes",
  baseIpAddress: "base IP address",
  networkSubnet: "network subnet",
  basePort: "base port",

  simulation: "simulation",

  // constants.SimulationStateEnum
  INITIALISING: "Getting things ready",
  CREATING_VIRTUAL_NETWORK: "Setting up the virtual network",
  CREATING_PROGRAM_IMAGES: "Making images for all your programs",
  CREATING_NODES: "Making nodes",
  RESETTING: "Tearing everything down",

  startSelected: "start selected (%{numberSelected})",
  stopSelected: "stop selected (%{numberSelected})",
  pauseSelected: "pause selected (%{numberSelected})",
  unpauseSelected: "unpause selected (%{numberSelected})",

  copied: "Copied!",

  modifyConnection: "modify connection: %{fromNid} to %{toNid}",
  messageSendingSuccessRate: "message sending success rate",
  messageSendingDelay: "message sending delay",
  distribution: "distribution",
  parameters: "parameters",
  millisecondAbbreviation: "ms"
};
