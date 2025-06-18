
function FormAdd(){  // isso cria um form para adicionar os valores a uc

        const container= document.querySelector('.listaUcs');

        const formUc= document.createElement('div');
        formUc.classList.add('formUc');
        formUc.innerHTML= `
            <form onsubmit="AddNovaUc(event, this)" ">
                <fieldset>
                    
                    <label for="imagemUC">Insira o link da imagem</label>
                    <input type="text" name="link" placeholder="https::/...">
                    
                    <label for="nomeUC">Unidade Curricular</label>
                    <input type="text" name="nomeuc" placeholder="Nome Uc">

                    <label for="dataUC">Data:</label>
                    <input type="date" name="data">

                    <button type="submit">Criar UC</button>

                </fieldset>
            </form>
        `;

        container.appendChild(formUc)
    }


    function AddNovaUc(event,form){ // iss cria a div com a estrutura da uc

        event.preventDefault();  // Impede que a página recarregue

        const link= form.link.value;
        const nomeuc= form.nomeuc.value;
        const data= form.data.value; 

        const container= document.querySelector('.listaUcs');

        const novaUC= document.createElement('div');
        novaUC.classList.add('infoUc');
        novaUC.innerHTML= `
            <img src="${link}" alt:"imagem de teste">
            <div class="descricaoUC">
                <h3>${nomeuc}</h3>
                <p>${data}</p>
            </div>
        `;

        form.parentElement.remove();
        container.appendChild(novaUC);

    }


    let indiceAtual= 0; 
    
    function alterarImagem(direcao){

        const fotos= document.querySelectorAll('.foto');
        function mostrarFotoAtiva(n){
            fotos.forEach(foto => foto.classList.remove('ativa'));
            fotos[n].classList.add('ativa');
        }

        indiceAtual = ( indiceAtual + direcao + fotos.length) % fotos.length; 
        mostrarFotoAtiva(indiceAtual);
    }