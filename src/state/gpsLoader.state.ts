import { create } from "zustand";

type GpsLoaderState = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const useGpsLoader = create<GpsLoaderState>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));

export default useGpsLoader;
