import redisClient from "../config/redis.js";

export const setSession = async (user) => {
  const sessionId = crypto.randomUUID();
  const sessionKey = `session:${sessionId}`;

  await redisClient.json.set(sessionKey, "$", {
    userId: user._id,
    rootDirId: user.rootDirId,
    role: user.role,
  });

  await redisClient.expire(sessionKey, 60 * 60 * 24 * 7);

  return { sessionId };
};

export const getUserSessions = async (userId) => {
  const sessionKeys = await redisClient.keys("session:*");
  const sessions = [];

  for (const key of sessionKeys) {
    const sessionData = await redisClient.json.get(key, {
      path: "$.userId",
    });
    if (userId === sessionData[0]) sessions.push(key);
  }

  return sessions;
};

export const deleteUserSessions = async (userId) => {
  const sessionKeys = await getUserSessions(userId);
  await redisClient.del(sessionKeys);
  return { keys: { ...sessionKeys } };
};
