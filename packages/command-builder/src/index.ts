import { KeyAlreadyExists } from '@syscom/core'
import parseValue from './methods/parseValue'
import validateBase from './methods/validateBase'
import validateKey from './methods/validateKey'

export default class CommandBuilder {
  private base: string = ''

  private options: { [key: string]: string } = {}

  constructor(commandBase: string) {
    this.setBase(commandBase)
  }

  public setBase(commandBase: string): CommandBuilder {
    validateBase(commandBase)
    this.base = commandBase
    return this
  }

  public addOption(key: string, value: string = ''): CommandBuilder {
    validateKey(key);
    if (key in this.options) throw new KeyAlreadyExists(key);
    this.options[key] = parseValue(value);
    return this
  }
}
