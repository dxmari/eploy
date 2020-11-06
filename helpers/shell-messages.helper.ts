import shellJS from './../utils/shell'
import { BLUE, GREEN, RED, RESET, YELLOW } from './../utils/text-colors'
import { symError, symInfo, symSuccess, symWarning } from './../utils/symbols'

export const runShellError = async (error: string, isSymbolNeeded?: boolean) => {
    await shellJS('echo "' + (isSymbolNeeded ? symError : '') + '$(' + RED + ')' + error + '"')
}

export const runBeforeError = async (error: string, isSymbolNeeded?: boolean) => {
    await shellJS('echo "' + (isSymbolNeeded ? symWarning : '') + '$(' + YELLOW + ')' + error + '$(' + RESET + ')' + '"')
}

export const runShellSuccess = async (error: string, isSymbolNeeded?: boolean) => {
    await shellJS('echo "' + (isSymbolNeeded ? symSuccess : '') + '$(' + GREEN + ')' + error + '$(' + RESET + ')' + '"')
}

export const runInfoMsg = async (error: string, isSymbolNeeded?: boolean) => {
    await shellJS('echo "' + (isSymbolNeeded ? symInfo : '') + '$(' + BLUE + ')' + error + '$(' + RESET + ')' + '"')
}