import enGbProgramPython3 from "../../userDocs/en_gb/nodeProgramAPI/python3.md";
import enGbNetworkJSON from "../../userDocs/en_gb/networkTopologyAPI/JSON.md";
import enGbNetworkYAML from "../../userDocs/en_gb/networkTopologyAPI/YAML.md";
import enProgramPython3 from "../../userDocs/en/nodeProgramAPI/python3.md";
import enNetworkJSON from "../../userDocs/en/networkTopologyAPI/JSON.md";
import enNetworkYAML from "../../userDocs/en/networkTopologyAPI/YAML.md";
import deProgramPython3 from "../../userDocs/de/nodeProgramAPI/python3.md";
import deNetworkJSON from "../../userDocs/de/networkTopologyAPI/JSON.md";
import deNetworkYAML from "../../userDocs/de/networkTopologyAPI/YAML.md";
import zhSProgramPython3 from "../../userDocs/zh_s/nodeProgramAPI/python3.md";
import zhSNetworkJSON from "../../userDocs/zh_s/networkTopologyAPI/JSON.md";
import zhSNetworkYAML from "../../userDocs/zh_s/networkTopologyAPI/YAML.md";

export default {
  "en-gb": {
    program: { python3: enGbProgramPython3 },
    network: { JSON: enGbNetworkJSON, YAML: enGbNetworkYAML }
  },
  en: {
    program: { python3: enProgramPython3 },
    network: { JSON: enNetworkJSON, YAML: enNetworkYAML }
  },
  de: {
    program: { python3: deProgramPython3 },
    network: { JSON: deNetworkJSON, YAML: deNetworkYAML }
  },
  "zh-s": {
    program: { python3: zhSProgramPython3 },
    network: { JSON: zhSNetworkJSON, YAML: zhSNetworkYAML }
  }
};
