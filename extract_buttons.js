#!/usr/bin/env node
// Script pour extraire tous les boutons et éléments interactifs
const fs = require('fs');
const path = require('path');

const appPath = 'c:/Users/INFOKOM/Desktop/private-PFE-repos';

function extractButtons(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const relativePath = filePath.replace(appPath + path.sep, '').replace(/\\/g, '/');
    
    let result = `\n## 📄 ${relativePath}\n\n`;
    let fileInfo = {
      path: relativePath,
      buttons: [],
      forms: [],
      links: []
    };
    
    lines.forEach((line, index) => {
      const lineNum = index + 1;
      const trimmed = line.trim();
      
      // Find Button elements
      if (trimmed.includes('<Button') || trimmed.includes('Button')) {
        // Extract button props and text
        let buttonInfo = {
          line: lineNum,
          code: line.substring(0, 100),
          type: 'Button'
        };
        
        if (trimmed.includes('onClick')) {
          const match = trimmed.match(/onClick={(\w+)}/);
          if (match) buttonInfo.handler = match[1];
        }
        
        if (trimmed.includes('variant')) {
          const match = trimmed.match(/variant=['"]([\w-]+)['"]/);
          if (match) buttonInfo.variant = match[1];
        }
        
        fileInfo.buttons.push(buttonInfo);
      }
      
      // Find form submissions
      if (trimmed.includes('onSubmit') || trimmed.includes('<form')) {
        fileInfo.forms.push({
          line: lineNum,
          code: trimmed.substring(0, 80)
        });
      }
      
      // Find links
      if (trimmed.includes('<Link') || trimmed.includes('useRouter')) {
        fileInfo.links.push({
          line: lineNum,
          code: trimmed.substring(0, 80)
        });
      }
    });
    
    // Format result
    if (fileInfo.buttons.length > 0) {
      result += `### 🔘 Buttons (${fileInfo.buttons.length})\n\n`;
      fileInfo.buttons.forEach(btn => {
        result += `**Line ${btn.line}**: ${btn.type}\n`;
        if (btn.handler) result += `- Handler: \`${btn.handler}()\`\n`;
        if (btn.variant) result += `- Variant: \`${btn.variant}\`\n`;
        result += `- Code: \`${btn.code}\`\n\n`;
      });
    }
    
    if (fileInfo.forms.length > 0) {
      result += `### 📋 Forms (${fileInfo.forms.length})\n\n`;
      fileInfo.forms.forEach(form => {
        result += `**Line ${form.line}**: \`${form.code}\`\n\n`;
      });
    }
    
    if (fileInfo.links.length > 0) {
      result += `### 🔗 Links/Navigation (${fileInfo.links.length})\n\n`;
      fileInfo.links.forEach(link => {
        result += `**Line ${link.line}**: \`${link.code}\`\n\n`;
      });
    }
    
    return result;
  } catch (err) {
    return ``;
  }
}

function scanDirectory(dir) {
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
      } else if ((item.endsWith('.tsx') || item.endsWith('.ts')) && item !== 'route.ts') {
        files.push(fullPath);
      }
    });
  }
  
  walk(dir);
  return files;
}

// Generate report
let report = `# 🎨 Rapport Détaillé: Fichiers Frontend + Buttons + Actions\n\n`;
report += `Généré: ${new Date().toLocaleString()}\n\n`;

// App files
report += `## 📂 APP FILES - Interactive Elements\n\n`;
const appFiles = scanDirectory(path.join(appPath, 'app'));
appFiles.sort().forEach(file => {
  report += extractButtons(file);
});

// Save report
const reportPath = path.join(appPath, 'FRONTEND_DETAILED_BUTTONS.md');
fs.writeFileSync(reportPath, report);
console.log(`✅ Report saved: ${reportPath}`);
