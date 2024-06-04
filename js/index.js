let tabelaClassificacao = document.querySelector('.tabelaClassificacao')
let linhas = document.querySelectorAll('.corpoClassificacao tr')

exibirTabelaClassificacao('A')

function exibirTabelaClassificacao(letraGrupo) {
    // atualizar letra do grupo no index.html
    document.querySelector('.letra').innerHTML = letraGrupo

    // ler json das classificações
    fetch(`./arquivos-json/classificacaoGrupo${letraGrupo}.json`)
    .then( resposta => resposta.json() )
    .then( dados => {
        // ORDENAR OS DADOS DO ARRAY COM OBJETOS
        dados.sort(function compararNumeros(a, b) {
            return a.posicao - b.posicao
        })
        
        dados.forEach( (equipe, indice) => {
        
            // preencher os dados
            linhas[indice].innerHTML = `
                <td>${equipe.posicao}</td>
                <td class='equipes-classificacao'>
                    <img class='imagem-classificacao' src='./images/${equipe.escudo}'>
                    ${equipe.equipe}
                </td>
                <td>${equipe.pontos}</td>
                <td>${equipe.jogos}</td>
                <td>${equipe.vitorias}</td>
                <td>${equipe.empates}</td>
                <td>${equipe.derrotas}</td>
                <td>${equipe.gols_pro}</td>
                <td>${equipe.gols_contra}</td>
                <td>${equipe.saldo_de_gols}</td>
            `
        })
    }
    )
}

// controlar a escolha da letra do grupo para exibir na tabela de classificação
let selectLetra = document.querySelector('.letrasDosGrupos')

// usar um escutador de eventos para a nossa cx select
selectLetra.addEventListener('change', (event) => {
    exibirTabelaClassificacao(event.target.value)
})

let tabelaJogos = document.querySelector('.tabelaJogos')

// ler o arquivo json
fetch('./arquivos-json/jogos-fase1.json')
.then( response => response.json() )
.then( data => data.forEach( jogo => {

    // criar uma linha de tabela, colocar ela na tabela
    let linha = document.createElement('tr')
    tabelaJogos.appendChild(linha)

    // preencher os dados do jogo em cada linha da tabela
    linha.innerHTML = `
        <td>${jogo.diaSemana}</td>
        <td>${jogo.data}</td>
        <td>${jogo.hora}</td>
        <td>${jogo.grupo}</td>
        <td class='centralizar'>
            <div class='container-partida'>
                <div class="container-equipe">
                    <div class="alinhamento-em-linha">
                        <img class="imagem-pequena" src="images/${jogo.escudo_mandante}">
                        <span>${jogo.equipe_mandante}</span>
                    </div>
                    <div class='container-placar'>
                        <span class='placar'>${jogo.gols_mandante}</span>
                    </div>
                </div>
                <div class="container-equipe">
                    <div class="alinhamento-em-linha">
                        <img class="imagem-pequena" src="images/${jogo.escudo_visitante}">
                        <span>${jogo.equipe_visitante}</span>
                    </div>
                    <div class='container-placar'>
                        <span class='placar'>${jogo.gols_visitante}</span>
                    </div>
                </div>
            </div>
        </td>
        <td class='alinhamento-esquerda'>${jogo.estadio}</td>
    `
})
)

// QUARTAS DE FINAL
let divQuartas = document.querySelector('.divQuartas')
const selecoes = [
    {
        mandante: 'INDEFINIDO',
        visitante: 'INDEFINIDO'
    },
    {
        mandante: 'INDEFINIDO',
        visitante: 'INDEFINIDO'
    },
    {
        mandante: 'INDEFINIDO',
        visitante: 'INDEFINIDO'
    },
    {
        mandante: 'INDEFINIDO',
        visitante: 'INDEFINIDO'
    }
]

fetch('./arquivos-json/quartas-de-final.json')
.then( resposta => resposta.json() )
.then( dados => {
    dados.forEach( jogo => {  
        // criar uma nova divisoria
        let divisoria = document.createElement('div')
        
        // colocar ela como filho de divQuartas
        divQuartas.appendChild(divisoria)

        // preencher os dados de cada jogo
        divisoria.innerHTML = `
            <h3 class='jogo'>Quartas ${jogo.id}</h3>
            <h4>
                <span class='dia'>${jogo.diaSemana}</span>
                ${jogo.data}
                <span class='hora'>${jogo.hora}</span>
            </h4>
            <h4 class='centralizar jogo'>
                <img class='imagem-pequena' src='./images/${jogo.img_mandante}' />
                <input type='number' min='0' max='99' disabled class='placar golsMandante' value='${jogo.gols_mandante}'>
                ${jogo.partida}
                <input type='number' min='0' max='99' disabled class='placar golsVisitante' value='${jogo.gols_visitante}'>
                <img class='imagem-pequena' src='./images/${jogo.img_visitante}' />
            </h4>
            <h5>${jogo.estadio}</h5>
            <h6>Prorrogação: ${jogo.prorrogacao}</h6>
            <h6>Pênaltis: ${jogo.penaltis}</h6>
            <h6>Placar de pênaltis: ${jogo.placar_penaltis}</h6>
            <h6>Classificado: ${jogo.classificado}</h6>
        `
        let inputGolsMandante = document.querySelectorAll('.golsMandante')
        let inputGolsVisitante = document.querySelectorAll('.golsVisitante')
        let golsM = 0
        let golsV = 0
    }) // fim do forEach
})

// manipular dados das semifinais para exibir finais
let jogosSemiFinais = [
    {
        gols_mandante: '',
        gols_visitante: '',
        mandante: '',
        visitante: '',
        img_mandante: '',
        img_visitante: '',
        vitorioso: '',
        perdedor: ''
    },
    {
        gols_mandante: '',
        gols_visitante: '',
        mandante: '',
        visitante: '',
        img_mandante: '',
        img_visitante: '',
        vitorioso: '',
        perdedor: ''
    }
]

let tabelaArtilheiros = document.querySelector('.tabelaArtilheiros')

// ler o arquivo json
fetch('./arquivos-json/artilheiros.json')
.then( response => response.json() )
.then( data => data.forEach( artilheiro => {

    // criar uma linha de tabela, colocar ela na tabela
    let linha = document.createElement('tr')
    tabelaArtilheiros.appendChild(linha)

    // preencher os dados dos jogadores em cada linha da tabela
    linha.innerHTML = `
        <td>${artilheiro.id}</td>
        <td>${artilheiro.nome}</td>
        <td>${artilheiro.equipe}</td>
        <td>${artilheiro.gols}</td>
    `
})
)


