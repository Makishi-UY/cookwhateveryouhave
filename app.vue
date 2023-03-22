<template>
  <div class="header">
    <h1>Qué puedo cocinar hoy.......</h1>
  </div>
  <div class="container">
    <div class="search-box">
      <div class="input-container">
        <input ref="fieldInput" class="field-input" v-model="fieldText" placeholder="Dime un ingrediente">
        <button class="clear-btn" @click="clear"><i class="material-icons">borrar</i></button>
      </div>
      <button class="add-btn" @click="add">+</button>
      <button class="search-btn" @click="search()">Buscar</button>
    </div>
    <div class="ingredients-list">
      <div class="ingredients-item" v-for="(item, index) in ingredients" :key="index">
        <span class="tag-label">{{ item }}</span>
        <button class="delete-btn" type="button" @click="remove(index)">x</button>
      </div>
    </div>
    <div v-if="!!recipe" class="recipe-note">
      {{ recipe }}
    </div>
  </div>
</template>

<style>
.header {
  display: flex;
  flex-direction: row;
  padding: 5px;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
  padding-top: 35px;
}

.search-box {
  display: flex;
  align-items: flex-flex-end;
  margin: 0 auto;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding: 16px;
  max-width: 40%;
  width: 100%;
}

.recipe-note {
  display: inline-block;
  white-space: break-spaces;
  word-wrap: break-word;
  margin: 0 auto;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f3db56;
  padding: 16px;
  max-width: 40%;
  width: 100%;
}

.ingredients-list {
  display: flex;
  align-items: flex-end;
  margin: 0 auto;
  padding: 16px;
  max-width: 40%;
  width: 100%;
}

.ingredients-item {
  display: inline-block;
  background-color: #8ec4f0;
  border-radius: 4px;
  padding: 4px 8px;
  margin-right: 8px;
  margin-bottom: 8px;
}

.delete-btn {
  color: #8ec4f0;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  margin-left: 8px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #d32f2f;
}

.input-container {
  position: relative;
  margin-right: 16px;
  flex: 1;
}

.field-input {
  border: none;
  padding: 12px;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  width: 100%;
  outline: none;
  border-radius: 5px;
  background-color: #f5f5f5;
}

.clear-btn {
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translateY(-50%);
  border: none;
  background-color: transparent;
  padding: 12px;
  cursor: pointer;
}

.material-icons {
  font-size: 24px;
  color: #ccc;
}

.add-btn {
  border: none;
  background-color: #2196f3;
  color: #fff;
  padding: 12px 24px;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.add-btn:hover {
  background-color: #0d8bf0;
}

.search-btn {
  border: none;
  background-color: #c5212f;
  color: #fff;
  margin-left: 10px;
  padding: 12px 24px;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.search-btn:hover {
  background-color: #830932;
}

.clear-btn:hover .material-icons {
  color: #f44336;
}
</style>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const fieldText = ref('');
    const fieldInput = ref(null);
    const ingredients = ref([]);
    const recipe = ref(null);

    const add = () => {
      ingredients.value.push(fieldText.value);
      fieldInput.value.focus();
      clear();
    };

    const clear = () => {
      fieldText.value = '';
    };

    const remove = (index) => {
      delete ingredients.value[index];
    };

    async function search() {
      recipe.value = null;
      try {
        const data = await $fetch('/api/generate', {
          method: 'post',
          body: { ingredients: ingredients.value },
        })
        console.log(data);
        recipe.value = data;
      } catch (e) {
        console.log('Error retrieving recipe:', e)
      }
    }

    return {
      fieldText,
      fieldInput,
      ingredients,
      recipe,
      add,
      clear,
      remove,
      search,
    };
  },
};
</script>
