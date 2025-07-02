"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const vscode = require("vscode");
suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');
    test('Extension should be present', () => {
        assert.ok(vscode.extensions.getExtension('yaml-formatter'));
    });
    test('Should activate', async () => {
        const extension = vscode.extensions.getExtension('yaml-formatter');
        await extension?.activate();
        assert.ok(extension?.isActive);
    });
    test('Should register commands', async () => {
        const commands = await vscode.commands.getCommands(true);
        assert.ok(commands.includes('yamlFormatter.format'));
    });
});
//# sourceMappingURL=extension.test.js.map