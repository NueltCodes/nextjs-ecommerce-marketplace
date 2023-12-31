import { create } from "zustand";

interface RegisterModalStore {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRegisterModal = create<RegisterModalStore>((set) => ({
  open: true,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));

export default useRegisterModal;
