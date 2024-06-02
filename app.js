

import {saveForm, getForms, onGetForms, deleteForm, getForm, updateForm} from './firebase.js'

const taskForm = document.getElementById("task-form");
const dataContainer = document.getElementById("data-container");
const confirmDeleteButton = document.getElementById("confirm-delete");
const hideModal = new bootstrap.Modal(document.getElementById('modal'));

let editStatus = false;
let id = '';
let idToDelete = '';

window.addEventListener('DOMContentLoaded', async() =>{
   
    onGetForms((querySnapshot) => {

      let html = "";

      querySnapshot.forEach(doc => {
          
        const dishes = doc.data();
          html += 
              `<div class="dishes-container">
                <h3>${dishes.name}</h3>
                <p>Precio: $${dishes.price}</p>
                <p>Descripción: ${dishes.description}</p>
                <p>Categoría: ${dishes.category}</p>
                <p>Ingredientes: ${dishes.ingredients}</p>
                <button class= 'btn-eliminar btn btn-danger' data-id="${doc.id}" data-bs-toggle="modal" data-bs-target="#modal">ELIMINAR</button>
                <button class= 'btn-editar btn btn-success' data-id="${doc.id}">EDITAR</button>
              </div>`
            ;
      });
  
      dataContainer.innerHTML = html;

      const btnsEliminar = dataContainer.querySelectorAll('.btn-eliminar');
        btnsEliminar.forEach(btn => {
            btn.addEventListener('click', ({ target: { dataset } }) => {
                idToDelete = dataset.id;

                
            });
        });

      const btnsEditar = dataContainer.querySelectorAll('.btn-editar');
      btnsEditar.forEach((btn) => {
          btn.addEventListener('click', async(e) =>{
              const doc = await getForm(e.target.dataset.id);
              const form = doc.data();

              taskForm['task-name'].value = form.name;
              taskForm['price'].value = form.price;
              taskForm['description'].value = form.description;
              taskForm['category'].value = form.category;
              taskForm['ingredients'].value = form.ingredients;

              editStatus = true;
              id = doc.id;

              taskForm['button-create'].innerText = 'ACTUALIZAR'
          })
      });
     
      

  });
});

  

taskForm.addEventListener('submit', (e) => { 
  e.preventDefault();

  const name = taskForm['task-name'];
  const price = taskForm['price'];
  const description = taskForm['description'];
  const category = taskForm['category'];
  const ingredients = taskForm['ingredients'];

  if (!editStatus){
      saveForm(name.value, price.value, description.value, category.value, ingredients.value);
  } else{
      updateForm( id, {
        name: name.value, 
        price: price.value, 
        description: description.value,
        category: category.value, 
        ingredients: ingredients.value
      });

      editStatus = false;
      taskForm['button-create'].innerText = 'AGREGAR'
  }

  taskForm.reset();
  
})

confirmDeleteButton.addEventListener('click', () => {
  deleteForm(idToDelete).then(() => {
      hideModal.hide();  
  }).catch(error => {
      console.error("Error eliminando el platillo: ", error);
  });
});
