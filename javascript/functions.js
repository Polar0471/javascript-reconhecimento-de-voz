
const engine = {
    "cores": ['green', 'purple', 'pink', 'red', 'yellow', 'orange', 'gray', 'black'],
    "hexadecimais": {
        'green': '#02EF00', 
        'purple': '#790093', 
        'pink': '#F02A7E', 
        'red': '#E90808', 
        'yellow': '#E7D703', 
        'orange': '#F16529', 
        'gray': '#EBEBEB',
        'black': '#141414'
    },
    "moedas": 0
}

// Math.floor -> arredonda números
// Math.random -> retorna um número aleatório

const quantidadeCores = engine.cores.length

const audioMoeda = new Audio('audio/moeda.mp3')
const audioErrou = new Audio('audio/errou.mp3')

function sortearCor() {
    let corSorteada = Math.floor(Math.random() * quantidadeCores)
    let legendaCorDaCaixa = document.getElementById('cor-na-caixa')
    let nomeCorSorteada = engine.cores[corSorteada]
    legendaCorDaCaixa.innerText = nomeCorSorteada.toUpperCase()
    return engine.hexadecimais[nomeCorSorteada]
}

function aplicarCorNaCaixa(nomeDaCor) {
    let caixaDasCores = document.getElementById('cor-atual')
    caixaDasCores.style.backgroundColor = nomeDaCor
    caixaDasCores.style.backgroundImage = "url('img/caixa-fechada.png')"
    caixaDasCores.style.backgroundSize = "100%"
}

function atualizaPontuacao(valor) {
    let pontuacao = document.getElementById('pontuacao-atual')
    engine.moedas += valor

    if (valor < 0) {
        audioErrou.play()
    } else {
        audioMoeda.play()
    }

    pontuacao.innerText = engine.moedas;
}

aplicarCorNaCaixa(sortearCor())


// API DE RECONHECIMENTO DE VOZ

let btnGravador = document.getElementById("btn-responder")

if (window.SpeechRecognition || window.webkitSpeechRecognition) {
    let SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition
    var gravador = new SpeechAPI()

    gravador.continuos = false
    gravador.lang = "en-US"

    gravador.onstart = function() {
        btnGravador.innerText = "Estou Ouvindo"
        btnGravador.style.backgroundColor = "white"
        btnGravador.style.color = "black";
    }

    gravador.onend = function() {
        btnGravador.innerText = "Responder"
        btnGravador.style.backgroundColor = "transparent"
        btnGravador.style.color = "white"
    }

    gravador.onresult = function(event) {
        transcricaoAudio = event.results[0][0].transcript

        if (document.getElementById("cor-na-caixa").innerText.toUpperCase() === transcricaoAudio.toUpperCase()) {
            atualizaPontuacao(1)
        } else {
            atualizaPontuacao(-1)
        }

        aplicarCorNaCaixa(sortearCor())
    }
} else {    
    alert('Não tem suporte para a API')
}

btnGravador.addEventListener('click', function(e) {
    gravador.start()
})