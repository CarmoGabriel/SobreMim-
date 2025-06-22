
/* código para a criação de um carrossel de fotos -----------------------*/

function alterarImagem(indice, identify){ /* o identify é uma string em aspas simples */
    const fotos= document.querySelectorAll(identify);
    
    fotos.forEach(foto => {
        foto.classList.remove('ativa')
    });
    fotos[indice].classList.add('ativa');
     
};

/* <div id="carrosselOver" class="overlayImg" >  container de todo o caarrossel*/
const overlay = document.getElementById('carrosselOver'); 

/* <img class="imgOrigem foto" src="" alt="">  imagens que são exibidas na pagina*/
const imgPerfil= document.querySelectorAll('.imgOrigem');

/* <img class="imgOver foto" src="" alt="">  imagens que são exibidas na pagina*/
const imgOver= document.querySelectorAll('.imgOver');

imgPerfil.forEach(img => {

    img.addEventListener('click', () => {

        imgOver.forEach((imgO, i)  => {
            imgO.src = imgPerfil[i].src;
            imgO.alt = imgPerfil[i].alt;
            overlay.classList.remove('overlOculto');
            overlay.classList.add('overlayImg');
        });

    });

});
const buttonClose= document.getElementById('closeOver')
if(buttonClose){
    buttonClose.addEventListener('click', () => {
        overlay.classList.remove('overlayImg');
        overlay.classList.add('overlOculto');
    });
}

/* código para a inclusão de uma nova uc -------------------------------------*/
  
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
            <div class="botoesPosicao"> 
                <button class="Aesquerda" onclick="moverUCaEsquerda()"> &#x1F448</button>
                <button class="Adireita" onclick="moverUCaDireita()"> &#x1F449</button>
            </div>
        `;

        form.parentElement.remove();
        container.appendChild(novaUC);

    }

/* código para mover os blocos de uc -------*/

function moverUCaEsquerda(){
    document.querySelectorAll('.Aesquerda').forEach(botao => {
        
        const uc= botao.closest('.infoUc');
        const anterior= uc.previousElementSibling;
        if (anterior) {
            uc.parentNode.insertBefore(uc, anterior) 
        }
    })
}

function moverUCaDireita(){
    document.querySelectorAll('.Adireita').forEach(botao => {

        const uc = botao.closest('.infoUc');
        const next = uc.nextElementSibling;
        const proximo= next.nextElementSibling;
        if (next){
            uc.parentNode.insertBefore(proximo, uc);
        }

    });
}
 
/* código para editar a descriçaõ  -------------------------------------------------- */

function editarDecricao(){

    const desc= document.getElementById('descricaoPessoa');
    const texto= desc.textContent;
    const butonEdit= document.getElementById('edit')

    butonEdit.style.display= 'none';

    const input= document.createElement('textarea');
    input.value= texto;
    input.rows= texto.split('\n').length;

    const save= document.createElement('button');
    save.textContent= 'salvar';

    save.addEventListener('click', () =>{
        desc.textContent = input.value; 
        desc.style.display= 'block';
        input.remove();
        save.remove();
    });

    desc.style.display= 'none';
    desc.parentElement.insertBefore(input, desc);
    desc.parentElement.insertBefore(save, desc);

}

/* código para validar os inputs do formulário ------------------------------------- */


/*Bloco que valida o formato do CPF  */
const blocoCPF= document.getElementById('campoCPF');
const inputCpf= document.getElementById('inputCpf');

const corpo= document.querySelector('.corpo');

blocoCPF.addEventListener('submit', () => {
    event.preventDefault();
    
    let numero = inputCpf.value.replace(/\D/g , '') 
    
    const overlay = document.createElement('div');
    overlay.classList.add('overlayMsg');

    if (numero.length !== 11){
        overlay.innerHTML= `
            <div class="conteudo">
                <p>O valor fornecido(${numero}) <br>
                 não se enquadra como um CPF!!! </p>
                <button id="close">ok</button>
            </div> `
        overlay.style.display='flex'; 

        inputCpf.placeholder= 'Digite um novo cpf';
        inputCpf.value = ''; 

    } else {
        overlay.innerHTML= `
            <div class="conteudo">
                <p>O valor fornecido(${numero}) <br>
                se enquadra como um CPF!!! </p>
                <button id="close">ok</button>
            </div> ` 
        overlay.style.display='flex';

        inputCpf.placeholder= 'Digite um novo cpf';
        inputCpf.value = ''; 
        
    }
    corpo.appendChild(overlay)

    const botao = document.getElementById('close');
    botao.addEventListener('click', () =>{
        overlay.remove();
    })

    

})

/*Bloco que valida o formato do E-MAIL  */
const blocoEmail= document.getElementById('campoEmail');
const inputEmail= document.getElementById('inputEmail')

blocoEmail.addEventListener('submit', () =>{

    event.preventDefault();

    let mascara= /^[\w.-]+@[\w.-]+\.\w{2,}$/;

    const overlay = document.createElement('div');
    overlay.classList.add('overlayMsg');
    let email= inputEmail.value;

    if (!mascara.test(inputEmail.value)){

        overlay.innerHTML= `
            <div class="conteudo">
                <p>O valor fornecido(${email}) <br>
                 não se enquadra como um E-MAIL!!! </p>
                <button id="close">ok</button>
            </div> `
        overlay.style.display='flex'; 

        inputEmail.placeholder= 'Digite um novo email';
        inputEmail.value = '';

    }else {
        
        overlay.innerHTML= `
            <div class="conteudo">
                <p>O valor fornecido(${email}) <br>
                 se enquadra como um E-MAIL!!! </p>
                <button id="close">ok</button>
            </div> `
        overlay.style.display='flex'; 

        inputEmail.placeholder= 'Digite um novo email';
        inputEmail.value = ''; 
    }

    corpo.appendChild(overlay)

    const botao = document.getElementById('close');
    botao.addEventListener('click', () =>{
        overlay.remove();
    })

})


/* bloco que cria o overlay de confirmação*/


