// Lista de vídeos (adicione os nomes dos seus arquivos aqui)
const videos = [
    "video1.mp4",
    "video2.mp4",
    "video3.mp4",
    "video4.mp4"
];

// Função para embaralhar array (Fisher-Yates)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Cria os cards de vídeo dinamicamente
function criarVideoCards() {
    const container = document.getElementById('videoContainer');
    const videosEmbaralhados = shuffleArray([...videos]); // Cria uma cópia para não alterar o original

    videosEmbaralhados.forEach(videoFile => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';

        const videoElement = document.createElement('video');
        videoElement.className = 'video';
        videoElement.loop = true;
        videoElement.muted = true;
        videoElement.autoplay = true;

        const sourceElement = document.createElement('source');
        sourceElement.src = `videos/${videoFile}`; // Pasta "videos" no mesmo diretório
        sourceElement.type = 'video/mp4';

        const acoesDiv = document.createElement('div');
        acoesDiv.className = 'acoes';

        const botaoCurtir = document.createElement('button');
        botaoCurtir.className = 'coracao';
        botaoCurtir.innerHTML = '<i class="fas fa-heart"></i>';

        // Monta a estrutura
        videoElement.appendChild(sourceElement);
        acoesDiv.appendChild(botaoCurtir);
        videoCard.appendChild(videoElement);
        videoCard.appendChild(acoesDiv);
        container.appendChild(videoCard);
    });

    // Atualiza o Intersection Observer para os novos vídeos
    atualizarIntersectionObserver();
}

// Configura o Intersection Observer para autoplay
function atualizarIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target.querySelector('.video');
            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.video-card').forEach(card => {
        observer.observe(card);
    });
}

// Função para criar corações flutuantes
function createHearts(event) {
    const heartsContainer = document.getElementById('hearts-container');
    const numberOfHearts = 8;
    
    for(let i = 0; i < numberOfHearts; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.className = 'heart-effect';
        
        // Posição aleatória ao redor do clique
        const offset = 50;
        const x = event.clientX + (Math.random() - 0.5) * offset;
        const y = event.clientY + (Math.random() - 0.5) * offset;
        
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.position = 'fixed';
        heart.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        heartsContainer.appendChild(heart);
        
        // Remove o coração após a animação
        setTimeout(() => heart.remove(), 3000);
    }
}

// Evento de curtir atualizado
document.getElementById('videoContainer').addEventListener('click', (e) => {
    if (e.target.closest('.coracao')) {
        const coracao = e.target.closest('.coracao');
        coracao.classList.toggle('ativo');
        createHearts(e); // Chama a função dos corações
    }
});


// Evento de curtir (usando delegação de evento)
document.getElementById('videoContainer').addEventListener('click', (e) => {
    if (e.target.closest('.coracao')) {
        const coracao = e.target.closest('.coracao');
        coracao.classList.toggle('ativo');
        coracao.style.color = coracao.classList.contains('ativo') ? '#ff4040' : '#ff6b6b';
    }
});

// Inicia tudo quando a página carregar
window.onload = criarVideoCards;
