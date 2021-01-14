const readlineSync = require('readline-sync');

const name = readlineSync.question('Welcome, adventurer what is your name? ');

readlineSync.question(`hello ${name} welcome to the world of dragon quest. Your very own journey is about to begin! (press Any button to start) `);

const enemies = ['slime', 'drake', 'golem','dragon', 'ghost'];
const items = ['health potion', 'mana potion', 'gold' , 'armor', 'sword'];
let inventory = [];
let healthPoints = 20;
const actions = ['Walk', 'Print Inventory', 'Exit Game'];

function game() {
    let attackPower = Math.floor(Math.random() * (10 - 5) + 1) + 3;
    let enemyAttackPower = Math.floor(Math.random() * (5- 2) + 1) + 2;
    let enemyHealth = Math.floor(Math.random() * (5 - 5 + 1)) +  25;
    let enemy = enemies[Math.floor(Math.random() * enemies.length)];
    const enemyOptions = ['Run', 'Attack'];
    let newItem = items[Math.floor(Math.random() * items.length)];

    while (healthPoints > 0) {
        const choose = readlineSync.keyInSelect(actions, `
        Please choose an action...
        `);
    
        if (actions[choose] == 'Walk') {
            let luck = Math.random();
            if (luck > 0.3) {
                let findExit = Math.random();
                if (findExit == 0.7) {
                    console.log(`
                    You have found the exit to the dungeon!
                     congratulations you are safe, ${name}!!!`);
                    healthPoints = 0;
                } else {
                    console.log(`
                    Walking... `);
                }
            } else if (luck <= 0.3) {
                console.log(`
                You have encountered a ${enemy}!!! 
                its health is ${enemyHealth}. 
                Your health is ${healthPoints}.
                `);
                while (healthPoints > 0 && enemyHealth > 0) {
                    const runOrAttack = readlineSync.keyInSelect(enemyOptions, `
                    Choose how to proceed...
                    `);
                    if (enemyOptions[runOrAttack] == 'Run') {
                        let run = Math.random();
                        if (run >= 0.5) {
                            console.log(`
                            Running away...
                            `);
                            enemy = enemies[Math.floor(Math.random() * enemies.length)];
                            enemyHealth = Math.floor(Math.random() * (5 - 5 + 1)) + 25;
                            break;
                        } else if (run < 0.5) {
                            healthPoints = healthPoints - enemyAttackPower;
                            console.log(`
                            While running away, the ${enemy} attacks you for ${enemyAttackPower} damage. 
                            `)
                            if (healthPoints > 0) {
                                console.log(`
                                Your health is now ${healthPoints}. 
                                `);
                            } else if (healthPoints <= 0) {
                                console.log(`
                                Your health is now 0... 

                                 ${name},
                                You have been killed by the ${enemy}. 
                                `);
                            } 
                            enemy = enemies[Math.floor(Math.random() * enemies.length)];
                            enemyHealth = Math.floor(Math.random() * (5 - 5 + 1)) +  25;
                            break;
                        }
                    } else if (enemyOptions[runOrAttack] == 'Attack') {
                        enemyHealth = enemyHealth - attackPower;
                        console.log(`
                        You attack ${enemy} for ${attackPower} attack power. 
                        `);
                        if (enemyHealth <= 0) {
                            inventory.push(newItem);
                            healthPoints = healthPoints + 10;
                            console.log(`
                            You have killed the ${enemy}!!!
                            You gained ${newItem} 
                            `);
                            enemyHealth = Math.floor(Math.random() * (5 - 5 + 1)) + 25;
                            enemy = enemies[Math.floor(Math.random() * enemies.length)];
                            newItem = items[Math.floor(Math.random() * items.length)];
                            break;
                        } else {
                            healthPoints = healthPoints - enemyAttackPower;
                            console.log(`
                            The ${enemy} attacks you for ${enemyAttackPower} damage. 
                            `);
                            if (healthPoints > 0) {
                                console.log(`
                                Your health is now ${healthPoints}. 
                                `);
                            attackPower = Math.floor(Math.random() * (10 - 5) + 1) + 3;
                            enemyAttackPower = Math.floor(Math.random() * (5- 2) + 1) + 2;
                            } else if (healthPoints <= 0) {
                                console.log(`
                                Your health is now 0...

                                 ${name},
                                you have been killed by the ${enemy}.
                                `);
                            }
                        } 
                    }
                }
            } 
        } else if (actions[choose] == 'Print Inventory') {
            console.log(`
            Name: ${name}
            Health Points: ${healthPoints}
            Inventory: ${inventory}
            `);
        } else {
            console.log(`
            Goodbye... 
            `);
            healthPoints = 0;
        } 
    }
}
game();