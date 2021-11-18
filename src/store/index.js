import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'

const SERVER_URL = 'http://127.0.0.1:8000/'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
   
    // movies
    movies: [],
    genre_names: [],
    // community
    reviews: [],
    reviewDetail: null,
    movieTitles: [],
    comments: [],
    comment: null,
   
  },
  getters: {
    movies(state) {
      return state.movies
    },
    movieTitles(state) {
      return state.movieTitles
    },
    reviews(state) {
      return state.reviews
    },
    comments(state) {
      return state.comments
    },
    randomMovies(state) {
      return state.randomMovies
    },
    genres(state) {
      return state.genres
    },
    genre_names(state) {
      return state.genre_names
    },
    recommendMovies(state) {
      return state.recommendMovies
    },
    bestGenre(state) {
      return state.bestGenre
    }
  },
  mutations: {
   
    // MOVIES MUTATIONS
    GET_MOVIES(state, res) {
      state.movies.push(res)
    },
    GET_MOVIE_TITLES(state, res) {
      const tmp_list = []
      for (var value of res) {
        const tmp = {
          name: value.title, value: value.title
        }
        tmp_list.push(tmp)
      }
      state.movieTitles = tmp_list
    },
    GET_GENRES(state, res) {
      state.genre_names = res
    },
    // COMMUNITY MUTATIONS
    GET_REVIEWS(state, res) {
      state.reviews.push(res)
    },
    CREATE_REVIEW(state, res) {
      state.reviews = res
    },
    UPDATE_REVIEW(state, reviewItem) {
      state.reviews = state.reviews.map((review) => {
        if (review === reviewItem) {
          return { ...review,
            title: reviewItem.title,
            content: reviewItem.content,
            rank: reviewItem.rank,
          }
        }
        return review
      })
    },
    DELETE_REVIEW(state, reviewItem) {
      const index = state.reviews.indexOf(reviewItem)
      state.reviews.splice(index, 1)
    },
    CREATE_COMMENT(state, res) {
      state.comments.push(res)
    },
    READ_COMMENT(state, res) {
      state.comment = res
    },
    UPDATE_COMMENT(state, commentItem) {
      state.comments = state.comments.map((comment) => {
        if (comment === commentItem) {
          return { ...comment, content: commentItem.content }
        }
        return comment
      })
    },
    DELETE_COMMENT(state, commentItem) {
      const index = state.comments.indexOf(commentItem)
      state.comments.splice(index, 1)
    },
    GET_COMMENTS(state, res) {
      state.comments = res
    },
   
  },
  actions: {
   
    // MOVIES ACTIONS
    getMovies({commit}, token) {
      axios({
        method: 'GET',
        url: `${SERVER_URL}movies/`,
        headers: token,
      })
      .then(res => {
        commit('GET_MOVIES', res.data)
        commit('GET_MOVIE_TITLES', res.data)
      })
      .catch(err => console.log(err))
    },
    getGenres({commit}, token) {
      axios({
        method: 'GET',
        url: `${SERVER_URL}movies/genres/`,
        headers: token
      })
      .then((res) => {
        commit('GET_GENRES', res.data)
      })
      .catch(err => console.log(err))
    },
    // COMMUNITY - REVIEW ACTIONS
    getReviews({commit},token) {
      axios({
        method: 'GET',
        url: `${SERVER_URL}community/`,
        headers: token,
      })
      .then(res => {
        commit('GET_REVIEWS', res.data)
      })
      .catch(err => console.log(err))
    },
    createReview({commit}, objs) {
      axios({
        method: 'POST',
        url: `${SERVER_URL}community/reviews/`,
        data: objs.reviewItem,
        headers: objs.token
      })
      .then(() => {
        commit('CREATE_REVIEW')
        router.push({name: 'Community'})
        router.go()
      })
      .catch(err => console.log(err))
    },
    updateReview({commit}, objs) {
      axios({
        method: 'PUT',
        url: `${SERVER_URL}community/reviews/${objs.review_id}/`,
        data: objs.reviewItem,
        headers: objs.token
      })
      .then(() => {
        commit('UPDATE_REVIEW')
      })
      .catch(err => console.log(err))
    },
    deleteReview({commit}, objs) {
      axios({
        method: 'DELETE',
        url: `${SERVER_URL}community/reviews/${objs.review_id}/`,
        headers: objs.token
      })
      .then(() => {
        commit('DELETE_REVIEW')
        router.go()
      })
      .catch(err => console.log(err))
    },
    
    
  },
  modules: {

  },
})