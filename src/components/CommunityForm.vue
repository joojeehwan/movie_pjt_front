<template>
  <div>
   <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
      >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="#01579B" dark v-bind="attrs" v-on="on"
        class="mx-2"
        fab
        large
        >
         <v-icon dark>
          mdi-pencil
        </v-icon>
        </v-btn>
      </template>
      <v-card dark>
        <v-card-title>
          <span class="headline">Review Form</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-autocomplete
                :items="movieTitles"
                item-text="name"
                item-value="value"
                v-model="reviewItem.movie_title"
                label="영화 선택"
                required
              ></v-autocomplete>
              <v-col cols="12">
                <v-text-field
                  label="제목*"
                  v-model.trim="reviewItem.title"
                  required
                ></v-text-field>
              </v-col>
               <v-col cols="6">
                <v-rating
                  v-model="reviewItem.rank"
                  color="yellow"
                  background-color="red lighten-3"
                  hover
                  large
                ></v-rating>
              </v-col>
              <v-col cols="6">
                <span class="grey--text text--lighten-2 caption mr-2">
                  ({{ reviewItem.rank }})
                </span>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    solo
                    label="*내용"
                    v-model.trim="reviewItem.content"
                    required
                  ></v-textarea>
                </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            닫기
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="createReview"
          >
            저장
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "CommunityForm",
  data() {
    return {
      reviewItem: {
        movie_title: null,
        title: null,
        content: null,
        rank: 3
      },
        dialog: false,
    }  
  }, 
   methods: {
    setToken() {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    createReview() {
      const reviewItemSet = {
        reviewItem: this.reviewItem,
        token: this.setToken()
      }
      this.$store.dispatch('createReview', reviewItemSet)
      this.movie_title = null,
      this.title = null,
      this.content = null,
      this.rank = null,
      this.dialog = false
    }
  },
  computed: {
    ...mapGetters([
      'movieTitles'
    ])
  },
  created() {
    this.$store.dispatch('getMovies', this.setToken())
  }
}


</script>

<style>

textarea {
  padding: 10px;
  width: 1000px;
  line-height: 1.5;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px #999;
}

.input-box {
  width: 280px;
  border-bottom: solid 1px white;
  margin-right: 10px;
}

.v-expansion-panel input, textarea{
  color: white;
}
</style>