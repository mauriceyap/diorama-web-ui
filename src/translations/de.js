export default {
  common: {
    normalDelimiter: ", ",
    finalDelimiter: " und ",
    cancel: "stornieren",
    save: "speichern",
    millisecondAbbreviation: "ms",
    revert: "zurückkehren",
    done: "erledigt"
  },

  sideNav: {
    programs: "Programme",
    configuration: "Aufbau",
    networkTopology: "Netzwerktopologie",
    simulation: "Simulation"
  },

  home: {
    welcome: "Willkommen im Diorama!",
    intro:
      "Simulierst du deine eigenen verteilten Algorithmen in deiner eigenen Netzwerktopologie",
    learn:
      "Erfährst du, wie du mit Diorama deine erste Simulation erstellst und ausführst",
    read:
      "Liest du die Dokumentation zum Schreiben von Knotenprogrammen und zum Definieren deiner Netzwerktopologie",
    showMeHow: "Zeig mir wie!",
    takeMeThere: "Bring mich dahin!"
  },

  preferencesDialog: {
    preferences: "Präferenzen",
    colourScheme: "Farbschema",
    language: "Sprache"
  },

  colourSchemes: { default: "Standard", reddish: "rot" },

  programs: {
    programs: "Programme",
    newProgram: "neues Programm",
    lastModified: "zuletzt bearbeitet um",
    rawCode: "roher Code",
    gitRepo: "Git Repository",
    zipFile: "ZIP-Datei hochladen",
    runtime: "Laufzeit",
    runtimeExplanation:
      "Wählst du die Laufzeit, für die du dein Knotenprogramm schreiben möchtest.",
    areYouSureYouWantToDeleteProgram: "Möchtest du %{name} wirklich löschen?",
    itWillBeLostForever: "Es wird für immer verloren sein!",
    yesIAmSure: "Ja, ich bin mir sicher!",
    noIDoNot: "Nein ich nicht",
    giveYourProgramAName: "Bitte gibst du deinem Programm einen Namen!",
    nameMustBeLowerCase: "Der Name muss mit einem Kleinbuchstaben beginnen.",
    useADifferentName:
      "Du hast bereits ein Programm mit dem Namen %{name}. Bitte nennst du es etwas anderes!",
    chooseARuntimeError: "Bitte wählst du eine Laufzeit!",
    runtimeInvalid:
      "Diese Laufzeit ist nicht verfügbar, wählst du also eine andere!",
    mainFunctionInformation: {
      python3:
        "Der Name der Funktion in deinem Code, die die Knotenprogramm-API implementiert."
    },
    mainHandlerInformation: {
      python3:
        'Der Pfad zu der Funktion in deinem Code, die die Knotenprogramm-API implementiert. Wenn dies beispielsweise in "node.py" "node_main" heißt und sich "node.py" in einem Verzeichnis mit dem Namen "app /" befindet, ist dies "app.node.node_main".'
    },
    chooseARuntime: "wählst du eine Laufzeit",
    giveItAName: "gib es einen Namen",
    comingSoon: "demnächst!",
    description: "Beschreibung",
    whatDoesThisNodeDo: "Was macht dieser Knoten?",
    codeSource: "Source-Code",
    mainHandler: "Main Handler",
    mainFunction: "main-Funktion",
    repositoryUrl: "Repository-URL",
    chooseZipFile: "wählen Zip-Datei",
    selectedFile: "ausgewählte Datei",
    existingUploadedFile:
      "Du hast bereits eine Datei hochgeladen, kannst diese jedoch durch Hochladen einer anderen Datei überschreiben.",
    checkoutBranchOrTag: "Zweig/Tag-Name oder Commit-SHA",
    programAPIDocumentation:
      "Wie schreibe ich Knotenprogramme? Klicken Sie hier, um die API-Dokumentation zu lesen!",
    code: "Programmcode",
    dependencies: "Abhängigkeiten",
    dependenciesInputInformation: {
      python3:
        "Listest du deine Pip-Abhängigkeiten auf, und zwar jeweils in einer neuen Zeile, wie in einer Requirements.txt-Datei."
    }
  },

  networkTopology: {
    networkTopology: "Netzwerktopologie",
    networkTopologyAPIDocumentation: "API-Dokumentation zur Netzwerktopologie",
    selfConnectedNodes: "selbstverbundene Knoten",
    topologySaved: "Topologie gespeichert!",
    onlyAllowedKeys: "Die einzigen erlaubten Schlüssel sind %{allowedKeys}.",
    NT_ERROR_PARSING:
      "Es gibt irgendwo einen Syntaxfehler in deinem Code. Dies ist die Fehlermeldung: %{parserErrorMessage}",
    NT_ERROR_MAP_TYPE:
      "Dies muss ein assoziative Datenfeld (englisch map) sein, aber du hast %{type} gegeben.",
    NT_ERROR_BASE_KEYS:
      "Du hast einen ungültigen Schlüssel in deiner Topologiedefinition. Der Schlüssel %{invalidKeys} ist nicht erlaubt. |||| Du hast ungültige Schlüssel in deiner Topologiedefinition.  Die Schlüssel, %{invalidKeys} sind nicht erlaubt.",
    NT_ERROR_BASE_VALUE_NOT_LIST_OF_DICTS:
      "Der Wert für %{key} muss eine Liste von assoziative Datenfelder (englisch map) sein.",
    NT_ERROR_NO_NID_SINGLE_NODES:
      "All nodes in single_nodes must include a key-value pair for nid, but element %{index} of your single_nodes list doesn't.", // TODO
    NT_ERROR_NID_SINGLE_NODES_NOT_STRING:
      "The nid value for all nodes in single_nodes must be a string, but element %{index} of your single_nodes list isn't.", // TODO
    NT_ERROR_NO_PROGRAM_SINGLE_NODES:
      "All nodes in single_nodes must include a key-value pair for program, but element %{index} of your single_nodes list doesn't.", // TODO
    NT_ERROR_PROGRAM_SINGLE_NODES_NOT_STRING:
      "The program value for all nodes in single_nodes must be a string, but element %{index} of your single_nodes list isn't.", // TODO
    NT_ERROR_CONNECTIONS_SINGLE_NODES_NOT_LIST_OF_STRINGS:
      "The connections value for all nodes in single_nodes must be a list of strings, but element %{index} of your single_nodes list isn't.", // TODO
    NT_ERROR_INVALID_NID:
      "%{nid} doesn't match the pattern, [a-zA-Z0-9][a-zA-Z0-9_.-]+. All nids must match this pattern.", // TODO

    language: "Programmiersprache",
    isSelfConnected: "Jeder Knoten ist mit sich selbst verbunden",
    isNotSelfConnected:
      "Sofern dein Code dies nicht vorschreibt, ist nicht jeder Knoten mit sich selbst verbunden.",
    doubleClickInformation:
      "Doppelklickst du auf Knotenverbindungen, um Verzögerungen bei der Nachrichtenübermittlung oder Erfolgsraten hinzuzufügen.",

    modifyConnection: "Knotenverbindung ändern: %{fromNid} nach %{toNid}",
    messageSendingSuccessRate: "Erfolgsrate",
    messageSendingDelay: "verzögern",
    distribution: "Verteilung",
    Parameter: "parameters",
    resetToDefault: "Zurücksetzen"
  },

  customConfiguration: {
    customConfiguration: "benutzerdefinierte Konfiguration",
    baseIpAddress: "Basis-IP-Adresse",
    baseIpAddressInformation:
      "Die niedrigste IP-Adresse, die den Knoten während der Simulation zugewiesen wird.",
    networkSubnet: "Netzwerk-Subnetz",
    networkSubnetInformation:
      "Das Subnetz, in dem deine Knoten während der Simulation ausgeführt werden. Diese muss die Basis-IP-Adresse enthalten. Verwendest du die CIDR-Notation.",
    basePort: "Port",
    basePortInformation:
      "Der Port auf jedem Knoten, der zum Senden und Empfangen von Nachrichten von anderen Knoten verwendet wird."
  },

  simulation: {
    simulation: "Simulation",
    manageNodes: "Knoten verwalten",
    outputViewer: "Ausgabe-Viewer",
    newChanges: "Es wurden neue Änderungen vorgenommen",
    stopAndReset: "Anhalten und zurücksetzen",
    scheduleEvents: "Termine planen",

    nodeID: "Knoten-ID",
    status: "Status",
    program: "Programm",

    node: "Knoten",
    action: "Aktion",
    timeMs: "Zeit (ms)",
    start: "starten",
    stop: "stoppen",
    pause: "anhalten",
    unpause: "aufnehmen",

    stopped: "gestoppt",
    restarting: "neu gestartet",
    running: "läuft",
    paused: "angehalten",

    // constants.SimulationStateEnum
    INITIALISING: "wird initialisiert",
    CREATING_VIRTUAL_NETWORK: "wird virtuelle Netzwerke erstellt",
    CREATING_PROGRAM_IMAGES: "wird deine Programme erstellt",
    CREATING_NODES: "wird Knoten erstellt",
    RESETTING: "wird zurückgesetzt",

    startSelected: "Auswahl started (%{numberSelected})",
    stopSelected: "Auswahl stoppen (%{numberSelected})",
    pauseSelected: "Auswahl anhalten (%{numberSelected})",
    unpauseSelected: "Auswahl aufnehmen (%{numberSelected})",

    copied: "Kopiert!",

    filtering: "Filterung",
    outputMessage: "Ausgabenachricht",
    contains: "enthält",
    doesNotContain: "enthält nicht",
    "regex?": "Regex?",
    selectNodes: "Knoten auswählen",
    nidContains: "nid enthält",
    nidDoesNotContain: "nid enthält nicht",

    exportData: "Daten exportieren",
    downloadCSV: "CSV-Datei herunterladen",
    downloadJSON: "JSON-Datei herunterladen",
    copyToClipboard: "in die Zwischenablage kopieren",
    timestamp: "Zeitstempel",
    output: "Ausgabe",

    startSimulation: "Simulation starten"
  },

  documentation: {
    documentation: "Dokumentation",
    intro:
      "Referenzseiten für unsere Schnittstellen zum Schreiben von Knotenprogrammen und Definieren deiner eigenen Netzwerktopologie.",
    nodeProgramAPI: "Knotenprogramm-API",
    networkTopologyAPI: "Netzwerktopologie-API"
  }
};
