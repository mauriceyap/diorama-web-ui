import pythonIcon from "./runtimeIconImages/python.png";
import elixirIcon from "./runtimeIconImages/elixir.png";
import scalaIcon from "./runtimeIconImages/scala.png";
import rawCodeIcon from "./sourceIconImages/rawCode.png";
import zipFileIcon from "./sourceIconImages/zipFile.png";
import gitRepoIcon from "./sourceIconImages/gitRepo.png";

export const runtimeIcons = {
  python2: pythonIcon,
  python3: pythonIcon,
  elixir: elixirIcon,
  scala: scalaIcon
};

export const runtimeLabels = {
  python2: "Python 2",
  python3: "Python 3",
  elixir: "Elixir",
  scala: "Scala"
};

export const braceEditorModes = {
  python2: "python",
  python3: "python",
  elixir: "elixir",
  scala: "scala"
};

export const runtimes = ["python2", "python3", "elixir", "scala"];

export const codeSourceIcons = {
  raw: rawCodeIcon,
  zip: zipFileIcon,
  git: gitRepoIcon
};
// These labels are consumed by Polyglot
export const codeSourceLabels = {
  raw: "rawCode",
  zip: "zipFile",
  git: "gitRepo"
};

export const defaultCodeSource = "raw";
export const defaultCodeDataForRuntime = {
  python2: "NOT IMPLEMENTED YET",
  python3:
    "def main(peer_nids, my_nid, send, receive, storage):\n" +
    "    while True:\n" +
    "        message, nid = receive()\n" +
    "        print(f'{message.decode(\"utf8\")} from {nid}')\n",
  elixir: "NOT IMPLEMENTED YET",
  scala: "NOT IMPLEMENTED YET"
};
export const defaultMainHandler = "main";

export const codeSources = ["raw", "zip", "git"];

export const defaultDescription = "";

export const fieldsToCheckDifference = [
  "codeData",
  "codeSource",
  "description",
  "mainHandler",
  "name",
  "runtime"
];

export const existingUploadingFileName = "UPLOADED";
