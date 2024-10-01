function getApi () {
    const ul = document.querySelector('ul');
    const user = document.querySelector('#user').value; /*.value faz com que pegamos o valor que será escrito dentro desse espaço, no caso, o nome no perfil*/
    ul.innerHTML = ''/*garantimos que a ul vai estar vazia para ser preenchida, apartir do momento do click, evitando que ao clicar duas vezes ou mais, ele fique repitindo a pesquisa e concatenando tudo na coluna*/ 

    fetch(`https://api.github.com/users/${user}/repos`)
       /*res = resposta*/
      .then(async res => { 

        let data = await res.json();

        data.map(item => { /*propriedade usada por ser uma array*/

         let li = document.createElement('li');
          li.classList.add('m-10');

         let hr = document.createElement('hr');
         
         li.innerHTML = ` <strong> ${item.name} </strong>
         <span>${item.html_url}</span> `

         ul.appendChild(li);
         ul.appendChild(hr);

        })

        

          
       })

       .catch(e => {
          console.log(e);
          ul.innerHTML = '';
          let li = document.createElement('li');
          li.classList.add('m-10');
          li.innerHTML = ` <strong>Erro ao buscar usuário. Tente novamente!</strong>`
          ul.appendChild(li);
       })

}