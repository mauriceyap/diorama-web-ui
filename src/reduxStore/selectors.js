export const selectCustomisation = state => state.customisation;
export const selectPrograms = state => state.programs;
export const selectSocket = state => state.socket;
export const selectNetworkTopology = state => state.networkTopology;
export const selectCustomConfig = state => state.customConfig;
export const selectSimulationState = state => state.simulationState;
export const selectSimulationNodes = state => state.simulationNodes;
export const selectSimulationLogs = state => state.simulationLogs;
export const selectSimulationLogsFilter = state => state.simulationLogsFilter;
export const selectEditingConnectionParameters = state =>
  state.editingConnectionParameters;
export const selectConnectionParameters = state => state.connectionParameters;
export function selectConnectParametersFor(state, fromNid, toNid) {
  const connectionParameters = selectConnectionParameters(state);
  return connectionParameters[fromNid] && connectionParameters[fromNid][toNid]
    ? connectionParameters[fromNid][toNid]
    : {};
}
export const selectUserEvents = state => state.userEvents;
