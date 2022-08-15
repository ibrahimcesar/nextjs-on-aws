import { Construct } from "constructs";
import { RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
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

    const image = new DockerImageAsset(this, "BuildImageNextjs", {
      directory: ".",
      buildArgs: {
        platform: "linux/amd64",
      },
    });

    const repository = new ecr.Repository(this, "RepoNextjs", {
      imageScanOnPush: true,
      repositoryName: "Nextjs",
      removalPolicy: RemovalPolicy.DESTROY,
    });

    new ecrDeploy.ECRDeployment(this, "DeployDockerImage", {
      src: new ecrDeploy.DockerImageName(image.imageUri),
      dest: new ecrDeploy.DockerImageName(`${repository.repositoryUri}:latest`),
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
          image: ecs.ContainerImage.fromEcrRepository(repository),
          containerPort: 80,
          enableLogging: true,
        },
      }
    );
  }
}

export { SimpleFargate };
