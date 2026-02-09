// Função para inserir os números e operadores no visor
function inserir(valor) {
    var visor = document.getElementById('resultado');
    visor.value += valor;
}

// Função para limpar o visor (botão C)
function limpar() {
    document.getElementById('resultado').value = "";
}

// Função que realiza o cálculo
function calcular() {
    var resultado = document.getElementById('resultado').value;

    if (resultado) {
        try {
            // O eval() pega a string do visor e calcula como matemática pura
            document.getElementById('resultado').value = eval(resultado);
        } catch (e) {
            // Caso o usuário digite algo inválido (ex: 2++2)
            alert("Operação inválida!");
            limpar();
        }
    } else {
        console.log("Nada para calcular");
    }
}

function efeitoMusical() {
    var audio = document.getElementById('musica-calculadora');
    var botoes = document.querySelectorAll('button');
    var corpoPagina = document.body; // Seleciona o fundo da página
    var visor = document.getElementById('resultado'); // Visor da calculadora
    var botoes = document.querySelectorAll('button:not(.btn-musical)'); // Seleciona todos exceto o de música

    if (audio.paused) {
        audio.play();

        visor.value = "365365365365365365365365365365365365";
        visor.classList.add('visor-animado');
        // Ativa a animação no fundo
        corpoPagina.classList.add('fundo-animado');

        // Ativa a animação nos botões
        botoes.forEach(function(botao) {
            botao.setAttribute('data-original', botao.innerHTML);
            botao.innerHTML = "brat";
            botao.classList.add('animar-botoes');
        });
    } else {
        audio.pause();
        audio.currentTime = 0;
        
        visor.value = "";
        visor.classList.remove('visor-animado');

        // Remove a animação do fundo
        corpoPagina.classList.remove('fundo-animado');

        // Remove a animação dos botões
        botoes.forEach(function(botao) {
            var textoOriginal = botao.getAttribute('data-original');
            botao.innerHTML = textoOriginal;
            botao.classList.remove('animar-botoes');
        });
    }
}

function pressionartecla(event) {
    var tecla = event.key;
    var teclasValidas = "0123456789+-*/().";

    if (teclasValidas.includes(tecla)) {
        inserir(tecla);
    } else if (tecla === "Enter") {
        calcular();
    } else if (tecla === "Backspace") {
        var visor = document.getElementById('resultado');
        visor.value = visor.value.slice(0, -1);
    }

function alternarHistorico() {
    const aba = document.getElementById('aba-historico');
    aba.classList.toggle('aberto');
}

function salvarNoHistorico(expressao, resultado) {
    const lista = document.getElementById('lista-historico');
    const item = document.createElement('div');
    item.className = 'item-historico';
    item.innerHTML = `${expressao} = <strong>${resultado}</strong>`;
    
    // Insere no topo da lista
    lista.prepend(item);
}

function limparHistorico() {
    document.getElementById('lista-historico').innerHTML = "";
}

// Atualize a sua função calcular() existente:
function calcular() {
    var visor = document.getElementById('resultado');
    var expressao = visor.value;

    if (expressao) {
        try {
            var resultadoFinal = eval(expressao);
            visor.value = resultadoFinal;
            
            // NOVO: Salva no histórico se o cálculo for válido
            salvarNoHistorico(expressao, resultadoFinal);
            
        } catch (e) {
            alert("Operação inválida!");
            limpar();
        }
    } else {
        console.log("Nada para calcular");
    }
}

// Opcional: Atualize a função efeitoMusical para incluir os elementos do histórico
// Adicione 'h2' e '.btn-limpar-hist' na lista de querySelectorAll dentro de efeitoMusical
}