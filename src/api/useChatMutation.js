import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const useChatMutation = ({ onSuccess, onError } = {}) => {
  return useMutation({
    mutationFn: async (message) => {
      const res = await axios.post(`${API_URL}/chat`, { message });
      return res.data.reply;
    },
    onSuccess,
    onError,
  });
};

export default useChatMutation;
