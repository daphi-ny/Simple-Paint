document.addEventListener('DOMContentLoaded', () => {
    const tela = document.querySelector('#tela');
    const contex = tela.getContext('2d');

    const cor = document.getElementById('trocarCor');
    cor.addEventListener('change', (event) => {
        contex.strokeStyle = cor.value;
    });

    const largura = document.getElementById('tamanhoPincel');
    largura.addEventListener('change', (event) => {
        contex.lineWidth = largura.value;
    });

    const borracha = document.getElementById('borracha');
    borracha.addEventListener('click', (event) => {
        contex.strokeStyle = 'white';
    });

    const caneta = document.getElementById('pincel');
    caneta.addEventListener('click', (event) => {
        contex.strokeStyle = 'black';
    });

    const limpar = document.getElementById('limpar');
    limpar.addEventListener('click', (event) => {
        window.location.reload();
    });

    const pincel = {
        ativo: false,
        movendo: false,
        posAtual: { x: 0, y: 0 },
        posAnt: null
    };

    tela.width = 900;
    tela.height = 700;

    const desenharLinha = (linha) => {
        contex.beginPath();
        contex.moveTo(linha.posAnt.x, linha.posAnt.y);
        contex.lineTo(linha.posAtual.x, linha.posAtual.y);
        contex.stroke();
    };

    const getCoordenadasCanvas = (evento) => {
        const retangulo = tela.getBoundingClientRect();
        const deslocamentoX = evento.clientX - retangulo.left;
        const deslocamentoY = evento.clientY - retangulo.top;
        return { x: deslocamentoX, y: deslocamentoY };
    };

    tela.onmousedown = (evento) => {
        pincel.ativo = true;
        pincel.posAtual = getCoordenadasCanvas(evento);
    };

    tela.onmouseup = (evento) => {
        pincel.ativo = false;
    };

    tela.onmousemove = (evento) => {
        if (pincel.ativo) {
            pincel.posAnt = pincel.posAtual;
            pincel.posAtual = getCoordenadasCanvas(evento);
            pincel.movendo = true;
        }
    };

    const circulo = () => {
        if (pincel.ativo && pincel.movendo && pincel.posAnt) {
            desenharLinha({ posAtual: pincel.posAtual, posAnt: pincel.posAnt });
            pincel.movendo = false;
        }
        pincel.posAnt = { ...pincel.posAtual };

        setTimeout(circulo, 5);
    };

    circulo();
});
