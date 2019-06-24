export default {
  common: {
    normalDelimiter: ", ",
    finalDelimiter: " and ",
    cancel: "cancel",
    save: "save",
    millisecondAbbreviation: "ms",
    revert: "revert",
    done: "done"
  },

  sideNav: {
    programs: "programs",
    configuration: "configuration",
    networkTopology: "network topology",
    simulation: "simulation"
  },

  home: {
    welcome: "Welcome to Diorama!",
    intro:
      "Simulate your own distributed algorithms on your own network topology",
    learn: "Learn how to use Diorama to create and run your first simulation",
    read:
      "Read the documentation for writing node programs and defining your network topology",
    showMeHow: "Show me how!",
    takeMeThere: "Take me there!"
  },

  preferencesDialog: {
    preferences: "preferences",
    colourScheme: "color scheme",
    language: "language"
  },

  colourSchemes: { default: "default", reddish: "reddish" },

  programs: {
    programs: "Programs",
    newProgram: "New program",
    lastModified: "Last modified",
    rawCode: "raw code",
    gitRepo: "Git repository",
    zipFile: "ZIP file upload",
    runtime: "runtime",
    runtimeExplanation:
      "Choose which runtime you want to write your node program for.",
    areYouSureYouWantToDeleteProgram:
      "Are you sure you want to delete %{name}?",
    itWillBeLostForever: "It will be lost forever!",
    yesIAmSure: "Yes, I'm sure!",
    noIDoNot: "No I don't",
    giveYourProgramAName: "Please give your program a name!",
    nameMustBeLowerCase: "The name must start with a lower case letter.",
    useADifferentName:
      "You already have a program called %{name}. Please call it something different!",
    chooseARuntimeError: "Please choose a runtime!",
    runtimeInvalid:
      "That runtime isn't available, so please choose another one!",
    mainFunctionInformation: {
      python3:
        "The name of the function in your code which implements the node program API."
    },
    mainHandlerInformation: {
      python3:
        'The path to the function in your code which implements the node program API. For example, if this is called "node_main" in "node.py", and "node.py" is in a directory called "app/", this would be "app.node.node_main".'
    },
    chooseARuntime: "choose a runtime",
    giveItAName: "give it a name",
    comingSoon: "coming soon!",
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
    programAPIDocumentation:
      "How do I write node programs? Click here to read the API documentation!",
    code: "code",
    dependencies: "dependencies",
    dependenciesInputInformation: {
      python3:
        "List your pip dependencies, with each on a new line like in a requirements.txt file."
    }
  },

  networkTopology: {
    networkTopology: "network topology",
    networkTopologyAPIDocumentation: "network topology API documentation",
    selfConnectedNodes: "self-connected nodes",
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

    language: "language",
    isSelfConnected: "Every node is connected to itself",
    isNotSelfConnected:
      "Unless your code says that it should, each node isn't connected to itself.",
    doubleClickInformation:
      "Double-click on node connections to add message-passing delays or success rates.",

    modifyConnection: "modify connection: %{fromNid} to %{toNid}",
    messageSendingSuccessRate: "message sending success rate",
    messageSendingDelay: "message sending delay",
    distribution: "distribution",
    parameters: "parameters",
    resetToDefault: "Reset to default"
  },

  customConfiguration: {
    customConfiguration: "custom configuration",
    baseIpAddress: "base IP address",
    baseIpAddressInformation:
      "The lowest value IP address which will be assigned to nodes during simulation.",
    networkSubnet: "network subnet",
    networkSubnetInformation:
      "The subnet on which your nodes will run in during simulation, in CIDR notation. This must contain the base IP address.",
    basePort: "Port",
    basePortInformation:
      "The port on each node which will be used to send and receive messages from other nodes."
  },

  simulation: {
    simulation: "simulation",
    manageNodes: "manage nodes",
    outputViewer: "output viewer",
    newChanges: "New changes have been made",
    stopAndReset: "Stop and reset",
    scheduleEvents: "Schedule events",

    nodeID: "node ID",
    status: "status",
    program: "program",

    node: "node",
    action: "action",
    timeMs: "time (ms)",
    start: "start",
    stop: "stop",
    pause: "pause",
    unpause: "unpause",

    stopped: "stopped",
    restarting: "restarting",
    running: "running",
    paused: "paused",

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

    filtering: "filtering",
    outputMessage: "output message",
    contains: "contains",
    doesNotContain: "does not contain",
    "regex?": "regex?",
    selectNodes: "select nodes",
    nidContains: "nid contains",
    nidDoesNotContain: "nid does not contain",

    exportData: "export data",
    downloadCSV: "download CSV",
    downloadJSON: "download JSON",
    copyToClipboard: "copy to clipboard",
    timestamp: "timestamp",
    output: "output",

    startSimulation: "start simulation"
  },

  documentation: {
    documentation: "documentation",
    intro:
      "Reference pages for our interfaces for writing node programs and defining your own network topology.",
    nodeProgramAPI: "node program API",
    networkTopologyAPI: "network topology API"
  }
};
