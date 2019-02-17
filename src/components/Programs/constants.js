import pythonIcon from "./runtimeIconImages/python.png";
import elixirIcon from "./runtimeIconImages/elixir.png";
import scalaIcon from "./runtimeIconImages/scala.png";
import rawCodeIcon from "./sourceIconImages/rawCode.png";
import zipFileIcon from "./sourceIconImages/zipFile.png";

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

export const runtimes = ["python2", "python3", "elixir", "scala"];

export const codeSourceIcons = {
  raw: rawCodeIcon,
  zip: zipFileIcon
};
// These labels are consumed by Polyglot
export const codeSourceLabels = {
  raw: "rawCode",
  zip: "zipFile",
  git: "gitRepo"
};

export const defaultCodeSource = "raw";

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
