const fs = require('fs');
const path = require('path');

const directory = 'c:/Users/madha/OneDrive/Attachments/New site 1/src';

const replacements = {
    'bg-[#0B1120]': 'bg-[#090B14]',
    'bg-[#111827]': 'bg-[#151B2E]',
    'bg-[#0F172A]': 'bg-[#101522]',
    '#0B1120': '#090B14',
    '#111827': '#151B2E',
    '#0F172A': '#101522',
    'from-accent-blue to-accent-purple': 'from-accent-blue to-accent-cyan',
    'rgba(37, 99, 235, 0.5)': 'rgba(124, 58, 237, 0.15)',
    'rgba(37, 99, 235, 0.3)': 'rgba(124, 58, 237, 0.1)',
    'rgba(59, 130, 246, 0.5)': 'rgba(124, 58, 237, 0.15)',
    'rgba(59, 130, 246, 0.3)': 'rgba(124, 58, 237, 0.1)',
    'rgba(59,130,246,0.5)': 'rgba(124,58,237,0.15)',
    'rgba(59,130,246,0.3)': 'rgba(124,58,237,0.1)',
    'rgba(6, 182, 212, 0.5)': 'rgba(20, 184, 166, 0.15)',
    'rgba(6, 182, 212, 0.3)': 'rgba(20, 184, 166, 0.1)',
    'rgba(6,182,212,0.15)': 'rgba(20,184,166,0.05)',
    'rgba(6,182,212,0.35)': 'rgba(20,184,166,0.1)',
    'rgba(139, 92, 246, 0.5)': 'rgba(124, 58, 237, 0.15)',
    'rgba(139,92,246,0.5)': 'rgba(124,58,237,0.15)',
    'rgba(139, 92, 246, 0.3)': 'rgba(124, 58, 237, 0.1)',
    'rgba(139,92,246,0.3)': 'rgba(124,58,237,0.1)',
    'bg-accent-blue/10': 'bg-accent-blue/3',
    'bg-accent-purple/10': 'bg-accent-purple/3',
    'bg-accent-blue/5': 'bg-accent-blue/2',
    'bg-accent-purple/5': 'bg-accent-purple/2',
    'bg-accent-cyan/10': 'bg-accent-cyan/3',
    'bg-accent-cyan/5': 'bg-accent-cyan/2',
    'bg-accent-cyan/20': 'bg-accent-cyan/5',
    'bg-accent-blue/20': 'bg-accent-blue/5',
    'bg-accent-purple/20': 'bg-accent-purple/5',
    'border-accent-blue/20': 'border-accent-blue/10',
    'border-accent-purple/20': 'border-accent-purple/10',
    'border-accent-cyan/20': 'border-accent-cyan/10',
    'border-accent-cyan/30': 'border-accent-cyan/15',
    'border-accent-cyan/40': 'border-accent-cyan/15',
    'border-accent-blue/30': 'border-accent-blue/15',
    'border-accent-purple/30': 'border-accent-purple/15',
    "['#3b82f6', '#8b5cf6', '#06b6d4', '#ffffff']": "['#7C3AED', '#14B8A6', '#F8FAFC', '#94A3B8']"
};

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let newContent = content;
            for (const [oldStr, newStr] of Object.entries(replacements)) {
                newContent = newContent.split(oldStr).join(newStr);
            }
            if (newContent !== content) {
                fs.writeFileSync(fullPath, newContent, 'utf8');
                console.log('Updated ' + file);
            }
        }
    }
}

walkDir(directory);
