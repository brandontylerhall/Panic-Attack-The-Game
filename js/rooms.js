/*
* figure out how to implement state
* state: 0 = locked/blocked/whatever tf
* state: 1 = unlocked/unblocked/whatever tf
* figure out the best method to implement items
*/

const rooms = {
    start: { //living room
        description: "Inside the LIVING ROOM, the stench of alcohol is inhibiting and the pandemonium of the party is deafening; you've never been around this many people, even on accident, and your socially inept neurons are turning to mush. You try to regain your composure by orienting yourself to your home: <br><br> UP above you is your room. Your home. Your safe-house. The love of your life. Your... you get the point. <br><br> STRAIGHT ahead is the KITCHEN. This is where mom makes your tendies. <br><br> BEHIND you is obviously the door to the OUTSIDE, which honestly might be a better place at this point. <br><br> To your RIGHT is the STUDY which is where MR KITTY tends to find himself. <br><br> To your LEFT is the BATHROOM.",
        directions: {
            north: "kitchen",
            up: "stairs",
            south: "outside",
            east: "study",
            west: "bathroom",
        }
    },
    kitchen: {
        description: "hhh",
        directions: {
            south: "start",
            west: "cleaning closet",
        }
    },
    cleaningCloset: {
        description: "",
        directions: {
            south: "kitchen",
        }
    },
    outside: {
        description: "",
        directions: {
            north: "start"
        }
    },
    stairs: {
        description: "You climb the stairs after what feels like an eternity. <br><br> You're finally home free. <br><br> Now, just gotta OPEN this DOOR...",
        /*idk maybe sumn like
        * "door": {
            "locked": "WHAT? IT'S LOCKED?! ... after having a total sensory meltdown, you realize the only way to get in is to find the KEY that you didn't even knew existed for the door. Maybe MR. KITTY has some insight.",
            "unlocked": "wow so nice to sleepy hehe",
        },*/
        directions: {
            down: "start"
        }
    },
    study: {
        description: "You walk inside the STUDY. The party fucks must have trashed your beloved room. On the table you see your beautiful companion MR. KITTY.",
        directions: {
            west: "start"
        }
    },
    /*one of the blow fiends could say like "we do it off the rim because of that delicious golden crust" or some shit*/
    "bathroom": {
        description: "Ah, the bathroom. It took some getting used to but you like to piss here. You put up HENTAI POSTERS because you needed motivation after mom yelled at you the last time for having your golden nectar bottles slew about your bedroom/she found the piss drawer. You just wish you didn't have to go so far to let out a fat piss. <br><br> Inside, you find yourself looking at two clearly insane demi-humans snorting blow off the rim of your toilet.",
        directions: {
            east: "start"
        }
    },
}
