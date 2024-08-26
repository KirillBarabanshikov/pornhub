import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { instance } from '@/shared/api';
import { IScriptBody } from './types.ts';

const useScriptMutation = (options?: UseMutationOptions<void, Error, IScriptBody>) => {
    return useMutation<void, Error, IScriptBody>({
        mutationFn: (body) => {
            const formData = new FormData();

            formData.append('script_archive', body.scriptArchive);
            formData.append('source', body.source);
            formData.append('action', body.action);
            formData.append('script_name', body.scriptArchive.name.split('.zip')[0]);

            return instance.post('/script', formData);
        },
        ...options,
    });
};

export { useScriptMutation };
