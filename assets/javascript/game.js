var characters = [];

$(document).ready(function() {
    function Character(elem, hp, baseAttack, counterAttack) {
        this.elem = elem;
        this.maxHP = hp;
        this.hp = hp;
        this.baseAttack = baseAttack;
        this.attackPower = baseAttack;
        this.counterAttack = counterAttack;

        this.attack = function(enemy, isCounter = false) {
            if (isCounter) {
                enemy.takeDamage(this.counterAttack);
            } else {
                enemy.takeDamage(this.attackPower);
                enemy.attack(this, true);
                $("#console").text("You attacked " + enemy.elem.children(".name").text() + " for " + this.attackPower + ". \r\n");
                $("#console").text($("#console").text() + enemy.elem.children(".name").text() + " attacked you for " + enemy.counterAttack + ".");
                this.attackPower += this.baseAttack;
            }
        }

        this.takeDamage = function(damage) {
            this.hp -= damage;
            this.elem.children(".hp").text(this.hp);
            if (this.hp < 1) {
                this.die();
            }
        }
    }

    characters.push(new Character($("#neo"), 100, 6, 8));
    characters.push(new Character($("#trinity"), 125, 5, 9));
    characters.push(new Character($("#morpheus"), 150, 4, 10));
    characters.push(new Character($("#mr-smith"), 175, 3, 11));
});