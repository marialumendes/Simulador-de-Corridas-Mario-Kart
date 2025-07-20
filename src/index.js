const player1 = {
    NOME : "Mario",
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
//async: a função vai ter que esperar a outra terminar para começar
async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock(){
    let random = Math.random()
    let result;

    switch (true){
        case random <0.33:
            result = "RETA";
            break;
        case random < 0.66 :
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }
    return result
}

async function logRollResult(charecterName, block, diceResult, attribute){
    console.log(`${charecterName} rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

//laço de repetição for
async function playRaceEngine(charecter1, charecter2){
    for(let round = 1; round <=5; round++){
        console.log(`Rodada ${round}`);

        //sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        //rolar os dados; alt + shift copia a linha!
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        //teste de habilidades
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block ==="RETA"){
            totalTestSkill1 = diceResult1 + charecter1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + charecter2.VELOCIDADE;

            await logRollResult(charecter1.NOME,"velocidade", diceResult1,charecter1.VELOCIDADE);
            await logRollResult(charecter2.NOME,"velocidade", diceResult2,charecter2.VELOCIDADE);
        }

        if(block ==="CURVA"){
            totalTestSkill1 = diceResult1 + charecter1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + charecter2.MANOBRABILIDADE;

            await logRollResult(charecter1.NOME,"manobrabilidade", diceResult1,charecter1.MANOBRABILIDADE);
            await logRollResult(charecter2.NOME,"manobrabilidade", diceResult2,charecter2.MANOBRABILIDADE);
        }
        if(block ==="CONFRONTO"){ //Escopo de variaveis
            let powerResult1 = diceResult1 + charecter1.PODER;        
            let powerResult2 = diceResult2 + charecter2.PODER;

            console.log(`${charecter1.NOME} confrontou ${charecter2.NOME}`);
             await logRollResult(charecter1.NOME,"poder", diceResult1,charecter1.PODER);
             await logRollResult(charecter2.NOME,"poder", diceResult2,charecter2.PODER);

            //If composto
             if(powerResult1 > powerResult2 && charecter2.PONTOS > 0) {
                console.log(`${charecter1.NOME} Venceu o confronto! ${charecter2.NOME} PERDEU 1 PONTOOOOO!`);
                charecter2.PONTOS--;
             }
                 
             if(powerResult2 > powerResult1 && charecter1.PONTOS > 0){
                console.log(`${charecter2.NOME} Venceu o confronto! ${charecter1.NOME} PERDEU 1 PONTOOOOO!`);
                charecter1.PONTOS--;
             }
             
            console.log(powerResult2 === powerResult1 ? "confronto deu empate! Nenhum ponto foi perdido" : "");
            
        }

        //verificando o vencedor
        if(totalTestSkill1 > totalTestSkill2){
            console.log(`${charecter1.NOME} marcou um ponto!`);
            charecter1.PONTOS++;
        }else if (totalTestSkill2 > totalTestSkill2){
            console.log(`${charecter2.NOME} marcou um ponto!`);
        }
        console.log("-------------------------------")
    }
}

async function declareWinner(charecter1, charecter2){
    console.log("resultado final:")
    console.log(`${charecter1.NOME}: ${charecter1.PONTOS} ponto(s)`)
    console.log(`${charecter2.NOME}: ${charecter2.PONTOS} ponto(s)`)

    if(charecter1.PONTOS > charecter2.PONTOS){
        console.log(`\n${charecter1.NOME} venceu a corrida! Parabéns!`);
    } else if(charecter2.PONTOS > charecter1.PONTOS){
        console.log(`\n${charecter2.NOME} venceu a corrida! Parabéns!`);
    }else{
        console.log("A corrida deu empate");
    }
}

//função de entrada
(async function main(){
    //escreve alguma coisa
    console.log(
        //vamos declarar uma função de valores variados
        //quando se usa crase `` é possivel declarar variaveis de valores variados com ${}
        `Corrida entre ${player1.NOME} e ${player2.NOME} começando... \n`);

    //await espera uma função terminar de executar para começar a funcionar
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})(); //função entre parenteses vira uma função autoinvocavel
