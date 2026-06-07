#!/usr/bin/env node
// Script pour extraire tous les imports lib et fonctions utilisées dans les fichiers .tsx
const fs = require('fs');
const path = require('path');

const appPath = 'c:/Users/INFOKOM/Desktop/private-PFE-repos';

function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relativePath = filePath.replace(appPath + path.sep, '').replace(/\\/g, '/');
    
    const fileInfo = {
      path: relativePath,
      libImports: [],
      functionsUsed: [],
      hooksUsed: []
    };
    
    // Extract all imports from lib/
    const importRegex = /import\s+(?:{([^}]+)}|([a-zA-Z0-9_]+))\s+from\s+['"](@\/lib[^'"]+)['"]/g;
    let match;
    
    while ((match = importRegex.exec(content)) !== null) {
      const destructured = match[1] || match[2];
      const libPath = match[3];
      
      // Parse destructured items
      const items = destructured.split(',').map(s => s.trim()).filter(s => s);
      
      fileInfo.libImports.push({
        libPath: libPath,
        items: items
      });
    }
    
    // Extract function calls from imported lib functions
    fileInfo.libImports.forEach(imp => {
      imp.items.forEach(item => {
        // Look for function calls
        const functionCallRegex = new RegExp(`${item}\\s*\\(`, 'g');
        let funcMatch;
        let count = 0;
        
        while ((funcMatch = functionCallRegex.exec(content)) !== null) {
          count++;
        }
        
        if (count > 0) {
          fileInfo.functionsUsed.push({
            name: item,
            calls: count,
            from: imp.libPath
          });
        }
      });
    });
    
    // Extract hook usage
    const hooksRegex = /use[A-Z]\w+\(/g;
    let hookMatch;
    const hooks = new Set();
    
    while ((hookMatch = hooksRegex.exec(content)) !== null) {
      const hookName = hookMatch[0].slice(0, -1); // Remove trailing (
      hooks.add(hookName);
    }
    
    fileInfo.hooksUsed = Array.from(hooks);
    
    return fileInfo;
  } catch (err) {
    return null;
  }
}

function scanTsxFiles(dir) {
  const files = [];
  
  function walk(currentPath) {
    if (!fs.existsSync(currentPath)) return;
    
    const items = fs.readdirSync(currentPath);
    items.forEach(item => {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        if (!item.startsWith('.') && item !== 'node_modules' && item !== 'api') {
          walk(fullPath);
        }
      } else if (item.endsWith('.tsx')) {
        files.push(fullPath);
      }
    });
  }
  
  walk(dir);
  return files.sort();
}

// Generate report
let report = `# 📋 Rapport Complet: Fichiers Frontend (.tsx) + Imports LIB + Fonctions\n\n`;
report += `Généré: ${new Date().toLocaleString()}\n\n`;
report += `## 📊 Index\n\n`;

const appFiles = scanTsxFiles(path.join(appPath, 'app'));
console.log(`Found ${appFiles.length} .tsx files in app/`);

const allStats = {
  totalFiles: appFiles.length,
  filesWithLibImports: 0,
  totalLibImports: 0,
  allLibPaths: new Set(),
  allFunctions: new Map()
};

// First pass: collect stats
appFiles.forEach(file => {
  const info = analyzeFile(file);
  if (info && info.libImports.length > 0) {
    allStats.filesWithLibImports++;
    allStats.totalLibImports += info.libImports.length;
    info.libImports.forEach(imp => {
      allStats.allLibPaths.add(imp.libPath);
      imp.items.forEach(item => {
        allStats.allFunctions.set(item, (allStats.allFunctions.get(item) || 0) + 1);
      });
    });
  }
});

report += `- **Total .tsx files**: ${allStats.totalFiles}\n`;
report += `- **Files with lib imports**: ${allStats.filesWithLibImports}\n`;
report += `- **Total lib import statements**: ${allStats.totalLibImports}\n`;
report += `- **Unique lib modules**: ${allStats.allLibPaths.size}\n`;
report += `- **Unique functions imported**: ${allStats.allFunctions.size}\n\n`;

report += `---\n\n`;

// Generate detailed report
report += `## 📁 FICHIERS DÉTAILLÉS\n\n`;

appFiles.forEach(file => {
  const info = analyzeFile(file);
  if (!info) return;
  
  report += `### 📄 ${info.path}\n\n`;
  
  if (info.libImports.length === 0) {
    report += `**Status**: Aucun import de lib/\n\n`;
    return;
  }
  
  report += `#### 📚 Imports LIB (${info.libImports.length})\n\n`;
  info.libImports.forEach(imp => {
    report += `**Module**: \`${imp.libPath}\`\n`;
    report += `**Imports**: ${imp.items.map(i => `\`${i}\``).join(', ')}\n\n`;
  });
  
  if (info.functionsUsed.length > 0) {
    report += `#### 🔧 Fonctions Utilisées (${info.functionsUsed.length})\n\n`;
    info.functionsUsed.forEach(func => {
      report += `- **${func.name}** (from ${func.from}) - Called ${func.calls} time(s)\n`;
    });
    report += `\n`;
  }
  
  if (info.hooksUsed.length > 0) {
    report += `#### 🪝 Hooks Utilisées (${info.hooksUsed.length})\n\n`;
    report += info.hooksUsed.map(h => `- \`${h}()\``).join('\n');
    report += `\n\n`;
  }
});

// Summary section
report += `\n---\n\n`;
report += `## 📊 STATISTIQUES GLOBALES\n\n`;

report += `### Top 15 Fonctions Importées les Plus Utilisées\n\n`;
const sorted = Array.from(allStats.allFunctions.entries())
  .sort((a, b) => b[1] - a[1])
  .slice(0, 15);

sorted.forEach(([func, count], idx) => {
  report += `${idx + 1}. **${func}** - Utilisée dans ${count} fichier(s)\n`;
});

report += `\n### Modules LIB les Plus Importés\n\n`;
const libModules = Array.from(allStats.allLibPaths).sort();
libModules.forEach(mod => {
  report += `- \`${mod}\`\n`;
});

// Save report
const reportPath = path.join(appPath, 'FRONTEND_LIB_IMPORTS_COMPLETE.md');
fs.writeFileSync(reportPath, report);
console.log(`✅ Report saved: ${reportPath}`);
console.log(`📊 Statistics:`);
console.log(`   - Total files: ${allStats.totalFiles}`);
console.log(`   - With lib imports: ${allStats.filesWithLibImports}`);
console.log(`   - Unique functions: ${allStats.allFunctions.size}`);
