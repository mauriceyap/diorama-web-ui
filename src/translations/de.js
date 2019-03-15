export default {
  normalDelimiter: ", ",
  finalDelimiter: " and ",

  // Python types
  int: "einen Integer-Wert",
  str: "ein String",
  float: "floating point number",
  complex: "eine komplexe Zahl",
  list: "eine Liste",
  tuple: "ein Tupel",

  preferences: "Präferenzen",
  colourScheme: "Farbschema",
  dateAndTimeFormat: "Datums- und Zeitformat",
  language: "Sprache",
  done: "erledigt",

  // Colour schemes
  default: "Standard",
  strange: "seltsam",

  programs: "Programme",
  newProgram: "neues Programm",
  lastModified: "zuletzt bearbeitet um",
  rawCode: "roher Code",
  gitRepo: "Git Repository",
  zipFile: "ZIP-Datei hochladen",
  runtime: "Laufzeit",
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

  cancel: "stornieren",
  save: "speichern",
  chooseARuntime: "wählst du eine Laufzeit",
  giveItAName: "gib es einen Namen",
  youCanAlwaysChangeItLater: "Du kannst es später ändern!",

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

  networkTopology: "Netzwerktopologie",
  revert: "zurückkehren",
  topologySaved: "Topologie gespeichert!",
  onlyAllowedKeys: "Die einzigen erlaubten Schlüssel sind %{allowedKeys}.",
  NT_ERROR_PARSING:
    "Es gibt irgendwo einen Syntaxfehler in deinem Code. Dies ist die Fehlermeldung: %{parserErrorMessage}",
  NT_ERROR_MAP_TYPE:
    "Dies muss ein assoziative Datenfeld (englisch map) sein, aber du hast %{type} gegeben.",
  NT_ERROR_BASE_KEYS:
    "Du hast einen ungültigen Schlüssel in deiner Topologiedefinition. Der Schlüssel %{invalidKeys} ist nicht erlaubt. |||| Du hast ungültige Schlüssel in deiner Topologiedefinition.  Die Schlüssel, %{invalidKeys} sind nicht erlaubt."
};
