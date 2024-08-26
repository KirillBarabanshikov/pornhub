export interface IScriptBody {
    scriptArchive: File;
    source: string;
    action: 'load' | 'delete';
}
