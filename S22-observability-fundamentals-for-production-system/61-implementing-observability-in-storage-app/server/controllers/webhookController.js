import Razorpay from "razorpay";
import Subscription from "../models/subscriptionModel.js";
import User from "../models/userModel.js";
import { spawn } from "child_process";
import crypto from "crypto";

export const PLANS = {
  plan_S8wfYi15eCR8zL: {
    storageQuotaBytes: 2 * 1024 ** 3,
  },
  plan_S8wpuHAaQpzWi2: {
    storageQuotaBytes: 2 * 1024 ** 3,
  },
  plan_S8wkQjs5WgcfEW: {
    storageQuotaBytes: 5 * 1024 ** 3,
  },
  plan_S8wsxGtrzqGL3d: {
    storageQuotaBytes: 5 * 1024 ** 3,
  },
  plan_S8wls3JKqs516M: {
    storageQuotaBytes: 10 * 1024 ** 3,
  },
  plan_S8wtzbeNBj5Q17: {
    storageQuotaBytes: 10 * 1024 ** 3,
  },
};

export const handleRazorpayWebhook = async (req, res) => {
  const signature = req.headers["x-razorpay-signature"];
  const event = req.body.event;

  req.log.info({ event }, "Razorpay webhook received");

  const isSignatureValid = Razorpay.validateWebhookSignature(
    JSON.stringify(req.body),
    signature,
    process.env.RAZORPAY_WEBHOOK_SECRET,
  );

  if (!isSignatureValid) {
    req.log.error({ event }, "Razorpay webhook signature verification failed");
    return res.end("OK");
  }

  req.log.info({ event }, "Razorpay webhook signature verified");

  if (event === "subscription.activated") {
    try {
      const rzpSubscription = req.body.payload.subscription.entity;
      const planId = rzpSubscription.plan_id;
      const rzpSubscriptionId = rzpSubscription.id;

      req.log.info(
        { rzpSubscriptionId, planId },
        "Processing subscription activation",
      );

      const subscription = await Subscription.findOne({
        razorpaySubscriptionId: rzpSubscriptionId,
      });

      if (!subscription) {
        req.log.warn(
          { rzpSubscriptionId },
          "Subscription not found in database",
        );
        return res.end("OK");
      }

      subscription.status = rzpSubscription.status;
      await subscription.save();

      const storageQuotaBytes = PLANS[planId]?.storageQuotaBytes;

      if (!storageQuotaBytes) {
        req.log.warn({ planId }, "Unknown plan ID in subscription webhook");
        return res.end("OK");
      }

      const user = await User.findById(subscription.userId);

      if (!user) {
        req.log.error(
          { userId: subscription.userId, rzpSubscriptionId },
          "User not found for subscription activation",
        );
        return res.end("OK");
      }

      user.maxStorageInBytes = storageQuotaBytes;
      await user.save();

      req.log.info(
        { userId: subscription.userId, planId, storageQuotaBytes },
        "Subscription activated and storage quota updated",
      );
    } catch (error) {
      req.log.error(
        { error: error?.message, event },
        "Error processing subscription activation webhook",
      );
    }
  } else {
    req.log.info({ event }, "Razorpay webhook event not processed");
  }

  res.end("OK");
};

export const handleGitHubWebhook = async (req, res, next) => {
  try {
    const GitHubSignature = req.headers["x-hub-signature-256"];
    const repositoryName = req.body?.repository?.name;

    req.log.info({ repositoryName }, "GitHub webhook received");

    if (!GitHubSignature) {
      req.log.warn(
        { repositoryName },
        "GitHub webhook missing signature header",
      );
      return res.end("OK");
    }

    const signature =
      "sha256=" +
      crypto
        .createHmac("sha256", "Gs12@087799")
        .update(JSON.stringify(req.body))
        .digest("hex");

    if (GitHubSignature !== signature) {
      req.log.error(
        { repositoryName },
        "GitHub webhook signature verification failed",
      );
      return res.end("OK");
    }

    req.log.info({ repositoryName }, "GitHub webhook signature verified");

    const bashFile =
      repositoryName === "StorageApp-Frontend"
        ? "deploy-frontend-ec2.sh"
        : "deploy-backend.sh";

    req.log.info({ repositoryName, bashFile }, "Spawning deployment script");

    res.end("OK");

    const bashChildProcess = spawn("bash", [`/home/ubuntu/${bashFile}`]);

    bashChildProcess.stdout.on("data", (data) => {
      req.log.info(
        { repositoryName, output: data.toString().slice(0, 100) },
        "Deployment script stdout",
      );
      process.stdout.write(data);
    });

    bashChildProcess.stderr.on("data", (data) => {
      req.log.error(
        { repositoryName, output: data.toString().slice(0, 100) },
        "Deployment script stderr",
      );
      process.stderr.write(data);
    });

    bashChildProcess.on("close", (code) => {
      if (code === 0) {
        req.log.info(
          { repositoryName, code },
          "Deployment script executed successfully",
        );
      } else {
        req.log.error(
          { repositoryName, code },
          "Deployment script execution failed",
        );
      }
    });

    bashChildProcess.on("error", (err) => {
      req.log.error(
        { repositoryName, error: err?.message },
        "Error spawning deployment process",
      );
    });
  } catch (error) {
    req.log.error({ error: error?.message }, "Failed to handle GitHub webhook");
    next(error);
  }
};
