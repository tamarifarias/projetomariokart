const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
}

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    let result

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
            break;
    }
    return result;
}

async function logRollResult(chraracterName, block, diceResult, attribute) {
    console.log(`${chraracterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
    
}
    

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round} iniciada!`);

        //sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco sorteado: ${block}`);

        //rolar dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();
        //console.log(`${character1.NOME} rolou ${dice1}`);
        //console.log(`${character2.NOME} rolou ${dice2}`);

        //teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
        }
        if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
        }
        if (block === "CONFRONTO") {
            powerResult1 = diceResult1 + character1.PODER;
            powerResult2 = diceResult2 + character2.PODER;

            console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);

            await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
            await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

            if(powerResult1 > powerResult2 && character2.PONTOS > 0){
                console.log(`🏆 ${character1.NOME} ganhou o confronto e ${character2.NOME} perdeu um ponto! 🐢`);
                character2.PONTOS -= 1;
            }
            
            if(powerResult2 > powerResult1 && character1.PONTOS > 0){
                console.log(`🏆 ${character2.NOME} ganhou o confronto e ${character1.NOME} perdeu um ponto! 🐢`);
                character1.PONTOS -= 1;
            }
            
    
            console.log(powerResult2 === powerResult1 ? "Empate! Nenhum ponto foi perdido." : "");
            

    }
           

            

        //definir vencedor
        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`🏆 ${character1.NOME} Marcou um ponto!\n`);
            character1.PONTOS += 1;
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`🏆 ${character2.NOME} Marcou um ponto!\n`);
            character2.PONTOS += 1;
        }

        console.log("-----------------------------");
    }
        
        
}

async function declareWinner(character1, character2) {
    console.log(`🏁🏆 Fim da corrida! 🏆🏁`);
    console.log(`${character1.NOME} : ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME} : ${character2.PONTOS} ponto(s)`);

    if (character1.PONTOS > character2.PONTOS) {
        console.log(`\n🏆 ${character1.NOME} é o grande vencedor! Parabéns 🎉`);
    } else if (character2.PONTOS > character1.PONTOS) {
        console.log(`\n🏆 ${character2.NOME} é o grande vencedor! Parabéns 🎉`);
    }
    else {
        console.log(`\n🤝 Empate! Ambos os corredores são vencedores! 🎉`);
    }
}

(async function main() {
    console.log(
        `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
    );
    await playRaceEngine(player1, player2)
    await declareWinner(player1, player2);
    console.log("🏁🚨 Corrida finalizada! Obrigado por jogar! 🚨🏁");
})();