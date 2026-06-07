#!/usr/bin/env node
// Script pour analyser chaque ligne de frontend avec ses logiques backend
const fs = require('fs');
const path = require('path');

const appPath = 'c:/Users/INFOKOM/Desktop/private-PFE-repos';

function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const relativePath = filePath.replace(appPath + path.sep, '').replace(/\\/g, '/');
    
    let result = `\n## 📄 ${relativePath}\n\n`;
    let inLogic = false;
    let logicStartLine = 0;
    
    lines.forEach((line, index) => {
      const lineNum = index + 1;
      const trimmed = line.trim();
      
      // Skip empty and comment lines
      if (!trimmed || trimmed.startsWith('//')) return;
      
      // Detect imports from lib/actions
      if (trimmed.includes('import') && trimmed.includes('from')) {
        result += `**Line ${lineNum}**: Import Backend Logic\n`;
        result += `\`\`\`typescript\n${line}\n\`\`\`\n`;
        
        // Extract what's being imported
        const match = line.match(/from\s+['"]([^'"]+)['"]/);
        if (match && match[1].includes('/lib/')) {
          const libPath = match[1];
          result += `→ **Backend**: ${libPath}\n\n`;
        }
      }
      
      // Detect function calls to backend
      if ((trimmed.includes('await') && trimmed.includes('(')) ||
          (trimmed.includes('async') && trimmed.includes('=> {'))) {
        result += `**Line ${lineNum}**: Backend Call/Async Logic\n`;
        result += `\`\`\`typescript\n${line}\n\`\`\`\n`;
        result += `→ **Type**: Async Operation\n\n`;
      }
      
      // Detect API calls
      if (trimmed.includes('fetch(') || trimmed.includes('/api/')) {
        result += `**Line ${lineNum}**: API Route\n`;
        result += `\`\`\`typescript\n${line}\n\`\`\`\n`;
        result += `→ **Type**: API Call\n\n`;
      }
      
      // Detect state management
      if (trimmed.includes('useState(') || trimmed.includes('useContext(')) {
        result += `**Line ${lineNum}**: State Management\n`;
        result += `\`\`\`typescript\n${line}\n\`\`\`\n\n`;
      }
      
      // Detect hooks
      if (trimmed.includes('use') && trimmed.includes('(')) {
        const hookMatch = trimmed.match(/use\w+\(/);
        if (hookMatch) {
          result += `**Line ${lineNum}**: Hook Usage\n`;
          result += `\`\`\`typescript\n${line}\n\`\`\`\n`;
          result += `→ **Hook**: ${hookMatch[0]}\n\n`;
        }
      }
      
      // Detect component definitions
      if (trimmed.match(/^export\s+(default\s+)?function|^const\s+\w+\s*=|^function\s+\w+/)) {
        result += `**Line ${lineNum}**: Component/Function Definition\n`;
        result += `\`\`\`typescript\n${line}\n\`\`\`\n\n`;
      }
    });
    
    return result;
  } catch (err) {
    return `\n## ❌ Error reading file: ${filePath}\n${err.message}\n`;
  }
}

function scanAndAnalyze(baseDir, maxFiles = 50) {
  const files = [];
  
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        if (!item.startsWith('.') && item !== 'node_modules') {
          walk(fullPath);
        }
      } else if ((item.endsWith('.tsx') || item.endsWith('.ts')) && item !== 'route.ts') {
        files.push(fullPath);
      }
    });
  }
  
  walk(baseDir);
  
  // Sort and limit
  files.sort();
  return files.slice(0, maxFiles);
}

// Generate report
let report = `# Rapport: Frontend Fichiers + Backend Logiques (Ligne par Ligne)\n`;
report += `Généré: ${new Date().toLocaleString()}\n\n`;
report += `Ce rapport analyse chaque fichier frontend (app + components) et identifie les logiques backend appliquées.\n\n`;

// Analyze key app files first
const appFiles = scanAndAnalyze(path.join(appPath, 'app'), 25);
report += `## 🎨 APP FILES (${appFiles.length} fichiers)\n\n`;
appFiles.forEach(file => {
  report += analyzeFile(file);
});

// Then components
report += `\n\n---\n\n## 🧩 COMPONENTS FILES\n\n`;
const componentFiles = scanAndAnalyze(path.join(appPath, 'components'), 25);
report += `${componentFiles.length} fichiers components analysés\n\n`;
componentFiles.forEach(file => {
  report += analyzeFile(file);
});

// Save report
const reportPath = path.join(appPath, 'FRONTEND_BACKEND_MAPPING_DETAILED.md');
fs.writeFileSync(reportPath, report);
console.log(`✅ Report saved: ${reportPath}`);
console.log(`📊 Total files analyzed: ${appFiles.length + componentFiles.length}`);
