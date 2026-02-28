export type OperatingSystem = "windows" | "linux" | "osx" | string;
export type Arch = "x86" | "x64";
export type RuleAction = "allow" | "disallow";

export type OSConfig = {
  name?: OperatingSystem;
  version?: string;
  arch?: Arch;
};

export type FeaturesConfig = {
  is_demo_user?: boolean;
  has_custom_resolution?: boolean;
};

export type Rule = {
  action: RuleAction;
  os?: OSConfig;
  features?: FeaturesConfig;
};

export type ConditionalArgument = {
  rules: Rule[];
  value: string | string[];
};

export type Criteria = {
  os: OperatingSystem;
  version?: string;
  arch?: string;
  is_demo_user?: boolean;
  has_custom_resolution?: boolean;
};
