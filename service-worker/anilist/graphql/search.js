import * as Enum from '../../../shared/enums-esm.js';

export default class Search {
  /**
   * Validate that the given data is a valid search response.
   */
  static schemaIsValid(data, type) {
    return data !== null
      && typeof data === 'object'
      // {}.Page
      && Object.prototype.hasOwnProperty.call(data, 'Page') && typeof data === 'object'
      // {}.Page.X
      && Object.prototype.hasOwnProperty.call(data.Page, Enum.ResponseTypeKeys[type]) && Array.isArray(data.Page[Enum.ResponseTypeKeys[type]])
  }
}