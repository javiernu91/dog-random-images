
//Dogs

const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=3';
const API_URL_FAVORITES = 'https://api.thedogapi.com/v1/favourites';

const API_URL_FAVORITES_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}`;
const API_URL_UPLOAD = 'https://api.thedogapi.com/v1/images/upload';


//Cats

// const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_DB0Ct3974Tr8PtpWsvpYlmGHLbYNrK8SCKEMQ9f0WnHfUYVgGfRPbMuMXQ8RvejR';
// const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?limit=4&api_key=live_DB0Ct3974Tr8PtpWsvpYlmGHLbYNrK8SCKEMQ9f0WnHfUYVgGfRPbMuMXQ8RvejR'

// const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_DB0Ct3974Tr8PtpWsvpYlmGHLbYNrK8SCKEMQ9f0WnHfUYVgGfRPbMuMXQ8RvejR`




const spanError = document.getElementById('error');

async function loadRandomDogs(){
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log('Random');
  console.log(data);

  if(res.status !== 200) {

    spanError.innerHTML = "Hubo un error: " + res.status ;
    
  } else {
    const img1 = document.querySelector('#img1');
    const img2 = document.querySelector('#img2');
    const img3 = document.querySelector('#img3');
    const btn1 = document.querySelector('#btn1');
    const btn2 = document.querySelector('#btn2');
    const btn3 = document.querySelector('#btn3');
    
    img1.src = data[0].url; 
    img2.src = data[1].url; 
    img3.src = data[2].url; 
    
    btn1.onclick = () => saveFavoriteDog(data[0].id);
    btn2.onclick = () => saveFavoriteDog(data[1].id);
    btn3.onclick = () => saveFavoriteDog(data[2].id);
    
  }

  
  
}

async function loadFavoritesDogs(){
  const res = await fetch(API_URL_FAVORITES, {
    method: 'GET',
    headers: {
      'X-API-KEY': 'live_vL2h9mboIPJjM0xjCfgZM6HoKbMwNWoPQ0VkEjdcHIqrlRNredafV5p9wnpLv3w2',
    },
  });
  const data = await res.json();
  console.log('Favorites');
  console.log(data);

  if(res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status ;
  } else {
    
    const section = document.querySelector('#favoritesDogs')

    section.innerHTML = "";

    const favoriteCardsContainer = document.createElement('div');
    const h2 = document.createElement('h2');
    const h2Text = document.createTextNode('Favorites dogs...');
    h2.appendChild(h2Text);
    section.appendChild(h2);
    section.appendChild(favoriteCardsContainer);

    favoriteCardsContainer.className = "favorite-cards-container";

    data.forEach(dog => {
      const article = document.createElement('article');
      const container = document.createElement('div');
      const img = document.createElement('img');
      const btn = document.createElement('button');
      const btnText = document.createTextNode('Elimitar la imagen de favoritos');

      btn.appendChild(btnText);
      img.src = dog.image.url;

      container.appendChild(img)

      article.appendChild(container);
      article.appendChild(btn);

      favoriteCardsContainer.appendChild(article);


      article.className = "card";
      container.className = "image-container";

      btn.onclick = () => {
      deleteFavoriteDog(dog.id);
      console.log('Delete');
      }
    })
  } 
  
}

async function saveFavoriteDog(id) {
  const res = await fetch(API_URL_FAVORITES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': 'live_vL2h9mboIPJjM0xjCfgZM6HoKbMwNWoPQ0VkEjdcHIqrlRNredafV5p9wnpLv3w2'
    },
    body: JSON.stringify({
      image_id: id
    }),
  })

  console.log('La imágen se guardó correctamente en favoritos');
  console.log(res);
  loadFavoritesDogs();
}

async function deleteFavoriteDog(id){
  const res = await fetch(API_URL_FAVORITES_DELETE(id), {
    method: 'DELETE',
    headers: {
      'X-API-KEY': 'live_vL2h9mboIPJjM0xjCfgZM6HoKbMwNWoPQ0VkEjdcHIqrlRNredafV5p9wnpLv3w2'
    }
  });

  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log('Imágen eliminada de favoritos');
    loadFavoritesDogs();
  }

}


const btnReload = document.querySelector('#reloadBtn');

btnReload.onclick = () => {
  loadRandomDogs();   
  //location.reload();
  console.log('btn reload');
}


async function uploadDogImage(){
  const form = document.querySelector('#uploadingForm');
  const formData = new FormData(form);
  console.log('Imagen cargada existosamente');
  console.log(formData.get('file'));

  const res = await fetch(API_URL_UPLOAD , {
    method: 'POST',
    headers: {
      //'Content-Type': 'multipart/form-data',
      'X-API-KEY': 'live_vL2h9mboIPJjM0xjCfgZM6HoKbMwNWoPQ0VkEjdcHIqrlRNredafV5p9wnpLv3w2'
    },
    body: formData,
  })
}

loadRandomDogs();
loadFavoritesDogs();
