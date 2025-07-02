import * as vscode from 'vscode';
import * as YAML from 'yaml';

export function activate(context: vscode.ExtensionContext) {
    console.log('YAML Formatter extension is now active!');

    // Register the format command
    const formatCommand = vscode.commands.registerCommand('yamlFormatter.format', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found');
            return;
        }

        const document = editor.document;
        if (document.languageId !== 'yaml') {
            vscode.window.showErrorMessage('Current file is not a YAML file');
            return;
        }

        formatYamlDocument(editor);
    });

    // Register document formatter
    const yamlFormatter = vscode.languages.registerDocumentFormattingEditProvider('yaml', {
        provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
            return formatYamlText(document);
        }
    });

    context.subscriptions.push(formatCommand, yamlFormatter);
}

function formatYamlDocument(editor: vscode.TextEditor) {
    const document = editor.document;
    const edits = formatYamlText(document);
    
    if (edits.length > 0) {
        const edit = new vscode.WorkspaceEdit();
        edit.set(document.uri, edits);
        vscode.workspace.applyEdit(edit);
    }
}

function formatYamlText(document: vscode.TextDocument): vscode.TextEdit[] {
    const config = vscode.workspace.getConfiguration('yamlFormatter');
    const indentSize = config.get<number>('indentSize', 2);
    const preserveComments = config.get<boolean>('preserveComments', true);

    try {
        const text = document.getText();
        const parsed = YAML.parseDocument(text);
        
        const formatted = parsed.toString({
            indent: indentSize,
            lineWidth: 0, // No line wrapping
            minContentWidth: 0
        });

        const fullRange = new vscode.Range(
            document.positionAt(0),
            document.positionAt(text.length)
        );

        return [vscode.TextEdit.replace(fullRange, formatted)];
    } catch (error) {
        vscode.window.showErrorMessage(`YAML formatting failed: ${error}`);
        return [];
    }
}

export function deactivate() {}