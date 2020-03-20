export interface UserSchema {
  id: number;
  name: string;
  avatar: {
    medium: string;
  };
  siteUrl: string;
  options: {
    displayAdultContent: boolean;
    titleLanguage: string;
  };
}

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
    && Object.prototype.hasOwnProperty.call(data, 'siteUrl') && typeof data.siteUrl === 'string'
    // options
    && Object.prototype.hasOwnProperty.call(data, 'options') && data.options !== null && typeof data.options === 'object'
    && Object.prototype.hasOwnProperty.call(data.options, 'displayAdultContent') && typeof data.options.displayAdultContent === 'boolean'
    && Object.prototype.hasOwnProperty.call(data.options, 'titleLanguage') && typeof data.options.titleLanguage === 'string';
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
    options {
      displayAdultContent
      titleLanguage
    }
  }
}
`;
