import data from "../Data/data.json";

export const fetchProviders = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};
export const fetchProviderById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const provider = data.find((p) => p.id === parseInt(id));
      if (provider) {
        resolve(provider);
      } else {
        reject(new Error("Provider not found"));
      }
    }, 500);
  });
};
