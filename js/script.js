let currentRoom = "start";
let commands = ["go", "pickup", "inventory", "talk"];
let inventory = ["sword", "shield"];
let gameText = document.getElementById('game-text');


/*
* this function will either replace the text on screen with the next room's description if you went a possible direction
* or it will tell you how stupid you are for not following the navigation cues
*/
function changeRoom(dir) {
    if (rooms[currentRoom].directions[dir] !== undefined) {
        currentRoom = rooms[currentRoom].directions[dir]
        gameText.innerHTML = rooms[currentRoom].description;
    } else {
        $('#game-text').append("<p>Seeing as there isn't a door in that direction, you walk right into a wall. You feel like a big ol' dumbass, as you should.</p>");
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
* if it is "go," it will then look at what direction you are going
*/
function playerInput(input) {
    let command = input.split(" ")[0];
    switch (command) {
        case "go":
            let dir = input.split(" ")[1];
            changeRoom(dir);
            break;
        case "help":
            showHelp();
            break;
        case "inventory":
            showInventory();
            break;
        default:
            $('#game-text').append("<p>Invalid command!</p>");
    }
}

/*
* this is what makes the actual game start
* it is wrapped inside a timeout because of the title card
* it replaces the title card with the actual game text 1 second after the title card fade out
*/
setTimeout(() => {
    $(document).ready(function() {
        gameText.innerHTML = rooms.start.description;

        $(document).keypress(function(key) {
            if (key.which === 13 && $('#user-input').is(':focus')) {
                let value = $('#user-input').val().toLowerCase();
                $('#user-input').val("");
                playerInput(value);
            }
        })
    })
}, 7000)