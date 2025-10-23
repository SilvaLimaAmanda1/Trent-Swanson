// --- FUNÇÕES DE UTILTÁRIO ---

        // Função para simular o envio do formulário e feedback
        function handleFormSubmit(event) {
            event.preventDefault(); // Evita o recarregamento da página

            const feedback = document.getElementById('message-feedback');
            const form = event.target;
            
            // Simula o processamento do envio
            feedback.style.color = 'var(--accent-neon)';
            feedback.innerHTML = '🤖 Transmitindo dados... Por favor, aguarde.';

            setTimeout(() => {
                feedback.style.color = 'var(--accent-neon)';
                feedback.innerHTML = '✅ Mensagem Recebida no Servidor. Obrigado pelo Contato! (Simulação)';
                form.reset(); // Limpa o formulário após o "envio"
            }, 2000);
            
            // Em uma aplicação real, aqui você usaria 'fetch' para enviar os dados para um backend.
        }
        
        // --- EFEITO DE PARTÍCULAS (JavaScript para o Fundo Animado) ---
        
        const canvas = document.getElementById('particle-canvas');
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId;

        // Configurações do efeito
        const config = {
            particleCount: 80,
            lineDistance: 120,
            particleSize: 1.5,
            velocity: 0.2
        };

        // Função para redimensionar o canvas
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Recria as partículas ao redimensionar para evitar que fiquem fora da tela
            createParticles();
        }

        // Construtor de Partículas
        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * config.velocity;
                this.vy = (Math.random() - 0.5) * config.velocity;
                this.size = Math.random() * config.particleSize + 0.5;
            }

            draw() {
                ctx.fillStyle = 'var(--accent-neon)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }

            update() {
                // Movimento
                this.x += this.vx;
                this.y += this.vy;

                // Loop nas bordas (efeito de continuidade)
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
        }

        // Cria as partículas iniciais
        function createParticles() {
            particles = [];
            for (let i = 0; i < config.particleCount; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                particles.push(new Particle(x, y));
            }
        }

        // Desenha as linhas de conexão
        function drawLines() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < config.lineDistance) {
                        // Calcula a opacidade com base na distância
                        const opacity = 1 - (distance / config.lineDistance);
                        ctx.strokeStyle = `rgba(92, 225, 230, ${opacity * 0.7})`; 
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        // Loop principal da animação
        function animate() {
            animationFrameId = requestAnimationFrame(animate);

            // Limpa o canvas (para não deixar rastro)
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Atualiza e desenha partículas
            for (const particle of particles) {
                particle.update();
                particle.draw();
            }

            // Desenha as linhas entre partículas
            drawLines();
        }

        // Inicialização do script
        window.addEventListener('load', () => {
            // Configura o redimensionamento e cria as partículas
            resizeCanvas(); 
            // Inicia o loop de animação
            animate();
        });

        window.addEventListener('resize', resizeCanvas);
        
        // Finaliza o loop de animação ao fechar a janela
        window.addEventListener('beforeunload', () => {
            cancelAnimationFrame(animationFrameId);
        });