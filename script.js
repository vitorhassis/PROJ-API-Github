function getApi () {
    const ul = document.querySelector('ul');
    const user = document.querySelector('#user').value; /*.value faz com que pegamos o valor que será escrito dentro desse espaço, no caso, o nome no perfil*/
    ul.innerHTML = ''/*garantimos que a ul vai estar vazia para ser preenchida, apartir do momento do click, evitando que ao clicar duas vezes ou mais, ele fique repitindo a pesquisa e concatenando tudo na coluna*/ 
    const pesquisa = document.querySelector('.pesquisa');
    const hr_rep = document.querySelector('.hr_rep');

    fetch(`https://api.github.com/users/${user}/repos`)
       /*res = resposta*/
      .then(async res => { 

        let data = await res.json();
        pesquisa.classList.add('exibir');
        hr_rep.classList.add('exibir_hr');

        data.map(item => { /*propriedade usada por ser uma array*/

         let li = document.createElement('li');
          li.classList.add('m-10');
         let hr = document.createElement('hr');     
         
         let circleColor;
         if(item.language) {
            switch (item.language) {
                case 'HTML' :
                    circleColor = 'orange';
                    break;
                case 'CSS' :
                    circleColor = 'purple';
                    break;
                case 'JavaScript' :
                    circleColor = 'yellow';
                    break;
                case 'C++' :
                    circleColor = 'pink';
                    break;
                case 'Python' :
                    circleColor = 'green';
                    break;
                case 'Java' :
                    circleColor = 'blue';
                    break;
                case 'C' :
                    circleColor = 'gray';
                    break;
                default :
                    circleColor = 'black';
            } 
        } else {
            circleColor = 'white';
        }

         li.innerHTML = ` 
        <div class="container">
            <div class="name-date">
                <h4 class="rep_name"> 
                    <a href="${item.html_url}">${item.name}</a>
                </h4>
                <span class="data-create">${new Intl.DateTimeFormat('pt-BR').format(new Date(item.created_at))}</span>
            </div>
            <div class="url_language">
                <span style="color:gray">${item.html_url}</span> 
                <span class="language">
                    <span class="circle" style="background-color:${circleColor}">
                    </span>${item.language}
                </span>
            </div> 
        </div>
        `
         ul.appendChild(li);
         ul.appendChild(hr);

        })

        

          
       })

       .catch(e => {
          console.log(e);
          ul.innerHTML = '';
          let li = document.createElement('li');
          li.innerHTML = ` 
          <strong class="msg_erro">Erro ao buscar usuário. Tente novamente!</strong>
          `
          ul.appendChild(li);
       })

}