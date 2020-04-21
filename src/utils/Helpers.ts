/**
 * Deep clone object.
 */
function deepClone(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
}

export default {
  deepClone,
};
