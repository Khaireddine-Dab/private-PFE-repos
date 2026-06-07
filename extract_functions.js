#!/usr/bin/env node
// Script pour extraire toutes les fonctions des fichiers frontend
const fs = require('fs');
const path = require('path');

const appPath = 'c:/Users/INFOKOM/Desktop/private-PFE-repos';
const scanDirs = [
  path.join(appPath, 'app'),
  path.join(appPath, 'components')
];

const functionRegex = /^(export\s+)?(async\s+)?(function|const)\s+(\w+)|^(export\s+default\s+function)|^\s*(const|function)\s+(\w+)\s*=|^\s*export\s+(const|function)\s+(\w+)/gm;

function extractFunctions(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const functions = [];

    lines.forEach((line, index) => {
      const lineNum = index + 1;
      
      // Pattern: function name() {}
      if (/^(export\s+)?(async\s+)?function\s+(\w+)/.test(line)) {
        const match = line.match(/function\s+(\w+)/);
        if (match) functions.push({ name: match[1], line: lineNum, type: 'function' });
      }
      
      // Pattern: const name = () => {}
      if (/^\s*(export\s+)?(const|let)\s+(\w+)\s*=\s*\(.*\)\s*=>|^\s*(export\s+)?(const|let)\s+(\w+)\s*=\s*async\s*\(.*\)\s*=>|^\s*(export\s+)?(const|let)\s+(\w+)\s*=\s*\{/.test(line)) {
        const match = line.match(/(const|let)\s+(\w+)\s*=/);
        if (match) functions.push({ name: match[2], line: lineNum, type: 'const/arrow' });
      }
      
      // Pattern: export default function
      if (/^export\s+default\s+function\s+(\w+)/.test(line)) {
        const match = line.match(/function\s+(\w+)/);
        if (match) functions.push({ name: match[1], line: lineNum, type: 'default export' });
      }
    });

    return functions;
  } catch (err) {
    return [];
  }
}

function scanDirectory(dir, ext = ['.ts', '.tsx']) {
  const files = [];
  
  function walk(currentPath) {
    if (!fs.existsSync(currentPath)) return;
    
    const items = fs.readdirSync(currentPath);
    items.forEach(item => {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        if (!item.startsWith('.') && item !== 'node_modules') {
          walk(fullPath);
        }
      } else if (ext.includes(path.extname(item)) && item !== 'route.ts') {
        files.push(fullPath);
      }
    });
  }
  
  walk(dir);
  return files;
}

// Generate report
let report = '# Rapport Complet: Fonctions Frontend\n\n';
report += `Généré: ${new Date().toLocaleString()}\n\n`;

scanDirs.forEach(baseDir => {
  const dirName = path.basename(baseDir).toUpperCase();
  report += `## 📂 ${dirName} - Toutes les Fonctions\n\n`;
  
  const files = scanDirectory(baseDir);
  files.sort();
  
  files.forEach(filePath => {
    const relativePath = filePath.replace(appPath + path.sep, '').replace(/\\/g, '/');
    const functions = extractFunctions(filePath);
    
    if (functions.length > 0) {
      report += `### ${relativePath}\n`;
      functions.forEach(fn => {
        report += `- **${fn.name}** (line ${fn.line}) - type: \`${fn.type}\`\n`;
      });
      report += '\n';
    }
  });
});

console.log(report);

// Save to file
const reportPath = path.join(appPath, 'FRONTEND_FUNCTIONS_COMPLETE.md');
fs.writeFileSync(reportPath, report);
console.log(`\n✅ Report saved to: ${reportPath}`);
