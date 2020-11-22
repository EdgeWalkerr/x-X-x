// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "affect" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	const disposable = vscode.languages.registerHoverProvider('typescript', {
		provideHover(document, position, token) {
			const hoveredWord = document.getText(new vscode.Range(document.getWordRangeAtPosition(position)?.start || new vscode.Position(document.lineCount, 0), new vscode.Position(document.lineCount, 100)));
			console.log('start', document.getWordRangeAtPosition(position)?.start);
			console.log('document', document, 'position', position, 'token', token, 'hoveredWord', hoveredWord);
      return new vscode.Hover('I am a hover!');
    }
});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
