export default class extends Error {
  constructor( key: string ) {
    super(`Key "${key}" already exists`);
  }
};