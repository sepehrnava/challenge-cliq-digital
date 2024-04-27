import { create } from "zustand";

type CityLoaderState = {
  loading: boolean | string;
  setLoading: (loading: CityLoaderState["loading"]) => void;
};

const useCityLoader = create<CityLoaderState>((set) => ({
  loading: false,
  setLoading: (loading: CityLoaderState["loading"]) => set({ loading }),
}));

export default useCityLoader;
