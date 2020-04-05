<template>
    <div v-if="smoothie" class="edit-smoothie container">
        <h2 class="has-text-centered has-text-weight-medium has-text-link is-size-3 is-capitalized">Edit {{ smoothie.title }} Smoothie</h2>
        <form @submit.prevent="EditSmoothie">
            <div class="field">
                <label class="label has-text-grey" for="title">Smoothie Title</label>
                <input class="input" type="text" v-model="smoothie.title">
            </div>
            <div v-for="(ing, index) in smoothie.ingredients" :key="index">
                <label for="ingredient" class="label has-text-grey">Ingredient:</label>
                <div class="ingredient">
                    <input class="input" type="text" v-model="smoothie.ingredients[index]">
                    <i class="delete is-pulled-right" @click="deleteIng(ing)"></i>
                </div>
            </div>
            <div class="field add-ingredient">
                <label class="label has-text-grey" for="ingredient">Add an ingredient</label>
                <input class="input" type="text" @keydown.tab.prevent="addIngredient" v-model="another">
            </div>
            <div class="field is-pulled-right">
                <p class="has-text-danger" v-if="feedback">{{feedback}}</p>
                <button class="button is-danger">Update Smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/Firebase/init'
import slugify from 'slugify'
export default {
    name: 'EditSmoothie',
    data(){
        return{
            smoothie: null,
            another: null,
            feedback: null,
        }
    },
    created(){
        let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.smoothie = doc.data()
                this.smoothie.id = doc.id
            })
        })
    }, 
    methods:{
        EditSmoothie(){
            if (this.smoothie.title){
                this.feedback = null
                //create slug
                this.smoothie.slug = slugify(this.smoothie.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                db.collection('smoothies').doc(this.smoothie.id).update({
                    title: this.smoothie.title,
                    ingredients: this.smoothie.ingredients,
                    slug: this.smoothie.slug
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
                this.smoothie.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            } else {
                this.feedback = 'You must enter a value'
            }
        },
        deleteIng(ing){
            this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        }
    }
}
</script>

<style scoped>

    .edit-smoothie{
        max-width: 30%;
        margin: 60px auto;
        background-color: white;
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