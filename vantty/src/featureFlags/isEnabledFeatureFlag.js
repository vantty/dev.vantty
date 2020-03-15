import featureFlags from './featureFlags';

function isEnabledFeatureFlag(featureFlagName) {
  try {
    return featureFlags[featureFlagName].enabled;
  } catch {
    return false;
  }
}

export default isEnabledFeatureFlag;
