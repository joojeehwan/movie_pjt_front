import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'
import swal from 'sweetalert'


const SERVER_URL = 'http://127.0.0.1:8000/'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //accounts
    isLogin:false,
    //userName
    user_names: [],
    user_name:null,
    //weeklyBoxOfficeMovieList: [],
    weeklyBoxOfficeMovieList: [],
    // movies
    movies: [],
    // community
    reviews: [],
    reviewDetail: null,
    movieTitles: [],
    comments: [],
    comment: null,

    user_list: [],
    isAdmin:false,  // admin 확인
   
  },
  getters: {
    user_list(state) {
      return state.user_list
    },

    weeklyBoxOfficeMovieList(state) {
      return state.weeklyBoxOfficeMovieList
    },
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
  },
  mutations: {
    //accounts

    LOGIN(state) {
      state.isLogin = true

      // admin 확인
      state.isAdmin = localStorage.getItem('isAdmin')            
    }, 
    LOGOUT(state) {
      state.isLogin = false
      state.isAdmin = false // amdin 확인
    },
    //GET_WEEKLY_BOX_OFFICE_MOVIE_LIST

    GET_WEEKLY_BOX_OFFICE_MOVIE_LIST(state, res) {
      state.weeklyBoxOfficeMovieList.push(res)
    },
   
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
      state.reviews = res
    },
    CREATE_REVIEW(state, res) {
      state.reviews.push(res)
    },
    UPDATE_REVIEW(state, reviewItem) {
      state.reviews = state.reviews.map((review) => {
        if (review === reviewItem) {
          return { ...review,
            title: reviewItem.title,
            content: reviewItem.content,
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
    USER_NAME(state, res) {
      state.user_names = res  
      // state.user_name = res
      // if ( res === 'admin')     {
      //   state.isAdmin = true
      // }
    },

    GET_USER_LIST(state, res) {
      state.user_list = res
    }
   
  },
  actions: {
    //user_Name
    userName({commit}, useranme) {
      commit("USER_NAME",useranme )
    },
    // login_logout
    login({commit}, credentials) {
      commit("USER_NAME",credentials.username)
      axios({
        method: "POST", 
        url: `${SERVER_URL}accounts/api-token-auth/`,
        data: credentials
      })
      .then(res => {
        // console.log(res.data)
        localStorage.setItem('jwt', res.data.token)
        // admin 확인
        if (credentials.username === 'admin') {
          localStorage.setItem('isAdmin', true)
        }
        commit('LOGIN')
        router.push({ name: 'Home' })
      })
      .catch(err => {
        console.log(err)
      })
    },
    checkLogin({commit}, token) {
      if (token) {
        commit('LOGIN')
      }
      
      // user 목록
      axios({
        method: 'GET',
        url: `${SERVER_URL}accounts/getuserlist/`,
        headers: token,
      })
      .then(res => {
        console.log(res)
        commit('GET_USER_LIST', res.data)        
      })
      .catch(err => console.log(err))
    
    },
    logout({commit}) {
      localStorage.removeItem('jwt')
      localStorage.removeItem('isAdmin')  // admin 확인
      commit('LOGOUT')
       router.push({ name: 'Login' })
    },

    //getWeeklyBoxOfficeMovieList
    getWeeklyBoxOfficeMovieList({commit}, token) {
      axios({
        method: 'GET',
        url: SERVER_URL+'movies/searchWeeklyBoxOfficeMovies',
        headers: token
        // params
      })
        .then( res => {
          // console.log(res.data)
          commit("GET_WEEKLY_BOX_OFFICE_MOVIE_LIST", res.data) 
        
        })
        .catch( err => {
          console.log(err)
        })

    },
   
    // MOVIES ACTIONS
    getMovies({commit}, token) {
      axios({
        method: 'GET',
        url: `${SERVER_URL}movies/searchAllMovies/`,
        headers: token,
      })
      .then(res => {
       // console.log(res)
        commit('GET_MOVIES', res.data)
        commit('GET_MOVIE_TITLES', res.data)
      })
      .catch(err => console.log(err))
    },

    // COMMUNITY - REVIEW ACTIONS
    getReviews({commit}, token) {
      axios({
        method: 'GET',
        url: `${SERVER_URL}community/`,
        headers: token,
      })
      .then(res => {
        //console.log(res)
        commit('GET_REVIEWS', res.data)
      })
      .catch(err => console.log(err))
    },
    createReview({commit}, objs) {
      axios({
        method: 'POST',
        url: `${SERVER_URL}community/`,
        data: objs.reviewItem,
        headers: objs.token
      })
      .then((res) => {
        console.log(res)
        commit('CREATE_REVIEW')
        router.push({name: 'Index'})
        router.go()
      })
      .catch(err => console.log(err))
    },
    updateReview({commit}, objs) {
      axios({
        method: 'PUT',
        url: `${SERVER_URL}community/${objs.review_id}/`,
        data: objs.reviewItem,
        headers: objs.token
      })
      .then(() => {
        commit('UPDATE_REVIEW')
      })
      .catch(err => {
        console.log(err)
        swal("타인이 작성한 리뷰는 수정할 수 없습니다.")
      })
    },
    deleteReview({commit}, objs) {
      axios({
        method: 'DELETE',
        url: `${SERVER_URL}community/${objs.review_id}/`,
        headers: objs.token
      })
      .then(() => {
        commit('DELETE_REVIEW')
        router.go()
      })
      .catch(err=>{
        console.log(err)
        swal("타인이 작성한 리뷰은 지울 수 없습니다.")
      })
    },
    //Commuity - COMMENT ACTTONS
    getComments({commit}, objs) {
      axios({
        method: "GET", 
        url:`${SERVER_URL}community/${objs.review_id}/comments/`,
        headers: objs.token
      })
      .then(res=> {
        commit("GET_COMMENTS", res.data)
      })
      .catch(err=> {
        console.log(err)
      })
    }, 
    createComment({commit}, objs) {
      axios({
        method: 'POST',
        url: `${SERVER_URL}community/${objs.review_id}/comments/`,
        data: objs.commentItem,
        headers: objs.token
      })
      .then((res) => {
        commit('CREATE_COMMENT', res.data)
       
        
      })
      .catch(err => console.log(err))
    },
    updateComment({commit}, objs) {
      axios({
        method: 'PUT',
        url: `${SERVER_URL}community/${objs.comment_id}/comments/detail/`,
        data: objs.commentItem,
        headers: objs.token
      })
      .then((res) => {
        commit('UPDATE_COMMENT', res.data)
      })
      .catch(err => 
        {console.log(err)
        swal("타인이 작성한 댓글은 수정 할 수 없습니다.")
      })
    },
    deleteComment({commit}, objs) {
      axios({
        method: 'DELETE',
        url: `${SERVER_URL}community/${objs.comment_id}/comments/detail/`,
        headers: objs.token
      })
      .then((res) => {
        console.log(res)
        
        commit('DELETE_COMMENT', res.data)
      })
      .catch(err => {
        console.log(err.response)
        swal("타인이 작성한 댓글은 지울 수 없습니다.")
      })
    },

  },
 modules: {

  }, 
})