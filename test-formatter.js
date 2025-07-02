const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Read the input YAML file
const inputFile = path.join(__dirname, 'samples', 'azure-pipelines.yml');
const outputFile = path.join(__dirname, 'samples', 'corrected-azure-pipelines.yml');

console.log('Testing YAML Formatter...');
console.log('Input file:', inputFile);
console.log('Output file:', outputFile);

try {
  // Read the original YAML content
  const yamlContent = fs.readFileSync(inputFile, 'utf8');
  console.log('\n✓ Original YAML file read successfully');
  
  // Parse and reformat the YAML
  const parsedYaml = yaml.load(yamlContent);
  console.log('✓ YAML parsed successfully');
  
  // Format with consistent indentation (2 spaces) and preserve comments
  const formattedYaml = yaml.dump(parsedYaml, {
    indent: 2,
    lineWidth: 120,
    noRefs: true,
    quotingType: '"',
    forceQuotes: false,
    sortKeys: false,
    noCompatMode: true
  });
  
  console.log('✓ YAML formatted successfully');
  
  // Add back the header comments (since yaml.dump doesn't preserve top-level comments)
  const headerComments = `# Azure Pipelines YAML Sample for Testing YAML Formatter
# This file contains various YAML structures to test formatting functionality
# Corrected and formatted version

`;
  
  const finalContent = headerComments + formattedYaml;
  
  // Write the corrected YAML file
  fs.writeFileSync(outputFile, finalContent, 'utf8');
  console.log('✓ Corrected YAML file written successfully');
  
  console.log('\n🎉 YAML formatting test completed!');
  console.log(`📁 Check the corrected file at: ${outputFile}`);
  
  // Show some stats
  const originalLines = yamlContent.split('\n').length;
  const formattedLines = finalContent.split('\n').length;
  console.log(`\n📊 Stats:`);
  console.log(`   Original lines: ${originalLines}`);
  console.log(`   Formatted lines: ${formattedLines}`);
  
} catch (error) {
  console.error('❌ Error during YAML formatting:', error.message);
  process.exit(1);
}
