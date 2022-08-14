import { App } from "aws-cdk-lib";
import { SimpleFargate } from "./stackFargate";

const app = new App();

new SimpleFargate(app, "FargateStack", {
  description: "PoC NextJS and Fargate",
  stackName: "FargateNextjs",
});

app.synth();
