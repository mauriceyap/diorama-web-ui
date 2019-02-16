import pythonIcon from "./runtimeIconImages/python.png";
import elixirIcon from "./runtimeIconImages/elixir.png";
import scalaIcon from "./runtimeIconImages/scala.png";
import rawCodeIcon from "./sourceIconImages/rawCode.png";

export const runtimeIcons = {
  python2: pythonIcon,
  python3: pythonIcon,
  elixir: elixirIcon,
  scala: scalaIcon
};

export const runtimeLabels = {
  python2: 'Python 2',
  python3: 'Python 3',
  elixir: 'Elixir',
  scala: 'Scala'
};

export const runtimes = ['python2', 'python3', 'elixir', 'scala'];

export const codeSourceIcons = {
  raw: rawCodeIcon
};
// These labels are consumed by Polyglot
export const codeSourceLabels = {
  raw: "rawCode"
};
