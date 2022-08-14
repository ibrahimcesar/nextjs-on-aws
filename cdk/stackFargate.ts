import { Construct } from "constructs";
import { Stack, StackProps } from "aws-cdk-lib";
import { DockerImageAsset } from "aws-cdk-lib/aws-ecr-assets";

import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";
import * as ecr from "aws-cdk-lib/aws-ecr";

class SimpleFargate extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "FargateNextjs", {
      maxAzs: 2,
    });

    const cluster = new ecs.Cluster(this, "ClusterNextjs", {
      vpc,
    });

    new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      "FargateService",
      {
        cluster,
        cpu: 512,
        desiredCount: 1,
        memoryLimitMiB: 1024,
        publicLoadBalancer: true,
        taskImageOptions: {
          image: ecs.ContainerImage.fromAsset("."),
          containerPort: 80,
          enableLogging: true,
        },
      }
    );
  }
}

export { SimpleFargate };
