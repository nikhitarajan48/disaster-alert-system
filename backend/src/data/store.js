import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storePath = path.join(__dirname, "store.json");

const ensureStore = async () => {
  try {
    await fs.access(storePath);
  } catch {
    const initialData = { alerts: [], resources: [], users: [] };
    await fs.writeFile(storePath, JSON.stringify(initialData, null, 2), "utf8");
  }
};

export const readStore = async () => {
  await ensureStore();
  const raw = await fs.readFile(storePath, "utf8");
  return JSON.parse(raw);
};

export const writeStore = async (data) => {
  await fs.writeFile(storePath, JSON.stringify(data, null, 2), "utf8");
};

export const createId = () => crypto.randomUUID();
