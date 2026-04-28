const copyBtn = document.getElementById('copyBtn');
const newListContainer = document.getElementById('newListContainer');
const input = document.getElementById('inputList');
const spaceCheckbox = document.getElementById('addSpace');
const newLineCheckbox = document.getElementById('addNewLine');
let originalSeperator = /\r?\n|\r/g;
let newSeperator = ',';

function updateOrgiginalSeperator() {
    let val = document.getElementById('oldSepSelect').value;
    if (val === "") {
        originalSeperator = /\r?\n|\r/g;
    } else {
        originalSeperator = new RegExp(escapeRegex(val), 'g');
    }
}

function updateNewSeperator() {
    let val = document.getElementById('newSepSelect').value;
    if (val == "") {
        newSeperator = '\n';
    } else {
        newSeperator = val; 
    }
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function cleanWhitespace(str, separator) {
    // Split by the separator while preserving empty items (for leading/trailing separators)
    let items = str.split(separator);
    
    // Trim whitespace from each item
    items = items.map(item => item.trim());
    items = items.filter(item => item !== '');
    
    return items;
}

function replaceSeperator(str) {
    let result = str.trim();

    result = result.replace(originalSeperator, newSeperator);

    const tempSeparator = newSeperator === '\n' ? '\n' : newSeperator;
    const cleanedItems = cleanWhitespace(result, tempSeparator);
    
    result = cleanedItems.join(newSeperator);
    
    // Handle space formatting
    if (spaceCheckbox.checked && newSeperator !== '\n' && newSeperator !== '') {
        const items = result.split(newSeperator);
        result = items.join(newSeperator + ' ');
        
        // Remove trailing space if it exists
        if (result.endsWith(' ')) {
            result = result.slice(0, -1);
        }
    }
    
    if (newLineCheckbox.checked && newSeperator !== '\n') {
        const items = result.split(newSeperator);
        result = items.join(newSeperator + '\n');
        
        // Remove trailing newline if it exists
        if (result.endsWith('\n')) {
            result = result.slice(0, -1);
        }
    }
    
    return result;
}

function convertList() {
    updateOrgiginalSeperator();
    updateNewSeperator();
    const modifiedInput = replaceSeperator(input.value);
    newListContainer.textContent = modifiedInput;
}

copyBtn.addEventListener('click', async () => {
    try {
        let textToCopy = newListContainer.textContent;
        await navigator.clipboard.writeText(textToCopy);
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '✅ COPIED!';
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 1800);
    } catch (err) {
        console.warn('Clipboard copy failed', err);
    }
});