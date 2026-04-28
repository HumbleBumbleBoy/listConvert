const copyBtn = document.getElementById('copyBtn');
const newListContainer = document.getElementById('newListContainer');
const input = document.getElementById('inputList');
let originalSeperator = /\r?\n|\r/g;
let newSeperator = ', ';

function updateOrgiginalSeperator() {
    let val = document.getElementById('oldSepSelect').value;
    if (val === "newline") {
        originalSeperator = /\r?\n|\r/g;
    } else if (val === "comma") {
        originalSeperator = /,/g;
    } else if (val === "period") {
        originalSeperator = /./g;
    }
}

function updateNewSeperator() {
    let val = document.getElementById('newSepSelect').value;
    if (val === "newline") {
        newSeperator = '\n';
    } else if (val === "comma") {
        newSeperator = ',';
    } else if (val === "period") {
        originalSeperator = '.';
    }
}

function replaceSeperator(str) {
    return str.replace(originalSeperator, newSeperator);
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