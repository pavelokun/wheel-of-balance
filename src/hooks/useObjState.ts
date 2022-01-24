import { useState } from "react";
import _ from "lodash";

export default function useObjState<T>(
  initialState: T
): [T, (newState: Partial<T> | ((prevState: T) => Partial<T>)) => void] {
  const [state, setState] = useState<T>(initialState);

  const setMergedState = (newState: Partial<T> | Function) =>
    setState((prevState) => ({
      ...prevState,
      ...(_.isFunction(newState) ? newState(prevState) : newState),
    }));

  return [state as T, setMergedState];
}
