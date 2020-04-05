<template>
    <div class="background">
        <div class="container add-smoothie">
        <h2 class="has-text-centered has-text-weight-medium has-text-link is-size-3">Add New Smoothie Recipe</h2>
        <form @submit.prevent="AddSmoothie">
            <div class="field">
                <label class="label has-text-grey" for="title">Smoothie Title</label>
                <input class="input" type="text" v-model="title">
            </div>
            <div v-for="(ing, index) in ingredients" :key="index">
                <label for="ingredient" class="label has-text-grey">Ingredient:</label>
                <div class="ingredient">
                    <input class="input" type="text" v-model="ingredients[index]">
                    <i class="delete is-pulled-right" @click="deleteIng(ing)"></i>
                </div>
            </div>
            <div class="field add-ingredient">
                <label class="label has-text-grey" for="ingredient">Add an ingredient</label>
                <input class="input" type="text" @keydown.tab.prevent="addIngredient" v-model="another">
            </div>
            <div class="field is-pulled-right">
                <p class="has-text-danger" v-if="feedback">{{feedback}}</p>
                <button class="button is-danger">Add Smoothie</button>
            </div>
        </form>
    </div>
    </div>
</template>

<script>
import db from '@/Firebase/init'
import slugify from 'slugify'

export default {
    name: 'AddSmothie',
    data(){
        return {
            title: null,
            ingredients: [],
            feedback: null,
            another: null, 
            slug: null
        }
    },
    methods:{
        AddSmoothie(){
            if (this.title){
                this.feedback = null
                //create slug
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                db.collection('smoothies').add({
                    title: this.title,
                    ingredients: this.ingredients,
                    slug: this.slug
                }).then(()=>{
                    this.$router.push({ name: 'Index' })
                }).catch(err => {
                    console.log(err)
                })
            } else {
                this.feedback = 'You must enter a smoothie title'
            }
        },
        addIngredient(){
            if (this.another){
                this.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            } else {
                this.feedback = 'You must enter a value'
            }
        },
        deleteIng(ing){
            this.ingredients = this.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        }
    }
}
</script>

<style scoped>
    .background{
        background-color: white;
    }
    .add-smoothie{
        max-width: 30%;
        margin: 60px auto;
    }
    form{
        margin-top: 30px;
    }
    .ingredient{
        display: inline-flex;
        align-items: center;
        width: 100%;
        margin-bottom: 10px;
    }
    .delete{
        margin-left: 10px;
    }
</style>