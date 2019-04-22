import { createAction, handleActions } from "redux-actions";

const initialState = [];

function SET_ALL_PROGRAMS(state, { payload }) {
  return payload;
}

function ADD_PROGRAM(state, { payload }) {
  return [...state.filter(({ name }) => name !== payload.name), payload];
}

function MODIFY_PROGRAM(state, { payload }) {
  return state.map(program =>
    program.name === payload.name ? { ...program, ...payload } : program
  );
}

function DELETE_PROGRAM(state, { payload }) {
  return state.filter(program => program.name !== payload);
}

// Usage: setAllPrograms(allPrograms)
export const setAllPrograms = createAction("SET_ALL_PROGRAMS");
// Usage: addProgram(programObj)
export const addProgram = createAction("ADD_PROGRAM");
// Usage: modifyProgram({ name: "program name", ...someProperties })
export const modifyProgram = createAction("MODIFY_PROGRAM");
// Usage: requestConfirmDeleteProgram(programName)
export const deleteProgram = createAction("DELETE_PROGRAM");

export default handleActions(
  {
    SET_ALL_PROGRAMS,
    ADD_PROGRAM,
    MODIFY_PROGRAM,
    DELETE_PROGRAM
  },
  initialState
);
