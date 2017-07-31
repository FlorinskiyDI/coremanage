import { Action } from 'redux';
/**
 *  * This function coerces a string into a string literal type.
 * Using tagged union types in TypeScript 2.0, this enables
 * powerful typechecking of our reducers.
 *
 * Since every action label passes through this function it
 * is a good place to ensure all of our action labels
 * are unique.
 *
 * @type {{}}
 */

let typeCache: { [label: string]: boolean } = {};
export function type<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unique"`);
  }
  typeCache[<string>label] = true;
  return <T>label;
}

// export interface IPayloadAction<T> extends Action {
//   payload?: T;
// }

export interface IPayloadAction<P, M> extends Action {
  payload?: P;
  error?: any;
	meta?: M;
}

export interface IBaseStateApi<TD, TM>{
    meta: TM;
    data :TD;
    error: any;
    isLoading: boolean;
    isError: boolean;
}