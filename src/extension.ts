import * as vscode from 'vscode';
import * as iconv from 'iconv-lite';

function convertEncoding(text: string, fromEncoding: string, toEncoding: string) {
  const encodedText = iconv.encode(text, fromEncoding);

  return iconv.decode(encodedText, toEncoding);
}

export function activate(context: vscode.ExtensionContext) {
  let convertToISO = vscode.commands.registerCommand('extension.convertToISO', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const selection = editor.selection;
      const text = editor.document.getText(selection);

      const convertedText = convertEncoding(text, 'utf8', 'latin1');

      editor.edit(editBuilder => {
        editBuilder.replace(selection, convertedText);
      });
    }
  });

  let convertToUTF8 = vscode.commands.registerCommand('extension.convertToUTF8', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const selection = editor.selection;
      const text = editor.document.getText(selection);

      const convertedText = convertEncoding(text, 'latin1', 'utf8');

      editor.edit(editBuilder => {
        editBuilder.replace(selection, convertedText);
      });
    }
  });

  context.subscriptions.push(convertToISO);
  context.subscriptions.push(convertToUTF8);
}

export function deactivate() {}
