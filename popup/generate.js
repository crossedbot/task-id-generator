// dateToNumber returns the date as a number representation in the format
// <year><month><date>; E.g. Sept. 26 2020 -> 2020926
function dateToNumber(d) {
    str = String(d.getFullYear()) + (d.getMonth() + 1) + d.getDate();
    return Number(str);
}

// randomString returns an alphabetical string of n length.
function randomString(n) {
    var characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var str = '';
    for (var i = 0; i < n; i++) {
        str += characters.charAt(Math.floor(characters.length * Math.random()));
    }
    return str
}

// copyId copies the task identifier to the clipboard as plain text.
function copyId(event) {
    const taskId = document.getElementById('taskId').firstChild;
    const txt = taskId.firstChild.nodeValue;

    function copy(event) {
        event.clipboardData.setData("text/plain", txt);
        event.preventDefault();
    }
    
    document.addEventListener('copy', copy);
    document.execCommand('copy');
    document.removeEventListener('copy', copy);
    
    taskId.getElementsByClassName('tooltip-text')[0].innerHTML = 'Copied';
}

// generateTaskId generates a new task identifier.
function generateTaskId() {
    const  PREFIX_LENGTH = 5;
    const d = new Date();
    const prefix = randomString(PREFIX_LENGTH);
    const suffix = dateToNumber(d);
    
    let id = document.createElement('p');
    id.innerHTML = prefix + '-' + suffix;
    id.addEventListener('click', copyId);
    id.addEventListener('mouseout', function() {
        tooltip.innerHTML = 'Copy';
    });

    let tooltip = document.createElement('span');
    tooltip.classList.add('tooltip-text');
    tooltip.innerHTML = 'Copy';
    id.appendChild(tooltip);
    
    let taskId = document.getElementById('taskId');
    taskId.removeChild(taskId.firstChild);
    taskId.appendChild(id);
}

// listen setups the extensions event listeners.
function listen() {
    document.getElementById('generateTaskIdBtn').
        addEventListener('click', generateTaskId);
}

try {
    listen();
    generateTaskId();
} catch(err) {
    ele = document.createElement('p');
    ele.classList.add('red');
    ele.innerHTML = err;
    taskId.removeChild(taskId.firstChild);
    document.getElementById('taskId').appendChild(ele);
};