# YAML Formatter VSCode Extension

A Visual Studio Code extension for formatting YAML and YML files with customizable options.

## Features

- **Format YAML/YML files** with proper indentation and structure
- **Preserve comments** while formatting (configurable)
- **Customizable indentation** size
- **Keyboard shortcut** (Shift+Alt+F) for quick formatting
- **Command palette** integration

## Installation

### From Marketplace (When Published)
1. Open Visual Studio Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "YAML Formatter"
4. Click Install

### Local Installation (Development)
See the [Local Development & Usage](#local-development--usage) section below for detailed setup instructions.

## Usage

### Format Current Document
- Use the keyboard shortcut: `Shift+Alt+F`
- Or open Command Palette (`Ctrl+Shift+P`) and search for "Format YAML"

### Configuration

You can customize the formatter behavior through VS Code settings:

```json
{
  "yamlFormatter.indentSize": 2,
  "yamlFormatter.preserveComments": true
}
```

#### Settings

- `yamlFormatter.indentSize` (number): Number of spaces for indentation (default: 2)
- `yamlFormatter.preserveComments` (boolean): Whether to preserve comments when formatting (default: true)

## Supported File Types

- `.yaml` files
- `.yml` files

## Local Development & Usage

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Visual Studio Code

### Quick Start (Clone & Run)

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd yaml-formatter-vscode-extension
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Open in VS Code:**
   ```bash
   code .
   ```

4. **Launch the extension:**
   - Press `F5` in VS Code to open the Extension Development Host
   - A new VS Code window will open with the extension loaded

5. **Test the extension:**
   - In the new window, open any YAML file (try `samples/azure-pipelines.yml`)
   - Use `Shift+Alt+F` to format the document
   - Or use Command Palette (`Ctrl+Shift+P`) → "Format Document"

### Development Workflow

#### Building the Extension
```bash
# Compile TypeScript
npm run compile

# Watch mode for development
npm run watch
```

#### Testing the Extension
```bash
# Run automated tests
npm test

# Manual testing steps:
# 1. Press F5 to launch Extension Development Host
# 2. Open a YAML file in the new window
# 3. Test formatting with Shift+Alt+F
# 4. Verify proper indentation and structure
```

#### Debugging
1. Set breakpoints in `src/extension.ts`
2. Press `F5` to start debugging
3. Use the Extension Development Host to trigger your breakpoints
4. Check the Debug Console for output and errors

### Sample Files for Testing

The repository includes sample files in the `samples/` directory:
- `azure-pipelines.yml` - Original Azure DevOps pipeline with various YAML structures
- `corrected-azure-pipelines.yml` - Formatted version showing expected output

#### Test Cases to Try:
1. **Indentation Issues:** Mess up indentation and use formatter to fix
2. **Mixed Structures:** Test with arrays, objects, and multiline strings
3. **Large Files:** Test performance with complex YAML files
4. **Error Handling:** Try formatting invalid YAML syntax

### Configuration Testing

Test different configuration options by adding to VS Code settings:
```json
{
  "yamlFormatter.indentSize": 4,
  "yamlFormatter.preserveComments": false
}
```

### Package the Extension (Optional)

To create a `.vsix` package for distribution:
```bash
# Install vsce (VS Code Extension Manager)
npm install -g vsce

# Package the extension
vsce package
```

### Troubleshooting

**Extension not loading?**
- Check the Output panel → "Extension Host" for errors
- Ensure all dependencies are installed (`npm install`)
- Try restarting VS Code and pressing F5 again

**Formatting not working?**
- Verify the file has `.yaml` or `.yml` extension
- Check the Output panel → "YAML Formatter" for error messages
- Ensure the YAML syntax is valid before formatting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Changelog

### 1.0.0
- Initial release
- Basic YAML formatting functionality
- Configurable indentation
- Comment preservation option