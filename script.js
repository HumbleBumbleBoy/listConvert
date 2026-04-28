const copyBtn = document.getElementById('copyBtn');
const newListContainer = document.getElementById('newListContainer');
const input = document.getElementById('inputList');
const spaceCheckbox = document.getElementById('addSpace');
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

function replaceSeperator(str) {
    let result = str.replace(originalSeperator, newSeperator);
    
    // Add space after each separator if checkbox is checked
    if (spaceCheckbox.checked && newSeperator !== '\n') {
        const items = result.split(newSeperator);
        result = items.join(newSeperator + ' ');
        
        if (result.endsWith(' ')) {
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