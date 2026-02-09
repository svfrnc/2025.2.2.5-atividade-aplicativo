let executouCalculo = false;
function inserir(valor) {
    var visor = document.getElementById('resultado');
    
    // Lista de operadores para checagem
    const operadores = ['+', '-', '*', '/'];

    // Se o visor mostra um resultado e o usuário clica em um NÚMERO
    if (executouCalculo && !operadores.includes(valor)) {
        visor.value = valor; // Substitui o resultado pelo novo número
    } else {
        visor.value += valor; // Se for operador, continua a conta
    }
    
    // Resetamos o estado para que os próximos cliques funcionem normalmente
    executouCalculo = false;
}
// Função para limpar o visor (botão C)
function limpar() {
    document.getElementById('resultado').value = "";
    executouCalculo = false; 
}

// Função que realiza o cálculo
function calcular() {
    var visor = document.getElementById('resultado');
    var expressao = visor.value;

    if (expressao) {
        try {
            var resultadoFinal = eval(expressao);
            visor.value = resultadoFinal;
            
            // ESSA LINHA É A CHAVE: Ela avisa que o visor agora tem um resultado
            executouCalculo = true; 
            
            salvarNoHistorico(expressao, resultadoFinal);
        } catch (e) {
            alert("Operação inválida!");
            limpar();
        }
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
    
}
// Adicione estas variáveis e funções ao seu script.js

function alternarHistorico() {
    const aba = document.getElementById('aba-historico');
    if (aba) {
        aba.classList.toggle('aberto');
    } else {
        console.error("Aba de histórico não encontrada!");
    }
}

function salvarNoHistorico(expressao, resultado) {
    let historico = JSON.parse(localStorage.getItem('historico_brat')) || [];
    historico.unshift({ expressao, resultado });
    localStorage.setItem('historico_brat', JSON.stringify(historico));
    atualizarExibicaoHistorico();
}
function atualizarExibicaoHistorico() {
    const lista = document.getElementById('lista-historico');
    const historico = JSON.parse(localStorage.getItem('historico_brat')) || [];
    
    // Limpa a lista atual para reconstruir (Retrieve/HTML dinâmico)
    lista.innerHTML = "";

    historico.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item-historico';
        div.innerHTML = `${item.expressao} = <strong>${item.resultado}</strong>`;
        lista.appendChild(div);
    });
}
function limparHistorico() {
    localStorage.removeItem('historico_brat');
    atualizarExibicaoHistorico();
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