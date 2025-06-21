// -- variáveis globais --

// para as imagens do jogo
let fundoMenu, fundoConversando, fundoBancada, fundoFeira, fundoFila, // fundos
    botaoJogar, // botão
    tigela, tigelaCheia, // tigela (vazia e cheia de ingredientes)
    forno, fornoTigela, // forno (vazio e com a tigela dentro)
    imgOvo, imgMel, imgFarinha, // ingredientes (ovo, mel, farinha)
    cliente1, cliente2, // clientes na feira
    imgBolo, imgPaoMel; // produtos (bolo e pão de mel)
    
// para controlar a exibição das telas do jogo
let tela = 1; // define qual tela será exibida (inicia no menu)

// para controlar os audios do jogo
let audio1tocado = false,
    audio2tocado = false,
    audio3tocado = false,
    audio4tocado = false,
    audio5tocado = false,
    audio6tocado = false,
    audio7tocado = false,
    audio8tocado = false,
    audio9tocado = false,
    audio10tocado = false,
    audio11tocado = false,
    audio12tocado = false,
    audio13tocado = false,
    audio14tocado = false,
    audio15tocado = false,
    audio16tocado = false,
    audio17tocado = false,
    audio18tocado = false,
    audio19tocado = false,
    audio20tocado = false;


// para o sistema de diálogo entre os personagens (tela 3)
let falas = [], // lista que define as falas dos personagens
    falaAtual = 0; // índice da fala atual sendo exibida

// para a lógica da cozinha (tela 5)
let ingredientesAdicionados = 0, // contador de ingredientes colocados na tigela
    tigelaAtual, // armazena a imagem atual da tigela (vazia ou cheia)
    tigelaForno = false, // indica se a tigela está no forno (true) ou não (false)
    ovoClicado = false, // indica se o ovo já foi clicado (true)
    melClicado = false, // indica se o mel já foi clicado (true)
    farinhaClicada = false, // indica se a farinha já foi clicada (true)
    tempoFornoIniciado = 0; // armazena o tempo em milissegundos quando a tigela é colocada no forno

// para a lógica da feira (tela 7)
let clientesFeira = [], // lista de clientes e seus pedidos
    indiceClienteAtual = 0, // índice do cliente que está sendo atendido no momento
    mensagemCliente = "", // armazena a mensagem que o cliente exibe (pedido, obrigado, erro)
    tempoMensagemCliente = 0; // armazena o tempo em milissegundos quando a mensagem do cliente é exibida

// ----


// -- funções essenciais --

// - 'preload()' - para carregar todas as imagens e audios antes do jogo iniciar
function preload() {
    // carregando imagens
    fundoMenu = loadImage('imagens/FundoMenu.png');
    botaoJogar = loadImage('imagens/BotãoJogar.png');
    fundoConversando = loadImage('imagens/FundoConversando.png');
    fundoBancada = loadImage('imagens/FundoBancada.png');
    tigela = loadImage('imagens/pote.png');
    tigelaCheia = loadImage('imagens/poteCheio.png');
    forno = loadImage('imagens/forno.png');
    fornoTigela = loadImage('imagens/fornoPote.png');
    imgOvo = loadImage('imagens/Ovo.png');
    imgMel = loadImage('imagens/Mel.png');
    imgFarinha = loadImage('imagens/Farinha.png');
    fundoFeira = loadImage('imagens/FundoFeira.png');
    cliente1 = loadImage('imagens/Pessoa1.png');
    cliente2 = loadImage('imagens/Pessoa2.png');
    imgBolo = loadImage('imagens/Bolo.png');
    imgPaoMel = loadImage('imagens/PãoMel.png');
    fundoFila = loadImage('imagens/FundoFila.png');

    //carregando audios
    audio1 = loadSound('audio/01Contexto.mp3');
    audio2 = loadSound('audio/02Dialogo.mp3');
    audio3 = loadSound('audio/03Dialogo.mp3');
    audio4 = loadSound('audio/04Dialogo.mp3');
    audio5 = loadSound('audio/05Dialogo.mp3');
    audio6 = loadSound('audio/06Dialogo.mp3');
    audio7 = loadSound('audio/07Dialogo.mp3');
    audio8 = loadSound('audio/08Dialogo.mp3');
    audio9 = loadSound('audio/09Dialogo.mp3');
    audio10 = loadSound('audio/10Dialogo.mp3');
    audio11 = loadSound('audio/11NaCozinha.mp3');
    audio12 = loadSound('audio/12Receita.mp3');
    audio13 = loadSound('audio/13CheirinhoBom.mp3');
    audio14 = loadSound('audio/14QueroBolo.mp3');
    audio15 = loadSound('audio/15QueroPao.mp3');
    audio16 = loadSound('audio/16NaoPedi.mp3');
    audio17 = loadSound('audio/17Obrigada.mp3');
    audio18 = loadSound('audio/18DepoisDia.mp3');
    audio19 = loadSound('audio/19FeirinhaTradicão.mp3');
    audio20 = loadSound('audio/20Fim.mp3');
}

// - 'setup()' - para configurar o ambiente do jogo e iniciar variáveis
function setup() {
    createCanvas(800, 600); // define o tamanho da área
    resetarJogo(); // chama a função para redefinir todas as variáveis do jogo para o estado inicial
    // - lista - para as falas dos personagens no sistema de diálogo
    falas = [
        "João: Ufa, mais um dia de trabalho. As abelhas estão produtivas, mas o preço do mel… ah, esse não ajuda muito.",
        "Maria: Ah, João, vem cá, descansa um pouco. Eu estive pensando... você se esforça tanto com o mel, né? Mas só vende o pote... eu queria poder te ajudar com alguma coisa...",
        "João: É a nossa vida, Maria. O que você poderia fazer?",
        "Maria: E se eu fizesse mais? Pensa comigo: o mel é tão bom, e ele pode ser tanta coisa... pão de mel, bolo de mel, biscoitos...",
        "João: Fazer mais? Mas você já tem tanto trabalho... e como faria isso?",
        "Maria: Eu tenho um tempinho livre e adoro cozinhar, você sabe! E a gente poderia vender junto com o mel lá na feirinha da cidade.",
        "Maria: Imagina o cheirinho de bolo fresco, o pessoal provando... Acho que ia atrair muita gente e aumentar nossa renda. O que você acha?",
        "João: Bom... se você acha que dá certo... a gente poderia tentar...",
        "Maria: Isso! Agora mesmo vou preparar aquele bolo de mel especial, o da vovó!"
    ];
}

// - 'draw()' - para desenhar a tela conforme a variável 'tela'
function draw() {
    // verifica o valor da variável 'tela' e chama a função de desenho correspondente
    if (tela === 1) {
        Tela1();
    } else if (tela === 2) {
        Tela2();
    } else if (tela === 3) {
        Tela3();
    } else if (tela === 4) {
        Tela4();
    } else if (tela === 5) {
        Tela5();
    } else if (tela === 6) {
        Tela6();
    } else if (tela === 7) {
        Tela7();
    } else if (tela === 8) {
        Tela8();
    } else if (tela === 9) {
        Tela9();
    } else if (tela === 10) {
        Tela10();
    }
}

// - 'mousePressed()' - para chamar a função de clique conforme a tela atual
function mousePressed() {
    // verifica o valor da variável 'tela' e chama a função de clique correspondente
    if (tela === 1) {
        cliqueTela1();
    } else if (tela === 2) {
        cliqueTela2()
    } else if (tela === 3) {
        cliqueTela3();
    } else if (tela === 4) {
        cliqueTela4();
    } else if (tela === 5) {
        cliqueTela5();
    } else if (tela === 6) {
        cliqueTela6();
    } else if (tela === 7) {
        cliqueTela7();
    } else if (tela === 8) {
        cliqueTela8();
    } else if (tela === 9) {
        cliqueTela9();
    } else if (tela === 10) {
        cliqueTela10();
    }
}

// - 'resetarJogo()' - para redefinir todas as variáveis do jogo para o estado inicial
function resetarJogo() {

    // redefine todos os áudios
    audio1tocado = false;
    audio2tocado = false;
    audio3tocado = false;
    audio4tocado = false;
    audio5tocado = false;
    audio6tocado = false;
    audio7tocado = false;
    audio8tocado = false;
    audio9tocado = false;
    audio10tocado = false;
    audio11tocado = false;
    audio12tocado = false;
    audio13tocado = false;
    audio14tocado = false;
    audio15tocado = false;
    audio16tocado = false;
    audio17tocado = false;
    audio18tocado = false;
    audio19tocado = false;
    audio20tocado = false;


    // evita que algum áudio toque em segundo plano
    audio1.stop();
    audio2.stop();
    audio3.stop();
    audio4.stop();
    audio5.stop();
    audio6.stop();
    audio7.stop();
    audio8.stop();
    audio9.stop();
    audio10.stop();
    audio11.stop();
    audio12.stop();
    audio13.stop();
    audio14.stop();
    audio15.stop();
    audio16.stop();
    audio17.stop();
    audio18.stop();
    audio19.stop();
    audio20.stop();


    falaAtual = 0; // redefine o índice da fala atual para o início

    ingredientesAdicionados = 0; // zera a contagem de ingredientes
    tigelaAtual = tigela; // retorna a tigela para a imagem vazia
    tigelaForno = false; // remove a tigela do forno
    ovoClicado = false; // redefine o estado do ovo para não clicado
    melClicado = false; // redefine o estado do mel para não clicado
    farinhaClicada = false; // redefine o estado da farinha para não clicada
    tempoFornoIniciado = 0; // zera o tempo de início do forno

    indiceClienteAtual = 0; // redefine o índice do cliente para o primeiro
    mensagemCliente = ""; // limpa a mensagem do cliente
    tempoMensagemCliente = 0; // zera o tempo da mensagem do cliente
    // - lista - para redefinir a configuração inicial dos clientes da feira
    clientesFeira = [{
        cliente: cliente1,
        pedido: "bolo",
        atendido: false,
        x: 160,
        y: 190
    }, {
        cliente: cliente2,
        pedido: "paoMel",
        atendido: false,
        x: 180,
        y: 240
    }];

    tela = 1; // retorna para a tela do menu inicial
}

// ----


// -- funções das telas --

// - 'Tela1()' - para exibir o menu
function Tela1() {
    image(fundoMenu, 0, 0, width, height); // desenha o fundo
    image(botaoJogar, 100, 325); // desenha o botão
}

// - 'Tela2()' - para exibir a introdução da história
function Tela2() {
    // toca o áudio apenas uma vez ao entrar na tela 2
    if (!audio1tocado) {
        audio1.play();
        audio1tocado = true;
    }

    background(0); // desenha o fundo preto
    textAlign(CENTER, CENTER); // alinha o texto ao centro
    fill(255); // define a cor do texto para branco
    textSize(30); // define o tamanho da fonte
    text("Em mais uma sexta-feira normal \nno campo...", width / 2, height / 2 - 40); // exibe o texto principal
    fill(100); // define a cor do texto para cinza
    textSize(18); // define o tamanho da fonte
    text("Clique para continuar", width / 2, height / 2 + 70); // exibe a instrução
}

// - 'Tela3()' - para exibir o diálogo entre joão e maria
function Tela3() {
    image(fundoConversando, 0, 0, width, height); // desenha o fundo
    fill(0, 180); // define a cor e transparência do balão de fala (preto e semi transparente)
    rect(50, 400, 700, 160, 20); // desenha o balão de fala com bordas arredondadas
    fill(255); // define a cor do texto para branco
    textSize(20); // define o tamanho da fonte
    textAlign(LEFT, TOP); // alinha o texto à esquerda e no topo
    text(falas[falaAtual], 70, 420, 660, 100); // exibe a fala atual dos personagens

    textAlign(RIGHT, BOTTOM); // alinha o texto à direita e na parte inferior
    textSize(14); // define o tamanho da fonte
    fill(140); // define a cor do texto para cinza
    text("Clique para avançar o diálogo", width - 60, height - 40); // exibe a instrução
}

// - 'Tela4()' - para exibir a transição para a cozinha
function Tela4() {
    // toca o áudio apenas uma vez ao entrar na tela 4
    if (!audio11tocado) {
        audio11.play();
        audio11tocado = true;
    }
    background(0); // define o fundo preto
    textAlign(CENTER, CENTER); // alinha o texto ao centro
    fill(255); // define a cor do texto para branco
    textSize(30); // define o tamanho da fonte
    text("Na cozinha...", width / 2, height / 2); // exibe o texto de transição
    fill(100); // define a cor do texto para cinza
    textSize(18); // define o tamanho da fonte
    text("Clique para começar", width / 2, height / 2 + 60); // exibe a instrução
}

// - 'Tela5()' - para exibir a cena da cozinha
function Tela5() {
    // toca o áudio apenas uma vez ao entrar na tela 5
    if (!audio12tocado) {
        audio12.play();
        audio12tocado = true;
    }

    image(fundoBancada, 0, 0, width, height); // desenha o fundo
    fill(0, 180); // define a cor e transparência do balão de instruções
    rect(20, 20, 400, 60, 10); // desenha o balão de instruções
    fill(255); // define a cor do texto para branco
    textSize(18); // define o tamanho da fonte
    textAlign(LEFT, TOP); // alinha o texto à esquerda e no topo
    text("Clique nos ingredientes para adicionar na tigela, \ndepois clique no forno para assar.", 30, 30); // exibe a instrução

    // - receita - para exibir as instruções da receita do bolo de mel
    fill(255); // define a cor do fundo da receira para branco
    rect(10, 370, 240, 210); // desenha a caixa da receita
    fill(0); // define a cor do texto para preto
    textSize(18); // define o tamanho da fonte
    textAlign(LEFT, TOP); // alinha o texto à esquerda e no topo
    text("Receita: Bolo de Mel\n- Modo de preparo:\nColoque na tigela 2 ovos, 2 xícaras de farinha e 1/5 xícara de mel. Depois, leve ao forno por aproximadamente 40 minutos.", 20, 380, 220, 190); // exibe o texto da receita

    // - 'if' - para desenhar o ovo se ainda não foi clicado
    if (!ovoClicado) image(imgOvo, 50, 260, 100, 100);
    // - 'if' - para desenhar o mel se ainda não foi clicado
    if (!melClicado) image(imgMel, 170, 260, 100, 100);
    // - 'if' - para desenhar a farinha se ainda não foi clicada
    if (!farinhaClicada) image(imgFarinha, 290, 260, 100, 100);
    // - 'if' - para desenhar a tigela fora do forno (vazia ou cheia, dependendo de tigelaAtual)
    if (!tigelaForno) image(tigelaAtual, 325, 320, 150, 150);

    // - 'if' - para desenhar o forno com ou sem a tigela dentro
    if (tigelaForno) {
        image(fornoTigela, 500, 100, 300, 300); // desenha o forno com a tigela
    } else {
        image(forno, 500, 100, 300, 300); // desenha o forno vazio
    }

    // - 'if' - para iniciar a contagem do tempo ao colocar a tigela no forno
    if (tigelaForno && tempoFornoIniciado === 0) {
        tempoFornoIniciado = millis(); // registra o tempo atual em milissegundos
    }
    // - 'if' - para mudar para a tela 6 após 2.5 segundos no forno
    if (tempoFornoIniciado > 0 && millis() - tempoFornoIniciado > 2500) {
        tela = 6; // muda para a tela de transição da feira
        tempoFornoIniciado = 0; // reseta o tempo do forno para a próxima vez

        audio12.stop(); // para o áudio ao final da tela
    }
}

// - 'Tela6()' - para exibir transição da cozinha para a feira
function Tela6() {
    // toca o áudio apenas uma vez ao entrar na tela 6
    if (!audio13tocado) {
        audio13.play();
        audio13tocado = true;
    }
    background(0); // define o fundo preto
    textAlign(CENTER, CENTER); // alinha o texto ao centro
    fill(255); // define a cor do texto para branco
    textSize(30); // define o tamanho da fonte
    text('"Que cheirinho bom!" — disse João.\n\nDepois do bolo, Maria passou a noite toda\ncozinhando para a feirinha de amanhã.\n\nE por falar em feirinha...', width / 2, height / 2 - 40); // exibe o texto
    fill(100); // define a cor do texto para cinza
    textSize(18); // define o tamanho da fonte
    text("Clique para continuar", width / 2, height / 2 + 120); // exibe a instrução
}

// - 'Tela7()' - para exibir a cena da feira
function Tela7() {
    image(fundoFeira, 0, 0, width, height); // desenha o fundo da feira
    let cliente = clientesFeira[indiceClienteAtual]; // obtém o objeto do cliente atual
  
    fill(255, 230, 180, 200); // define a cor da etiqueta
    rect(40, 540, 100, 50, 5); // desenha a etiqueta
    fill(0); // define a cor do texto
    textSize(14); // define o tamanho do texto
    textAlign(CENTER, CENTER); // centraliza do texto
    text("Bolo de Mel\nR$ 7,99", 40 + 50, 540 + 25); // texto

    fill(255, 230, 180, 200); // define a cor da etiqueta
    rect(350, 545, 100, 50, 5); // desenha a etiqueta
    fill(0); // define a cor do texto
    textSize(14); // define o tamanho do texto
    textAlign(CENTER, CENTER); // centraliza o texto
    text("Pão de Mel\nR$ 6,59", 350 + 50, 545 + 25); // texto

    fill(255, 230, 180, 200); // define a cor da etiqueta
    rect(630, 540, 100, 50, 5); // desenha a etiqueta
    fill(0); // define a cor do texto
    textSize(14); // define o tamanho do texto
    textAlign(CENTER, CENTER); // centraliza o texto
    text("Pote de Mel\nR$ 24,59", 630 + 50, 540 + 25); // texto

    // - 'if' - para garantir que há um cliente a ser exibido
    if (cliente) {
        image(cliente.cliente, cliente.x, cliente.y); // desenha a imagem do cliente na posição definida

        fill(255); // define a cor do balão de fala para branco
        rect(370, 120, 350, 90, 20); // desenha o balão de fala do cliente
        fill(0); // define a cor do texto para preto
        textSize(20); // define o tamanho da fonte
        textAlign(LEFT, TOP); // alinha o texto à esquerda e no topo
        // - 'ternário' - para definir o texto do balão (pedido do cliente ou mensagem de feedback)
        let textoExibido = mensagemCliente === "" ?
            `Eu quero um ${cliente.pedido === "paoMel" ? "pão de mel" : "bolo"}!` :
            mensagemCliente;
        text(textoExibido, 390, 135, 310, 50); // exibe o texto no balão

        fill(100); // define a cor do texto de instrução para cinza
        textSize(14); // define o tamanho da fonte //
        text("Clique no produto que o cliente pediu", 390, 185, 310, 30); // exibe a instrução
    }

    // - 'if' - para desenhar o bolo se o primeiro cliente ainda não foi atendido
    if (!clientesFeira[0].atendido) {
        image(imgBolo, 130, 450);
    }
    // - 'if' - para desenhar o pão de mel se o segundo cliente ainda não foi atendido
    if (!clientesFeira[1].atendido) {
        image(imgPaoMel, 350, 460);
    }

    // - 'if' - para manter a mensagem do cliente visível por 3 segundos
    if (mensagemCliente !== "" && millis() - tempoMensagemCliente < 3000) {
        return; // sai da função para não limpar a mensagem antes do tempo
    }
    // se o cliente foi atendido e a mensagem sumiu, passa para o próximo ou muda de tela
    if (mensagemCliente === "" && cliente && cliente.atendido) {
        // para o áudio de pedido/feedback do cliente quando a mensagem some
        audio14.stop();
        audio15.stop();
        audio16.stop();
        audio17.stop();

        if (indiceClienteAtual < clientesFeira.length - 1) {
            indiceClienteAtual++; // avança para o próximo cliente
            // toca o áudio do pedido do novo cliente (se for o segundo, toca audio15)
            if (clientesFeira[indiceClienteAtual].pedido === "paoMel") {
                audio15.play(); // toca "eu quero um pão de mel"
            } else {
                audio14.play(); // caso tenha mais clientes e o pedido seja bolo
            }

        } else {
            tela = 8; // se todos os clientes foram atendidos, muda para a tela de conclusão
            // para o áudio de pedido/feedback do último cliente ao sair da tela 7
            audio14.stop();
            audio15.stop();
            audio16.stop();
            audio17.stop();
        }
    }
    // limpa a mensagem do cliente após o tempo
    mensagemCliente = "";
}

// - 'Tela8()' - para exibir a conclusão da história antes da tela final
function Tela8() {
    // toca o áudio apenas uma vez ao entrar na tela 8
    if (!audio18tocado) {
        audio18.play();
        audio18tocado = true;
    }
    background(0); // define o fundo preto
    textAlign(CENTER, CENTER); // alinha o texto ao centro
    fill(255); // define a cor do texto para branco
    textSize(30); // define o tamanho da fonte
    text("Depois daquele dia, a vida de Maria mudou \ncompletamente, ela conseguiu aumentar a renda \nfamiliar, assim vivendo com mais tranquilidade.\n\nAos poucos, o mel de João foi ficando \nainda mais famoso. \nE a feirinha...", width / 2, height / 2 - 40); // exibe o texto principal
    fill(100); // define a cor do texto para cinza
    textSize(18); // define o tamanho da fonte
    text("Clique para continuar", width / 2, height / 2 + 140); // exibe a instrução para continuar
}

// - 'Tela9()' - para exibir a tela final com a fila na barraca do mel
function Tela9() {
    // toca o áudio apenas uma vez ao entrar na tela 9
    if (!audio19tocado) {
        audio19.play();
        audio19tocado = true;
    }
    image(fundoFila, 0, 0, width, height); // desenha o fundo da fila na barraca
    fill(0, 180); // define a cor e transparência do balão de fala
    rect(50, 400, 700, 160, 20); // desenha o balão de fala
    fill(255); // define a cor do texto para branco
    textSize(20); // define o tamanho da fonte
    textAlign(LEFT, TOP); // alinha o texto à esquerda e no topo
    text("... a feirinha virou tradição, todo sábado tinha fila na barraca do mel.", 70, 420, 660, 100); // exibe o texto final da história
    textAlign(RIGHT, BOTTOM); // alinha o texto à direita e na parte inferior
    textSize(14); // define o tamanho da fonte //16
    fill(140); // define a cor do texto para cinza
    text("Clique para continuar", width - 60, height - 40); // exibe a instrução para continuar
}

// - 'Tela10()' - para exibir a tela de agradecimento e mensagem final
function Tela10() {
    // toca o áudio apenas uma vez ao entrar na tela 9
    if (!audio20tocado) {
        audio20.play();
        audio20tocado = true;
    }
    background(0); // define o fundo preto
    textAlign(CENTER, CENTER); // alinha o texto ao centro
    fill(255); // define a cor do texto para branco
    textSize(20); // define o tamanho da fonte
    text("A história de Maria reflete a força e a coragem de muitas mulheres do campo que, com criatividade e determinação, buscam transformar suas vidas e as de suas famílias, provando que a força da mulher vai muito além das paredes de casa. \nAo levar seus produtos para a feira da cidade, Maria não apenas encontrou uma forma de contribuir com o lar, mas também construiu pontes, mostrando a conexão entre o campo e a cidade. Fazendo com que o trabalho dedicado na vida rural florescesse na feira, unindo as pessoas e fortalecendo laços.\nQue a trajetória de Maria nos lembre sempre da importância de valorizar o trabalho, os sonhos e o potencial de cada mulher. E que cada pote de mel, bolo e pão vendidos represente um caminho para a mudança, capaz de inspirar toda uma comunidade e revelar a beleza que existe quando o campo e a cidade se encontram e crescem juntos.\n\nObrigada por jogar!\n\nE lembre-se: Toda mulher carrega dentro de si o poder de transformar o mundo.", 40, 10, 720, 560); // exibe a mensagem de agradecimento

    fill(120); // define a cor do texto para cinza
    textSize(14); // define o tamanho da fonte
    text("Clique para jogar de novo", width / 2, height - 50); // exibe a instrução para reiniciar o jogo
}

// ----


// -- funções de clique --

// - 'cliqueTela1()' - para detectar clique no botão jogar no menu inicial
function cliqueTela1() {
    // - 'if' - para verificar se o clique ocorreu dentro da área do botão "jogar"
    if (mouseX > 100 && mouseX < 250 && mouseY > 325 && mouseY < 475) {
        // ativa o contexto de áudio do navegador na primeira interação do usuário
        userStartAudio();
        tela = 2; // muda para a tela de introdução
    }
}

// - 'cliqueTela2()' - para avançar da introdução para o diálogo
function cliqueTela2() {
    audio1.stop(); // para o áudio da tela 2
    tela = 3; // muda para a tela de diálogo
    audio2.play(); // começa o primeiro áudio da tela 3 (diálogo)
}

// - 'cliqueTela3()' - para avançar as falas ou ir para a cozinha
function cliqueTela3() {
    // para o áudio da fala anterior antes de avançar
    if (falaAtual === 0) audio2.stop();
    else if (falaAtual === 1) audio3.stop();
    else if (falaAtual === 2) audio4.stop();
    else if (falaAtual === 3) audio5.stop();
    else if (falaAtual === 4) audio6.stop();
    else if (falaAtual === 5) audio7.stop();
    else if (falaAtual === 6) audio8.stop();
    else if (falaAtual === 7) audio9.stop();
    else if (falaAtual === 8) audio10.stop();

    // verifica se ainda há falas para exibir
    if (falaAtual < falas.length - 1) {
        falaAtual++; // avança para a próxima fala

        // toca o áudio correspondente à nova fala atual
        if (falaAtual === 1) audio3.play();
        else if (falaAtual === 2) audio4.play();
        else if (falaAtual === 3) audio5.play();
        else if (falaAtual === 4) audio6.play();
        else if (falaAtual === 5) audio7.play();
        else if (falaAtual === 6) audio8.play();
        else if (falaAtual === 7) audio9.play();
        else if (falaAtual === 8) audio10.play();

    } else {
        // se todas as falas foram exibidas, muda para a tela de transição
        tela = 4;
        // para o último áudio de diálogo ao sair da tela 3
        audio10.stop();
    }
}

// - 'cliqueTela4()' - para iniciar a parte da cozinha
function cliqueTela4() {
    // para o áudio 11 (na cozinha) ao sair da tela 4
    audio11.stop();
    tela = 5; // muda para a tela da bancada de cozinha
}

// - 'cliqueTela5()' - para clicar nos ingredientes e no forno
function cliqueTela5() {
    // - 'if' - para só permitir cliques se a tigela não estiver no forno
    if (!tigelaForno) {
        // - 'if' - para verificar o clique no ovo e adicioná-lo
        if (!ovoClicado && mouseX > 50 && mouseX < 150 && mouseY > 260 && mouseY < 360) {
            ingredientesAdicionados++; // incrementa o contador de ingredientes
            ovoClicado = true; // marca o ovo como clicado
        }
        // - 'else if' - para verificar o clique no mel e adicioná-lo
        else if (!melClicado && mouseX > 170 && mouseX < 270 && mouseY > 260 && mouseY < 360) {
            ingredientesAdicionados++; // incrementa o contador de ingredientes
            melClicado = true; // marca o mel como clicado
        }
        // - 'else if' - para verificar o clique na farinha e adicioná-la
        else if (!farinhaClicada && mouseX > 290 && mouseX < 390 && mouseY > 260 && mouseY < 360) {
            ingredientesAdicionados++; // incrementa o contador de ingredientes
            farinhaClicada = true; // marca a farinha como clicada
        }

        // - 'if' - para mudar a imagem da tigela para "cheia" se todos os ingredientes foram adicionados
        if (ingredientesAdicionados >= 3) tigelaAtual = tigelaCheia;

        // - 'if' - para levar a tigela ao forno se todos os ingredientes foram adicionados e o forno foi clicado
        if (ingredientesAdicionados >= 3 && mouseX > 500 && mouseX < 800 && mouseY > 100 && mouseY < 400) {
            tigelaForno = true; // coloca a tigela no forno
        }
    }
}

// - 'cliqueTela6()' - para ir da cozinha para a feira
function cliqueTela6() {
    audio13.stop(); // para o áudio da tela 6
    tela = 7; // muda para a tela da feira
    // toca o áudio do primeiro cliente na feira (cliente1 pede bolo - audio14)
    audio14.play();
}

// - 'cliqueTela7()' - para atender o cliente ou mostrar mensagem de erro
function cliqueTela7() {
    // para evitar que a função seja executada novamente se uma mensagem já estiver visível
    if (mensagemCliente !== "" && millis() - tempoMensagemCliente < 3000) return;

    // para o áudio de pedido/feedback anterior antes de processar um novo clique
    audio14.stop();
    audio15.stop();
    audio16.stop();
    audio17.stop();

    mensagemCliente = ""; // reseta a mensagem do cliente
    let cliente = clientesFeira[indiceClienteAtual]; // pega o objeto do cliente atual

    // - 'if' - para verificar se há um cliente válido para interagir
    if (cliente) {
        // - 'if' - para verificar se o bolo foi clicado e se é o pedido correto
        if (mouseX > 130 && mouseX < 230 && mouseY > 450 && mouseY < 550 && cliente.pedido === "bolo") {
            mensagemCliente = "Obrigada!"; // mensagem de agradecimento
            tempoMensagemCliente = millis(); // registra o tempo da mensagem
            cliente.atendido = true; // marca o cliente como atendido
            audio17.play(); // toca "obrigada!"
        }
        // - 'else if' - para verificar se o pão de mel foi clicado e se é o pedido correto
        else if (mouseX > 350 && mouseX < 450 && mouseY > 460 && mouseY < 560 && cliente.pedido === "paoMel") {
            mensagemCliente = "Obrigado!"; // mensagem de agradecimento
            tempoMensagemCliente = millis(); // registra o tempo da mensagem
            cliente.atendido = true; // marca o cliente como atendido
            audio17.play(); // toca "obrigada!"
        }
        // - 'else' - para exibir mensagem de erro se o produto errado foi clicado
        else {
            mensagemCliente = "Não foi isso que eu pedi."; // mensagem de erro
            tempoMensagemCliente = millis(); // registra o tempo da mensagem
            audio16.play(); // toca "não foi isso que eu pedi"
        }
    }
}

// - 'cliqueTela8()' - para avançar para a tela final
function cliqueTela8() {
    audio18.stop(); // para o áudio da tela 8
    tela = 9; // muda para a tela da fila
}

// - 'cliqueTela9()' - para avançar da tela de fila para a tela final de agradecimento
function cliqueTela9() {
    audio19.stop(); // para o áudio da tela 9
    tela = 10; // muda para a tela de agradecimento
}

// - 'cliqueTela10()' - para reiniciar o jogo a partir da tela de agradecimento
function cliqueTela10() {
    audio20.stop(); // para o áudio da tela 10
    resetarJogo(); // chama a função para resetar o jogo para o início
}