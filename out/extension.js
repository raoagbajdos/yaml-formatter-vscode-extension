"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const YAML = require("yaml");
function activate(context) {
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
        provideDocumentFormattingEdits(document) {
            return formatYamlText(document);
        }
    });
    context.subscriptions.push(formatCommand, yamlFormatter);
}
exports.activate = activate;
function formatYamlDocument(editor) {
    const document = editor.document;
    const edits = formatYamlText(document);
    if (edits.length > 0) {
        const edit = new vscode.WorkspaceEdit();
        edit.set(document.uri, edits);
        vscode.workspace.applyEdit(edit);
    }
}
function formatYamlText(document) {
    const config = vscode.workspace.getConfiguration('yamlFormatter');
    const indentSize = config.get('indentSize', 2);
    const preserveComments = config.get('preserveComments', true);
    try {
        const text = document.getText();
        const parsed = YAML.parseDocument(text);
        const formatted = parsed.toString({
            indent: indentSize,
            lineWidth: 0,
            minContentWidth: 0
        });
        const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(text.length));
        return [vscode.TextEdit.replace(fullRange, formatted)];
    }
    catch (error) {
        vscode.window.showErrorMessage(`YAML formatting failed: ${error}`);
        return [];
    }
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map