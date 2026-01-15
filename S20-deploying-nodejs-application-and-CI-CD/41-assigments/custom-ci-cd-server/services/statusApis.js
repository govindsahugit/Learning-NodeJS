import axios from "axios";

/**
 * Sets the GitHub Commit Status
 * @param {string} repo - The full name (e.g., "govinndsahu/Cusotm-CI-CD-Server")
 * @param {string} sha - The commit fingerprint from req.body.after
 * @param {string} state - 'pending', 'success', or 'failure'
 * @param {string} description - A short message for the user
 * @param {string} targetUrl - Link to your logs (e.g., http://your-ip/logs/sha.txt)
 */
export async function setGithubStatus(
  repo,
  sha,
  state,
  description,
  targetUrl
) {
  const GITHUB_API_URL = `https://api.github.com/repos/${repo}/statuses/${sha}`;

  try {
    await axios.post(
      GITHUB_API_URL,
      {
        state: state,
        target_url: targetUrl,
        description: description,
        context: "Custom Node CI/CD", // This is the label that appears on GitHub
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    console.log(`✅ GitHub Status updated to: ${state}`);
  } catch (error) {
    console.error(
      "❌ Failed to update GitHub Status:",
      error.response?.data || error.message
    );
  }
}
