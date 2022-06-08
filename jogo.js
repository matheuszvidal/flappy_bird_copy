console.log('[Matheus Vidal] Flappy Bird')

const som_HIT = new Audio()
som_HIT.src = './efeitos/hit.wav'

const sprites = new Image()
sprites.src = './sprites.png'

const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')


// [Background]
const background = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height -204,
    desenha() {
        contexto.fillStyle = '#70c5ce'
        contexto.fillRect(0, 0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites,
            background.spriteX, background.spriteY,
            background.largura, background.altura,
            background.x, background.y,
            background.largura, background.altura,
        )
        contexto.drawImage(
            sprites,
            background.spriteX, background.spriteY,
            background.largura, background.altura,
            (background.x + background.largura), background.y,
            background.largura, background.altura,
        )
    }
}


// [Ground]
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height -112,
    desenha() {
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x, chao.y,
            chao.largura, chao.altura,
        )
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            (chao.x + chao.largura), chao.y,
            chao.largura, chao.altura,
        )
    }
}

// [Bird]
function fazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura
    const chaoY = chao.y

    if(flappyBirdY >= chaoY) {
        return true
    }

    return false
}

function criaFlappyBird() {
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        pulo: 4.6,
        pula() {
            console.log('Devo pular')
            flappyBird.velocidade = - flappyBird.pulo
        },
        gravidade: 0.2,
        velocidade: 0,
        atualiza() {
            if(fazColisao(flappyBird, chao)) {
                som_HIT.play()

                setTimeout(() => {
                    mudaParaTela(Telas.INICIO)
                }, 500)

                return
            }
    
            flappyBird.velocidade += flappyBird.gravidade
            flappyBird.y += flappyBird.velocidade
        },
        desenha() {
            contexto.drawImage(
                sprites,
                flappyBird.spriteX, flappyBird.spriteY, // Sprite X , Sprite Y
                flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura,
            )
        }
    }
    return flappyBird
}


/// [mensagemGetReady]
const mensagemGetReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.spriteX, mensagemGetReady.spriteY,
            mensagemGetReady.largura, mensagemGetReady.altura,
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.largura, mensagemGetReady.altura,
        )
    }
}


//
// [Screen]
//
const globais = {}
let telaAtiva = {}
function mudaParaTela(novaTela) {
    telaAtiva = novaTela

    if(telaAtiva.inicializa) {
        telaAtiva.inicializa()
    }
}

const Telas = {
    INICIO: {
        inicializa() {
            globais.flappyBird = criaFlappyBird()
        },
        desenha() {
            background.desenha()
            chao.desenha()
            globais.flappyBird.desenha()
            mensagemGetReady.desenha()
        },
        click() {
            mudaParaTela(Telas.JOGO)
        },
        atualiza() {

        }
    }
}

Telas.JOGO = {
    desenha() {
        background.desenha()
        chao.desenha()
        globais.flappyBird.desenha()
    },
    click() {
        globais.flappyBird.pula()
    },
    atualiza () {
        globais.flappyBird.atualiza()
    }
}


function loop() {

    telaAtiva.desenha()
    telaAtiva.atualiza()

    requestAnimationFrame(loop)

}

window.addEventListener('click', function() {
    if(telaAtiva.click) {
        telaAtiva.click()
    }
})

mudaParaTela(Telas.INICIO)
loop()