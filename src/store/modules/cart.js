import axios from 'axios'
const state = {
  address: {
    name: '年糕',
    telephone: '12333333333',
    location: '长沙理工'
  },
  items: [],
  added: [{
    id: 3,
    num: 2
  }]
}

const getters = {
  goodList: state => state.items,
  address: state => state.address,
  cartList: state => {
    return state.added.map(({id, num}) => {
      let item = state.items.find(n => n.id === id)
      return {
        ...item,
        num,
        all: 2
      }
    })
  },
  totalPrice: (state, getters) => {
    let total = 0
    getters.cartList.forEach(n => {
      total += n.price * n.num
    })
    return total
  },
  totalNum: (state, getters) => {
    let total = 0
    getters.cartList.forEach(n => {
      total += n.num
    })
    return total
  }
}

const actions = {
  addToCart ({ commit }, item) {
    commit('add', {
      id: item.id
    })
  },
  clearAllCart ({ commit }) {
    commit('clearAll')
  },
  getAllItems ({ commit }) {
    commit('getItems')
  },
  updateAddress ({ commit }, address) {
    commit('updateAdd', {
      name: address.name,
      telephone: address.telephone,
      location: address.location
    })
  }
}

const mutations = {
  add (state, { id }) {
    let record = state.added.find(n => n.id === id)
    if (!record) {
      state.added.push({
        id,
        num: 1
      })
    } else {
      record.num++
    }
    console.info(record, state.added)
  },
  clearAll (state) {
    state.added = []
  },
  getItems (state) {
    axios.get('http://desktop-m2r784e:8080/MusicShop/showPageItem.action?start=0&size=8&type=-1')
      .then(function (response) {
        state.items = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  updateAdd (state, {name, telephone, location}) {
    state.address.name = name
    state.address.telephone = telephone
    state.address.location = location
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
