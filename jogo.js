console.log('[Matheus Vidal] Flappy Bird')

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
const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,

    // [Bird fly]
    atualiza() {
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

function loop() {

    background.desenha()
    chao.desenha()
    flappyBird.desenha()
    flappyBird.atualiza()

    requestAnimationFrame(loop)

}

loop()