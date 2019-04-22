export const distributions = {
  fixed: ["value"],
  uniform: ["a", "b"],
  normal: ["mean", "variance"],
  gamma: ["shape", "scale"],
  exponential: ["rate"],
  cauchy: ["location", "scale"],
  beta: ["a", "b"],
  triangle: ["a", "b", "c"]
};

export const defaultParameters = {
  successRate: 1,
  delayDistribution: "fixed",
  delayDistributionParameters: { value: 0 }
};
