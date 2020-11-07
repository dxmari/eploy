import prompts from 'prompts';
export declare const chooseTransferType: (type: number) => Promise<prompts.Answers<string>>;
export declare const chooseCloudType: (type: number) => Promise<prompts.Answers<string>>;
export declare const confirmDeleteService: () => Promise<prompts.Answers<"confirm_delete">>;
//# sourceMappingURL=prompts.d.ts.map