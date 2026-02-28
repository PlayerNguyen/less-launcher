import { describe, it, expect } from "vitest";
import { shouldAcceptRule, pickValue } from "./resolver";
import { Rule, Criteria, ConditionalArgument } from "./types";

describe("shouldAcceptRule", () => {
  it("shouldReturnTrueWhenRulesIsUndefined", () => {
    const criteria: Criteria = { os: "windows" };

    const result = shouldAcceptRule(undefined, criteria);

    expect(result).toBe(true);
  });

  it("shouldReturnTrueWhenRulesIsEmpty", () => {
    const rules: Rule[] = [];
    const criteria: Criteria = { os: "windows" };

    const result = shouldAcceptRule(rules, criteria);

    expect(result).toBe(true);
  });

  it("shouldReturnFalseWhenNoRulesHaveAllowAction", () => {
    const rules: Rule[] = [{ action: "disallow" } as any];
    const criteria: Criteria = { os: "windows" };

    const result = shouldAcceptRule(rules, criteria);

    expect(result).toBe(false);
  });

  it("shouldReturnTrueWhenOsNameMatches", () => {
    const rules: Rule[] = [{ action: "allow", os: { name: "osx" } }];
    const criteria: Criteria = { os: "osx" };

    const result = shouldAcceptRule(rules, criteria);

    expect(result).toBe(true);
  });

  it("shouldReturnFalseWhenOsNameMismatches", () => {
    const rules: Rule[] = [{ action: "allow", os: { name: "osx" } }];
    const criteria: Criteria = { os: "windows" };

    const result = shouldAcceptRule(rules, criteria);

    expect(result).toBe(false);
  });

  it("shouldReturnTrueWhenOsVersionMatchesRegex", () => {
    const rules: Rule[] = [{ action: "allow", os: { version: "^10\\." } }];
    const criteria: Criteria = { os: "windows", version: "10.0.19045" };

    const result = shouldAcceptRule(rules, criteria);

    expect(result).toBe(true);
  });

  it("shouldReturnFalseWhenOsVersionMismatchesRegex", () => {
    const rules: Rule[] = [{ action: "allow", os: { version: "^10\\." } }];
    const criteria: Criteria = { os: "windows", version: "11.0.0" };

    const result = shouldAcceptRule(rules, criteria);

    expect(result).toBe(false);
  });

  it("shouldReturnFalseWhenOsVersionIsRequiredButCriteriaVersionIsMissing", () => {
    const rules: Rule[] = [{ action: "allow", os: { version: "^10\\." } }];
    const criteria: Criteria = { os: "windows" };

    const result = shouldAcceptRule(rules, criteria);

    expect(result).toBe(false);
  });

  it("shouldReturnTrueWhenArchMatches", () => {
    const rules: Rule[] = [{ action: "allow", os: { arch: "x86" } }];
    const criteria: Criteria = { os: "windows", arch: "x86" };

    const result = shouldAcceptRule(rules, criteria);

    expect(result).toBe(true);
  });

  it("shouldReturnFalseWhenArchMismatches", () => {
    const rules: Rule[] = [{ action: "allow", os: { arch: "x86" } }];
    const criteria: Criteria = { os: "windows", arch: "arm64" };

    const result = shouldAcceptRule(rules, criteria);

    expect(result).toBe(false);
  });

  it("shouldReturnTrueWhenIsDemoUserMatches", () => {
    const rules: Rule[] = [
      { action: "allow", features: { is_demo_user: true } },
    ];
    const criteria: Criteria = { os: "windows", is_demo_user: true };

    const result = shouldAcceptRule(rules, criteria);

    expect(result).toBe(true);
  });

  it("shouldReturnFalseWhenIsDemoUserMismatches", () => {
    const rules: Rule[] = [
      { action: "allow", features: { is_demo_user: true } },
    ];
    const criteria: Criteria = { os: "windows", is_demo_user: false };

    const result = shouldAcceptRule(rules, criteria);

    expect(result).toBe(false);
  });

  it("shouldReturnTrueWhenHasCustomResolutionMatches", () => {
    const rules: Rule[] = [
      { action: "allow", features: { has_custom_resolution: false } },
    ];
    const criteria: Criteria = { os: "windows", has_custom_resolution: false };

    const result = shouldAcceptRule(rules, criteria);

    expect(result).toBe(true);
  });

  it("shouldReturnTrueWhenFirstRuleFailsButSecondRuleMatches", () => {
    const rules: Rule[] = [
      { action: "allow", os: { name: "osx" } },
      { action: "allow", os: { name: "windows" } },
    ];
    const criteria: Criteria = { os: "windows" };

    const result = shouldAcceptRule(rules, criteria);

    expect(result).toBe(true);
  });
});

describe("pickValue", () => {
  it("shouldReturnValueWhenRulesIsUndefined", () => {
    const condArg: ConditionalArgument = { value: "test-value", rules: [] };
    const criteria: Criteria = { os: "windows" };

    const result = pickValue(condArg, criteria);

    expect(result).toBe("test-value");
  });

  it("shouldReturnValueWhenRulesMatchCriteria", () => {
    const condArg: ConditionalArgument = {
      rules: [{ action: "allow", os: { name: "windows" } }],
      value: "win-value",
    };
    const criteria: Criteria = { os: "windows" };

    const result = pickValue(condArg, criteria);

    expect(result).toBe("win-value");
  });

  it("shouldReturnUndefinedWhenRulesDoNotMatchCriteria", () => {
    const condArg: ConditionalArgument = {
      rules: [{ action: "allow", os: { name: "osx" } }],
      value: "osx-value",
    };
    const criteria: Criteria = { os: "windows" };

    const result = pickValue(condArg, criteria);

    expect(result).toBeUndefined();
  });
});
