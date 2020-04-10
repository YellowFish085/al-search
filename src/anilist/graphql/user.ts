/**
 * Validate that the given data is a valid UserSchema object.
 *
 * @param data Data to check.
 */
export function UserSchemaCheck(data: any): boolean {
  return data !== null
    && typeof data === 'object'
    // id
    && Object.prototype.hasOwnProperty.call(data, 'id') && Number.isInteger(data.id)
    // name
    && Object.prototype.hasOwnProperty.call(data, 'name') && typeof data.name === 'string'
    // avatar
    && Object.prototype.hasOwnProperty.call(data, 'avatar') && data.avatar !== null && typeof data.avatar === 'object'
    && Object.prototype.hasOwnProperty.call(data.avatar, 'medium') && typeof data.avatar.medium === 'string'
    // siteUrl
    && Object.prototype.hasOwnProperty.call(data, 'siteUrl') && typeof data.siteUrl === 'string';
}

export default `
query {
  Viewer {
    id
    name
    avatar {
      medium
    }
    siteUrl
  }
}
`;
