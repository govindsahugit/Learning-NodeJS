import axios from "axios";
import fs from "fs/promises";
import yaml from "js-yaml";

export const getFormattedDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
};

export const parsedYaml = async (yamlFile) => {
  let yamlContent = await fs.readFile(yamlFile, "utf8");

  // Replace ${VARIABLE} with process.env.VARIABLE
  yamlContent = yamlContent.replace(/\${(\w+)}/g, (match, key) => {
    return process.env[key] || match;
  });

  const data = yaml.load(yamlContent);

  return data;
};

export const checkHealth = async (url, retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url);
      if (response.status === 200) return true;
    } catch (err) {
      console.log(`Health check attempt ${i + 1} failed. Retrying...`);
      // Wait 2 seconds before retrying
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
  return false;
};
