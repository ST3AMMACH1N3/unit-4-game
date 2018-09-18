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
                $("#console").text("You attacked " + enemy.elem.children(".name").text() + " for " + this.attackPower + ". \r\n");
                this.attackPower += this.baseAttack;
                if (enemy.hp >= 1) {
                    enemy.attack(this, true);
                    $("#console").text($("#console").text() + enemy.elem.children(".name").text() + " attacked you for " + enemy.counterAttack + ".");
                }
            }
        }

        this.die = function() {
            if (this.elem[0] === $("#player-char").children()[0]) {
                $("#restart-btn").css("display", "block");
            }
            this.elem.detach();
        }

        this.reset = function() {
            this.hp = this.maxHP;
            this.attackPower = this.baseAttack;
            this.elem.removeClass("hero");
            this.elem.removeClass("enemy");
            this.elem.children(".hp").text(this.hp);
            this.elem.detach();
            $("#char-choice").append(this.elem);
        }

        this.takeDamage = function(damage) {
            this.hp -= damage;
            this.elem.children(".hp").text(this.hp);
            if (this.hp < 1) {
                this.die();
            }
        }
    }

    characters.push(new Character($("#neo"), 100, 16, 5));
    characters.push(new Character($("#trinity"), 120, 8, 10));
    characters.push(new Character($("#morpheus"), 150, 6, 20));
    characters.push(new Character($("#mr-smith"), 180, 4, 25));

    $(".character").on("click", function(event) {
        var target = event.currentTarget;
        var parent = event.currentTarget.parentElement;
        if (parent === $("#char-choice")[0]) {
            $("#player-char").append(target)
            $(target).addClass("hero");
            $("#available-enemies").append($("#char-choice").children());
        } else if (parent === $("#available-enemies")[0] && $("#defending-char").children().length === 0) {
            $(target).addClass("enemy")
            $("#defending-char").append(target);
        }
    });

    $("#attack-btn").on("click", function() {
        if ($("#defending-char").children().length === 0 || $("#player-char").children().length === 0) {
            return;
        }
        var player;
        var enemy;
        for(var i = 0; i < characters.length; i++) {
            if ($("#player-char").children()[0] === characters[i].elem[0]) {
                player = characters[i];
            } else if ($("#defending-char").children()[0] === characters[i].elem[0]) {
                enemy = characters[i];
            }
        }
        player.attack(enemy);
    });

    $("#restart-btn").on("click", function() {
        for(var i  = 0; i < characters.length; i++) {
            characters[i].reset();
        }
        $("#restart-btn").css("display", "none");
        $("#console").text(" ");
    });

});