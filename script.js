// primeiro passo é pegar o json e mapear
// seleciona a classe models e pizza-item e clona
// depois pega a area onde ficam as pizzas e adiciona o pizzaItem 7 vezes conforme foi feito pelo map
// faz um atalho para usar document.querySelector
// pizzaItem.querySelector() pizzaItem carrega o models e o pizza item, logo ele é usado no lugar do document
// toFixed(2) formata o valor em reais
// src é o atributo que seleciona a parte que temos src no código
// adicionar o evento de click na tag a
// addEventListener('click', (e) => {e.preventDefault}) adiciona o evento
// preventDefault() prevê a ação padrão ao clicar no item e bloqueia, no caso antes era atualizada a pag
// primeiro deixamos a opacidade em zero e diplay flex
// para ter uma animação, fazemos um setTimeout() e mudamos a opacity para 1
// isso fará ter uma suavização na hora de mostrar o modal para nós
// usamos o pizzaItem.setAttribute('data-key', index) para atribuir ao pizza item uma chave para cada item do index
// e.target.closest('pizza-item') ele pegara a classe mais próxima com esse nome
// coloca as informações no modal nas pizzaInfo
// faz o foreach para selecionar os tamanhos
// remove quando a grande não estiver selecionado e adiciona quando a grande esiver selecionada
// define a quantidade igual a 1 
// fechar o modal atravé sdo closeModal, fazendo um settimeout e um display none
// depois faz um cAll(div button e no button mobile).forEach( item => item.addEventListener('click', closeModal))
// seleciona a div de qtmais e faz um addEventIlistener('click', () => {}) dentro faz um modal++,
// dentro da função anonima aumenta modalQT++ pega a div pizza info e da um innerHTML = modalQT para mostrar o valor atualizado
// div qt é semelhante ao qt mais, porém é feito um if(modalQT > 1) para n reduzir de um
// se a condição for maior que 1 ele diminuirá.
// no tamanho da pizza, faz um forEach(size, sizeIndex), para aplicar em cada tamnho,
// dentro coloca a pizza com os tamanhos e o addEventListener com parametro e
// para selecionar cada elemento remove a selecão de um e colcoa em outro com
// size.classList.add('selected')
// criar o array do carrinho let cart = []
// faz um addEventListener(() =>{}) no botão do carrinho
// la em pizza item devemos pegar  a nossa key do modal, pegamos a variasvel modalKey e passamos a key do modal aberto
// pegamos a div que contem o tamanho da pizza, passamos pra variavel let size
// e acessamos o data-key dela por meio do getAttribute('data-key');
// adicionar ao array cart atravesa de um push e cria um objeto dentro
// cart.push({id:pizzaJson[modalKey[].id, size, qt:modalQT })
// size: size pode ser reduzido em size, por ter o mesmo nome
// por fim, fecha o modal closeModal()
// cria o identifier = pizzaJson[modalKey].id+'@'+size;
// coloca identifier deIntro do cart.push([])
// let key  = cart.findIndex(item => item.identifier == identifier); ele vai procurar pelo item d eidentifier igual
// o let key tem que ser dentro de um if, caso não tenha identifier igual, ele fará o push no cart[] 
// cria o updateCart() com um if dentro que mostrará a tela d ecompra e o else que removera
// dentro do if c('aside').classList.add('.show');
// dentro do else c('aside).classList.remove('.show');
// for(let i in cart) {} para checar todos os itens dentro de cart
// let pizzaItem = pizzaJson.find(item => item.id == cart[i].id);
// depois de fazer if pra mostrar e for pra encontrar fecha o updateCart();, pois são feitos dentro do update cart
// é feito o update Cart para o usuario inserir mais pizza dentro do carrinho. 
// cria a variavel do item do carro e clona
// antes do for, zera a classe cart: c('cart').innerHTML = '';
// let cartItem = c('.models .cart-item').cloneNode(true);
// logo após adiciona o cart item com append
// c('.cart').append(cartItem);
// agora temos que preencher as informações do cart
// cartItem.querySelector('img').src = pizzaItem.img;
// cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
// para preencher o tamanho atraves do pizzaSizeName é necessário o uso do switch
// let pizzaSizeName;
// switch(cart[i].size) { case 0:  pizzaSizeName ='p' break; case 1: pizzaSizeName = 'm' break; case 2: pizzaSizeName= 'g' break;}
// let pizzaName = `${pizzaItem.name} (${pizzaSizeName});` ele preencherá o nome  e o tamanho
// cartItem.querySelector('.cart--item00qt').innerHTML = cart[i].qt;

let cart = [];
let modalQT = 1;
let modalkey = 0;

const c = el => document.querySelector(el);
const cAll = el => document.querySelectorAll(el); 

//LISTAGEM DAS PIZZAS
pizzaJson.map((item, index)=>{

  let pizzaItem = c('.models .pizza-item').cloneNode(true);
  pizzaItem.setAttribute('data-key', index);
  pizzaItem.querySelector('.pizza-item--img img').src =  item.img;
  pizzaItem.querySelector('.pizza-item--price').innerHTML =`R$ ${item.price.toFixed(2)}`;
  pizzaItem.querySelector('.pizza-item--name').innerHTML= item.name;
  pizzaItem.querySelector('.pizza-item--desc').innerHTML= item.description;
 
  pizzaItem.querySelector('a').addEventListener('click', (e)=> {

    e.preventDefault();

    let key = e.target.closest('.pizza-item').getAttribute('data-key');
    modalQT =1;
    modalkey = key;
    c('.pizzaBig img').src = pizzaJson[key].img;
    c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
    c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
    c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
    c('.pizzaInfo--size.selected').classList.remove('selected');
    cAll('.pizzaInfo--size').forEach((size, sizeIndex)=>{

      if(sizeIndex == 2) {

        size.classList.add('selected');

      }

      size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];

    });

    c('.pizzaInfo--qt').innerHTML = modalQT;
    c('.pizzaWindowArea').style.opacity = 0;
    c('.pizzaWindowArea').style.display = 'flex';

    setTimeout(() => {

    c('.pizzaWindowArea').style.opacity = 1;

    }, 300);

});

  c('.pizza-area').append(pizzaItem);

});

//EVENTOS DO MODAL

function closeModal() {

c('.pizzaWindowArea').style.opacity = 0;

setTimeout(() => {

  c('.pizzaWindowArea').style.display = 'none';



}, 500)


}

cAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{


  item.addEventListener('click', closeModal);

});


c('.pizzaInfo--qtmenos').addEventListener('click', () => {

 

  if(modalQT > 1) {

    modalQT--;

    c('.pizzaInfo--qt').innerHTML = modalQT;

  }

});

c('.pizzaInfo--qtmais').addEventListener('click', () => {

  modalQT++;

  c('.pizzaInfo--qt').innerHTML = modalQT;


});

cAll('.pizzaInfo--size').forEach((size, sizeIndex) =>{

  size.addEventListener('click', (e)=>{

    c('.pizzaInfo--size.selected').classList.remove('selected');

    size.classList.add('selected');

  });

});

c('.pizzaInfo--addButton').addEventListener('click',()=>{

let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));

let identifier = pizzaJson[modalkey].id+'-'+size; 

let key = cart.findIndex(item => item.identifier == identifier);

 if(key > -1) {

  cart[key].qt += modalQT;
 }  else {

  cart.push({
    identifier,
    id: pizzaJson[modalkey].id,
    size,
    qt: modalQT

});
   
 }

updateCart();
closeModal();

});

c('.menu-opener').addEventListener('click', ()=>{

  if(cart.length > 0) {

    c('aside').style.left = '0';

  }

});

c('.menu-closer').addEventListener('click', ()=> {

    c('aside').style.left = '100vw';

});

function updateCart() {
  c('.menu-opener span').innerHTML = cart.length;

  if(cart.length > 0 ) {

    c('aside').classList.add('show');
    c('.cart').innerHTML = '';
    
    let subtotal = 0;
    let total = 0;
    let desconto = 0;


    for(let i in cart) {

        let pizzaItem = pizzaJson.find(item => item.id == cart[i].id);
        let cartItem = c('.models .cart--item').cloneNode(true);
        
        subtotal += pizzaItem.price * cart[i].qt;


        let pizzaSizeName;

        switch(cart[i].size) {

          case 0:

            pizzaSizeName = 'P';
            break;

          case 1:

            pizzaSizeName = 'M';
            break;


          case 2: 

            pizzaSizeName = 'G';
            break;


        }

        let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;


        cartItem.querySelector('img').src = pizzaItem.img;
        cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
        cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

        cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () =>{

          if(cart[i].qt > 1) {

            cart[i].qt--;
          

          } else {

             cart.splice(i, 1);
             
          }

          updateCart();

        });

        cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=> {

          cart[i].qt++;
          updateCart();


        });
        
        
        c('.cart').append(cartItem);
        
    }

      desconto = subtotal * 0.1;
      total = subtotal - desconto;


      c('.subtotal span:last-child').innerHTML = `${subtotal.toFixed(2)}`;
      c('.desconto span:last-child').innerHTML = `${desconto.toFixed(2)}`;
      c('.total span:last-child').innerHTML = `${total.toFixed(2)}`;
  
  } else {

    c('aside').classList.remove('show');

  }  


}