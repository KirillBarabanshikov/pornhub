import { useQuery } from '@tanstack/react-query';
import { instance } from '@/shared/api';
import { IConfig } from '../model';

const useConfigQuery = () => {
    return useQuery<void, Error, IConfig>({
        queryKey: ['config'],
        queryFn: async () => {
            const response = await instance.get('/config');
            return response.data;
        },
        staleTime: Infinity,
    });
};

export { useConfigQuery };
