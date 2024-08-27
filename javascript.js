            totalValue -= price;
            totalValueElement.textContent = totalValue.toFixed(2);
            productList.removeChild(listItem);
            saveList();

            // Ocultar o botão de compartilhamento se a lista estiver vazia
            if (productList.children.length === 0) {
                shareButton.style.display = 'none';
            }
        });

        listItem.querySelector('.mark-btn').addEventListener('click', function() {
            listItem.classList.toggle('bought');
            saveList();
        });
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('product-name').value;
        const quantity = parseInt(document.getElementById('product-quantity').value);
        const price = parseFloat(document.getElementById('product-price').value);
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <span>${name} - ${quantity} unidades - R$ ${(price * quantity).toFixed(2)}</span>
            <div class="actions">
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Excluir</button>
                <button class="mark-btn">Marcar como Comprado</button>
            </div>
        `;

        addEventListeners(listItem);
        productList.appendChild(listItem);

        totalValue += price * quantity;
        totalValueElement.textContent = totalValue.toFixed(2);

        form.reset();
        saveList();

        // Mostrar o botão de compartilhamento quando um item é adicionado
        shareButton.style.display = 'block';
    });

    shareButton.addEventListener('click', function() {
        const items = [];
        productList.querySelectorAll('li').forEach(item => {
            items.push(item.querySelector('span').innerText);
        });

        const shareData = {
            title: 'Minha Lista de Compras',
            text: items.join('\n'),
        };

        if (navigator.share) {
            navigator.share(shareData)
                .then(() => console.log('Compartilhamento bem-sucedido'))
                .catch(err => console.log('Erro ao compartilhar:', err));
        } else {
            alert('Compartilhamento não suportado neste navegador.');
        }
    });

    function toggleTheme() {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        toggleThemeButton.textContent = isDarkMode ? 'Modo Claro' : 'Modo Noturno';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }

    // Carregar o tema salvo
    document.addEventListener('DOMContentLoaded', () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            toggleThemeButton.textContent = 'Modo Claro';
        } else {
            toggleThemeButton.textContent = 'Modo Noturno';
        }
    });

    toggleThemeButton.addEventListener('click', toggleTheme);

    window.addEventListener('load', loadList);

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('Service Worker registrado com sucesso!'))
        .catch(error => console.log('Erro ao registrar o Service Worker:', error));
    }
</script>
