console.log('[Matheus Vidal] Flappy Bird')

let frames = 0

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

const chao = criaChao()
function criaChao() {
    return {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,

        atualiza() {
            const movimentoDoChao = 1
            const repeteEm = chao.largura / 2
            const movimentacao = chao.x - movimentoDoChao

            // console.log('[chao.x]', chao.x)
            // console.log('[repeteEm]', repeteEm)
            // console.log('[movimentacao]', movimentacao % repeteEm)
            

            chao.x = movimentacao % repeteEm
        },

        desenha() {
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x, chao.y,
                chao.largura, chao.altura
            ),
                contexto.drawImage(
                    sprites,
                    chao.spriteX, chao.spriteY,
                    chao.largura, chao.altura,
                    (chao.x + chao.largura), chao.y,
                    chao.largura, chao.altura
                )
        }
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
            if(fazColisao(flappyBird, globais.chao)) {
                som_HIT.play()

                mudaParaTela(Telas.GAME_OVER)


                return
            }
    
            flappyBird.velocidade += flappyBird.gravidade
            flappyBird.y += flappyBird.velocidade
        },
        movimentos: [
            { spriteX: 0, spriteY: 0, }, // asa pra cima
            { spriteX: 0, spriteY: 26, }, // asa no meio
            { spriteX: 0, spriteY: 26, }, // asa no meio
            { spriteX: 0, spriteY: 52, }, // asa pra baixo
        ],
        frameAtual: 0,
        atualizaOFrameAtual(){
            const intervaloDeFrames = 8
            const passouOIntervalo = frames % intervaloDeFrames === 0
            if(passouOIntervalo){
                const baseDoIncremento = 1
                const incremento = baseDoIncremento + flappyBird.frameAtual
                const baseRepeticao = flappyBird.movimentos.length
                flappyBird.frameAtual = incremento % baseRepeticao
            }
        },
        desenha() {
            flappyBird.atualizaOFrameAtual()
            const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual]
            contexto.drawImage(
                sprites,
                spriteX, spriteY, // Sprite X , Sprite Y
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

// [Mensagem Game Over]
const mensagemGameOver = {
    spriteX: 134,
    spriteY: 153,
    largura: 226,
    altura: 200,
    x: (canvas.width / 2) - 226 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGameOver.spriteX, mensagemGameOver.spriteY,
            mensagemGameOver.largura, mensagemGameOver.altura,
            mensagemGameOver.x, mensagemGetReady.y,
            mensagemGameOver.largura, mensagemGameOver.altura,
        )
    }
}

function criaCanos() {
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        desenha() {
            
            canos.pares.forEach(function(par) {
                const espacamentoEntreCanos = 90
                const yRandom = par.y
    
                const canoCeuX = par.x
                const canoCeuY = yRandom

                // [Cano do C??u]
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura,
                )
    
                // [Cano do Ch??o]
                const canoChaoX = par.x
                const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                )

                par.canoCeu = {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY
                }
                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY
                }
            })

        },
        temColisaoComOFlappyBird(par) {
            const cabecaDoFlappy = globais.flappyBird.y
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura

            if((globais.flappyBird.x + globais.flappyBird.largura) >= par.x) {
                
                if(cabecaDoFlappy <= par.canoCeu.y) {
                    return true
                }
                if(peDoFlappy >= par.canoChao.y){
                    return true
                }
            }
        },
        pares: [],
        atualiza() {
            const passou100Frames = frames % 100 === 0
            if(passou100Frames) {
                canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),
                })
            }

            canos.pares.forEach(function(par) {
                par.x = par.x - 2

                if(canos.temColisaoComOFlappyBird(par)) {
                    console.log('Voce perdeu')
                    som_HIT.play()
                    mudaParaTela(Telas.GAME_OVER)
                }

                if(par.x + canos.largura <= 0) {
                    canos.pares.shift()
                }
            })
        }
    }
    return canos
}

function criaPlacar(){
    const placar = {
        pontuacao: 0,
        desenha() {
            contexto.font = "35px 'VT323'"
            contexto.textAlign ='right'
            contexto.fillStyle = 'white'
            contexto.fillText(`Pontos ${placar.pontuacao}`, canvas.width - 10, 35)
        },
        atualiza() {
            const intervaloDeFrames = 100
            const passouOIntervalo = frames % intervaloDeFrames === 0

            if(passouOIntervalo){
                placar.pontuacao = placar.pontuacao + 1

            }
        }
    }
    return placar
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
            globais.chao = criaChao()
            globais.canos = criaCanos()
        },
        desenha() {
            background.desenha()
            globais.flappyBird.desenha()
            mensagemGetReady.desenha()
            globais.chao.desenha()
        },
        click() {
            mudaParaTela(Telas.JOGO)
        },
        atualiza() {
            globais.chao.atualiza()
        }
    }
}

Telas.JOGO = {
    inicializa() {
        globais.placar = criaPlacar()
    },
    desenha() {
        background.desenha()
        globais.canos.desenha()
        globais.chao.desenha()
        globais.flappyBird.desenha()
        globais.placar.desenha()
    },
    click() {
        globais.flappyBird.pula()
    },
    atualiza () {
        globais.flappyBird.atualiza()
        globais.chao.atualiza()
        globais.canos.atualiza()
        globais.placar.atualiza()
    }
}

Telas.GAME_OVER = {
    desenha(){
        mensagemGameOver.desenha()
    },
    atualiza() {

    },
    click() {
        mudaParaTela(Telas.INICIO)
    }
}


function loop() {

    telaAtiva.desenha()
    telaAtiva.atualiza()

    frames = frames + 1
    requestAnimationFrame(loop)

}

window.addEventListener('click', function() {
    if(telaAtiva.click) {
        telaAtiva.click()
    }
})

mudaParaTela(Telas.INICIO)
loop()