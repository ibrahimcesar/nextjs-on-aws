import { Construct } from "constructs";
import { Duration, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";

import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";
import path from "path";

class SimpleFargate extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "FargateVPC", {
      natGateways: 0,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: "ingress",
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
      ],
    });

    vpc.applyRemovalPolicy(RemovalPolicy.DESTROY);

    const cluster = new ecs.Cluster(this, "SimpleFargateCluster", {
      clusterName: "FargateCluster",
      vpc: vpc,
    });

    // Create a load-balanced Fargate service and make it public
    new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      "SimpleFargate",
      {
        cluster,
        minHealthyPercent: 100,
        desiredCount: 1, // This is the default
        cpu: 128,
        healthCheckGracePeriod: Duration.minutes(2),
        memoryLimitMiB: 1024,
        taskImageOptions: {
          image: ecs.ContainerImage.fromAsset(path.dirname("../")),
          containerPort: 3000,
        },
        publicLoadBalancer: true, // Default is false,
        assignPublicIp: true,
        openListener: true,
        circuitBreaker: { rollback: true },
        platformVersion: ecs.FargatePlatformVersion.LATEST,
      }
    );
  }
}

export { SimpleFargate };
