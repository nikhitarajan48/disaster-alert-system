import { calculateDistanceKm } from "../utils/distance.js";
import { createId, readStore, writeStore } from "../data/store.js";

export const getResources = async (req, res, next) => {
  try {
    const { type } = req.query;
    const store = await readStore();
    const resources = store.resources
      .filter((resource) => (type ? resource.type === type : true))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(resources);
  } catch (error) {
    next(error);
  }
};

export const createResource = async (req, res, next) => {
  try {
    const store = await readStore();
    const resource = {
      _id: createId(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    store.resources.unshift(resource);
    await writeStore(store);
    res.status(201).json(resource);
  } catch (error) {
    next(error);
  }
};

export const updateResource = async (req, res, next) => {
  try {
    const store = await readStore();
    const index = store.resources.findIndex((item) => item._id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: "Resource not found." });
    }

    const updated = {
      ...store.resources[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    store.resources[index] = updated;
    await writeStore(store);

    const resource = updated;
    res.json(resource);
  } catch (error) {
    next(error);
  }
};

export const deleteResource = async (req, res, next) => {
  try {
    const store = await readStore();
    const exists = store.resources.some((item) => item._id === req.params.id);

    if (!exists) {
      return res.status(404).json({ message: "Resource not found." });
    }

    store.resources = store.resources.filter((item) => item._id !== req.params.id);
    await writeStore(store);

    res.json({ message: "Resource deleted successfully." });
  } catch (error) {
    next(error);
  }
};

export const getNearestResources = async (req, res, next) => {
  try {
    const { latitude, longitude, limit = 5 } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: "latitude and longitude are required." });
    }

    const userLat = Number(latitude);
    const userLng = Number(longitude);
    const store = await readStore();
    const resources = store.resources;

    const nearest = resources
      .map((resource) => ({
        ...resource,
        distanceKm: calculateDistanceKm(userLat, userLng, resource.latitude, resource.longitude)
      }))
      .sort((a, b) => a.distanceKm - b.distanceKm)
      .slice(0, Number(limit));

    res.json(nearest);
  } catch (error) {
    next(error);
  }
};
