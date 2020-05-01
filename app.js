new Vue({
    el: '#app',
    data: {
        hideButtons: true,
        playerHealth: 100,
        monsterHealth: 100,
        actionsList: [],
    },
    methods: {
        randomize(min, max) {
            return Math.round(min + Math.random() * (max + 1 - min))
        },
        attack() {
            let damage = this.randomize(5, 10);
            this.monsterHealth -= damage;
            this.showMessage(true, `Player hits monster and deals ${damage} damage`);
            if (this.checkResult()) return;
            this.monsterAttacks();
        },
        specialAttack() {
            let damage = this.randomize(10, 20);
            this.monsterHealth -= damage;
            this.showMessage(true, `Player hits monster with a special attack and deals ${damage} damage`);
            if (this.checkResult()) return;
            this.monsterAttacks();
            (this.checkResult)
        },
        heal() {
            let damage = this.randomize(7, 13);
            this.playerHealth += damage;
            if (this.playerHealth >= 100) this.playerHealth = 100;
            this.showMessage(true, `Player heals ${damage} damage`);
            if (this.checkResult()) return;
            this.monsterAttacks();
        },
        reset() {
            this.hideButtons = true;
        },
        checkResult() {
            if (this.playerHealth <= 0) {
                if (confirm('You lost! Wanna start again?')) {
                    this.startGame();
                } else {
                    this.hideButtons = true;
                }
                return true;
            } else if (this.monsterHealth <= 0) {
                if (confirm('You won! Wanna start again?')) {
                    this.startGame();
                } else {
                    this.hideButtons = true;
                }
                return true;
            }
            return false;
        },
        startGame() {
            this.hideButtons = false;
            this.actionsList.length = 0;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        showMessage(bool, msg) {
            if (this.actionsList.length >= 8) {
                this.actionsList.pop();
                this.actionsList.pop();
            }
            this.actionsList.unshift({
                isPlayer: bool,
                message: msg
            });
        },
        monsterAttacks() {
            let damage = this.randomize(7, 13);
            this.playerHealth -= damage;
            this.showMessage(false, `Monster hits player and deals ${damage} damage`);
        },
    }
});