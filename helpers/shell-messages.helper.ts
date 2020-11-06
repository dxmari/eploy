import shellJS from './../utils/shell'
import { GREEN, RED, RESET, YELLOW } from './../utils/text-colors'
import { symError, symSuccess, symWarning } from './../utils/symbols'

export const runShellError = async (error: string, isSymbolNeeded?: boolean) => {
    await shellJS('echo "' + (isSymbolNeeded ? symError : '') + '$(' + RED + ')' + error + '"')
}

export const runBeforeError = async (error: string, isSymbolNeeded?: boolean) => {
    await shellJS('echo "' + (isSymbolNeeded ? symWarning : '') + '$(' + YELLOW + ')' + error + '$(' + RESET + ')' + '"')
}

export const runShellSuccess = async (error: string, isSymbolNeeded?: boolean) => {
    await shellJS('echo "' + (isSymbolNeeded ? symSuccess : '') + '$(' + GREEN + ')' + error + '$(' + RESET + ')' + '"')
}