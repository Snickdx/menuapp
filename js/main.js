  document.addEventListener('DOMContentLoaded', function() {
    
    let newMeal = "";
    let meals = [];
    let counter = 0;
    const server = "http://192.168.100.210:3000";


    const addModal = M.Modal.init(document.querySelector('#modal1'), {
      onCloseEnd: async _=> {

        let mealDesc = document.querySelector("#mealDesc").value;
        let mealImg = document.querySelector('#picture').files[0];

        const formData = new FormData();
        formData.append('description', mealDesc);
        formData.append('picture', mealImg);

        let response = await post(`${server}/api/meals`, formData);
        console.log(await response.json());
        M.toast({html: 'Meal Added!'})
      }
    });

    function renderMeals(meals){
      let html = '';
      meals.forEach(meal => {
        html+=`
        <div class="card">
          <div class="card-image">
            <img src="${server}/uploads/${meal.id}.png">
            <span class="card-title">Meal #${meal.id}</span>
            <a class="btn-floating halfway-fab waves-effect waves-light red modal-trigger" href="#modal2"><i class="material-icons">edit</i></a>
          </div>
          <div class="card-content">
            <p>${meal.description}</p>
          </div>
          </div>
        `;
      });  
      let mealContainer = document.querySelector('#mealContainer');
      console.log(mealContainer);
    }

    function renderMeal(index){
      if(meals.length > 0){
        document.querySelector('#mealId').innerHTML =meals[index].id;
        document.querySelector('#mealDescription').innerHTML =meals[index].description;
        document.querySelector('#mealImage').setAttribute('src', `${server}/uploads/${meals[index].id}.png`);
      }
    }

    async function loadMenu(){
      meals = await (await get(`${server}/api/meals`)).json();
      renderMeal(0);
      setInterval(async _=>{
        let index = ++counter % meals.length;
        renderMeal(index);
        if(counter % 4 === 0) meals = await (await get(`${server}/api/meals`)).json();
      }, 5000);

    }

    function get(url){
      return fetch(url);
    }

    function post(url, data){
      return fetch(url, {
        method:'POST',
        body:data,
      });
    }

    loadMenu();
  });