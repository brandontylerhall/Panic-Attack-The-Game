let currentRoom = "start";
let commands = ["go", "pickup", "inventory", "talk"];
let inventory = [];
const gameText = document.getElementById('game-text');
const speechText = document.getElementById('char-text');
const charName = document.getElementById('char-speech');
const buttons = document.getElementById('buttons');
let state = {};


/*
* this function will either replace the text on screen with the next room's description if you went a possible direction
* or it will tell you how stupid you are for not following the navigation cues
*/
function changeRoom(dir) {
    if (rooms[currentRoom].directions[dir] !== undefined) {
        currentRoom = rooms[currentRoom].directions[dir]
        gameText.innerHTML = rooms[currentRoom].description;
    } else {
        $('#game-text').append("<br><br> <p>Seeing as there isn't a door in that direction, you walk right into a wall. You feel like a big ol' dumbass, as you should.</p>");
    }
}

/*
* this function will show you a few important commands to get you going if you get stuck
*/
function showHelp() {
    $('#game-text').append("<p>Here are the possible commands: </p>");
    $('#game-text').append("<p><ul>");
    for (let i = 0; i < commands.length; i++) {
        $('#game-text').append("<li>" + commands[i] + "</li>");
    }
    $('#game-text').append("</ul></p>");
}

/*
* this will show you what items you're carrying
*/
function showInventory() {
    if (inventory.length === 0) {
        $('#game-text').append("<p>You are not carrying anything!</p>");
        return;
    }
    $('#game-text').append("<p>Here is your inventory: </p>");
    $('#game-text').append("<p><ul>");
    for (let i = 0; i < inventory.length; i++) {
        $('#game-text').append("<li>" + inventory[i] + "</li>");
    }
    $('#game-text').append("</ul></p>");
}

/*
* this function takes what the player has written and splits the string at the space
* it then looks at the first word to check what to do next
* if it is "go," it will then look at what direction you are going, etc
*/
function playerInput(input) {
    let command = input.split(" ")[0];
    switch (command) {
        /***********************************/
        case "go":
            let dir = input.split(" ")[1];
            switch (dir) {
                case "straight" || "north":
                    dir = "north"
                    break;
                case "inside":
                    dir = "north"
                    break;
                case "down" || "south":
                    dir = "south"
                    break;
                case "outside":
                    dir = "south"
                    break;
                case "behind":
                    dir = "south"
                    break;
                case "right" || "east":
                    dir = "east"
                    break;
                case "left" || "west":
                    dir = "west"
                    break;
            }
            changeRoom(dir);
            break;
        /***********************************/
        case "talk":
            let npc = input.split(" ")[1];
            switch (npc) {

            }
            talkTo(npc);
            break;
        /***********************************/
        case "help":
            showHelp();
            break;
        /***********************************/
        case "inventory":
            showInventory();
            break;
        default:
            $('#game-text').append("<br><br> <p>Invalid command!</p>");
    }
}

/* this function iterates through the dialogue object, extracting the necessary data and pushes it out to the speech interface */
function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    speechText.innerHTML = `<p> ${textNode.text} </p>`

    while (buttons.firstChild) {
        buttons.removeChild(buttons.firstChild)
    }
    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            buttons.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

/* this function iterates through the dialogue object, extracting the necessary data and pushes it out to the speech buttons */
function selectOption(option) {
    const nextTextNodeId = option.nextText
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

/*
* this is what makes the actual game start
* it is wrapped inside a timeout because of the title card
* it replaces the title card with the actual game text 1 second after the title card fade out
*/
// setTimeout(() => {
$(document).ready(() => {
    gameText.innerHTML = rooms.start.description;
    showTextNode(1);
    state = {};

    $(document).keypress(function (key) {
        if (key.which === 13 && $('#user-input').is(':focus')) {
            let value = $('#user-input').val().toLowerCase();
            $('#user-input').val("");
            playerInput(value);
        }
    })
})
// }, 7000)