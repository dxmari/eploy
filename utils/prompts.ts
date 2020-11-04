import prompts from 'prompts'

export const chooseTransferType = async (type: number) => {
    var transferChoices: prompts.PromptObject = {
        type: 'select',
        name: 'transferType',
        message: 'Choose the transfer type',
    };
    var choices: prompts.Choice[] =[{
        title: (type === 1 || type === 3) ? 'Staging' : 'Production',
        value: (type === 1 || type === 3) ? 'staging' : 'production',
        selected: true
    }]
    if(type === 3) {
        choices.push({
            title : 'Production',
            value : 'production',
            selected : false
        })
    }
    transferChoices.choices = choices;
    let response = await prompts(transferChoices);
    return response;
}