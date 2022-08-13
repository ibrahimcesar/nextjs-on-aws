import { App } from "aws-cdk-lib";
import { SimpleFargate } from "./stack";

const app = new App();
new SimpleFargate(app, "SimpleFargate", {
  description: "PoC Fargate",
  stackName: "SimpleStackForFargate",
});

app.synth();
