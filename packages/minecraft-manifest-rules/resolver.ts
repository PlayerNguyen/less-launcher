import { Rule, Criteria, ConditionalArgument } from "./types";

/**
 * Evaluates a list of rules against the current system criteria.
 * Follows the "first match wins" logic.
 */
export function shouldAcceptRule(
  rules: Rule[] | undefined,
  criteria: Criteria,
): boolean {
  // If rules is empty, always accept
  if (!rules || rules.length === 0) {
    return true;
  }

  for (const rule of rules) {
    // We only process if the action is 'allow'
    if (rule.action !== "allow") {
      continue;
    }

    let isMatch = true;

    // 1. Evaluate OS Constraints
    if (rule.os) {
      const { name, version, arch } = rule.os;

      // Check OS Name (e.g., "osx", "windows")
      if (name && name !== criteria.os) {
        isMatch = false;
      }

      // Check Version Range using Regex (e.g., "^10\\.")
      if (isMatch && version) {
        if (!criteria.version || !new RegExp(version).test(criteria.version)) {
          isMatch = false;
        }
      }

      // Check Architecture (e.g., "x86")
      if (isMatch && arch && arch !== criteria.arch) {
        isMatch = false;
      }
    }

    // 2. Evaluate Feature Constraints
    if (isMatch && rule.features) {
      const { is_demo_user, has_custom_resolution } = rule.features;

      if (
        is_demo_user !== undefined &&
        is_demo_user !== criteria.is_demo_user
      ) {
        isMatch = false;
      }

      if (
        isMatch &&
        has_custom_resolution !== undefined &&
        has_custom_resolution !== criteria.has_custom_resolution
      ) {
        isMatch = false;
      }
    }

    // If all conditions for this rule passed, we accept it.
    if (isMatch) {
      return true;
    }
  }

  // If no rules matched, reject by default.
  return false;
}

export function pickValue(
  conditionalArgument: ConditionalArgument,
  criteria: Criteria,
): string | string[] | undefined {
  if (!conditionalArgument.rules || conditionalArgument.rules.length === 0) {
    return conditionalArgument.value;
  }

  if (shouldAcceptRule(conditionalArgument.rules, criteria)) {
    return conditionalArgument.value;
  }

  return undefined;
}
