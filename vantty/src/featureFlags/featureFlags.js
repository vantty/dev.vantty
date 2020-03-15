/**
 * The feature flags allows to create new funcionalitites and you can turn on or turn off in runtime
 *
 *  'name_of_feature': {
 *    enabled: process.env.NAME_OF_ENVIROMENT && JSON.parse(process.env.NAME_OF_ENVIROMENT),
 *    description: 'A little description related with the feature',
 *    creationDate: 'When you create a new feature',
 *    author: 'who create the feature'
 * }
 */
const featureFlags = {};

export default featureFlags;
