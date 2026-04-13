import { createId, readStore, writeStore } from "../data/store.js";

export const getAlerts = async (req, res, next) => {
  try {
    const store = await readStore();
    const alerts = [...store.alerts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    res.json(alerts);
  } catch (error) {
    next(error);
  }
};

export const createAlert = async (req, res, next) => {
  try {
    const { title, description, location, severity } = req.body;
    const store = await readStore();

    const alert = {
      _id: createId(),
      title,
      description,
      location,
      severity,
      timestamp: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    store.alerts.unshift(alert);
    await writeStore(store);
    res.status(201).json(alert);
  } catch (error) {
    next(error);
  }
};

export const updateAlert = async (req, res, next) => {
  try {
    const store = await readStore();
    const index = store.alerts.findIndex((item) => item._id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: "Alert not found." });
    }

    const updated = {
      ...store.alerts[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    store.alerts[index] = updated;
    await writeStore(store);

    const alert = updated;
    res.json(alert);
  } catch (error) {
    next(error);
  }
};

export const deleteAlert = async (req, res, next) => {
  try {
    const store = await readStore();
    const exists = store.alerts.some((item) => item._id === req.params.id);

    if (!exists) {
      return res.status(404).json({ message: "Alert not found." });
    }

    store.alerts = store.alerts.filter((item) => item._id !== req.params.id);
    await writeStore(store);

    res.json({ message: "Alert deleted successfully." });
  } catch (error) {
    next(error);
  }
};
