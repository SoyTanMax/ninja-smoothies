<template>
  <div class="index columns is-multiline">
    <div class="card column is-one-third" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content">
        <i class="delete is-pulled-right has-text-grey-light" @click="deleteSmoothie(smoothie.id)"></i>
        <p class="title has-text-info has-text-centered">{{ smoothie.title }}</p>
        <ul class="ingredients columns">
          <li v-for="(ingredient, index) in smoothie.ingredients" :key="index">
            <p class="tag is-size-5 is-capitalized">{{ ingredient }}</p>
          </li>
        </ul>
        <span class="is-pulled-right">
          <router-link :to="{ name: 'EditSmoothie', params: {smoothie_slug: smoothie.slug}}">
            <i class="fas fa-edit has-text-danger"></i>
          </router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/Firebase/init'
export default {
  name: 'Index',
  data () {
    return {
      smoothies:[]
    }
  },
  methods:{
    deleteSmoothie(id){
    //  delete doc from firestore
    db.collection('smoothies').doc(id).delete()
      .then(()=>{
        this.smoothies = this.smoothies.filter(smoothie => {
          return smoothie.id != id
        })
      })
    }
  },
  created(){
    //fetch data from firestore
    db.collection('smoothies').get()
    .then(snapshot => {
      snapshot.forEach( doc =>{
        let smoothie = doc.data()
        smoothie.id = doc.id
        this.smoothies.push(smoothie)
      })
    })
}
}
</script>

<style scoped>
.index{
  margin: 20px;
  background-color: white;
}
.card .title{
  padding-top: 10px;
  padding-bottom: 10px;
}
.card .card-content{
  padding-top: 10px;
}
.index .ingredients li{
  display: inline-block;
  margin: 0 auto;
}
</style>
