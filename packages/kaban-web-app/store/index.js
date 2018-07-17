import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    boards: {
      ama: {
        lanes: [
          {
            name: 'To-Do',
            slug: 'todo',
            mapsTo: 'todo',
          },
          {
            name: 'Doing',
            slug: 'inProgress',
            mapsTo: [
              'inProgress',
              'doneProgress',
            ],
            queues: [
              {
                name: 'Doing',
                slug: 'inProgress',
                mapsTo: 'inProgress'
              },
              {
                name: 'Done Doing',
                slug: 'doneProgress',
                mapsTo: 'doneProgress'
              }
            ]
          },
          {
            name: 'Done',
            slug: 'done',
            mapsTo: 'done',
          }
        ]
      }
    },
    backlogItems: {
      'create-blink-screen': [
          {
            text: 'As a User I Want to ...',
            status: 'todo',
            id: 1
          },
          {
            text: 'As an Admin I Want to ...',
            status: 'done',
            id: 2
          },
          {
            text: 'As an Developer I Want to ...',
            status: 'doneProgress',
            id: 3
          }
      ]
    },
    backlogs: [
      {
        name: 'Create Blink Screen',
        slug: 'create-blink-screen',
      }
    ],
    nextId: 4
  },
  mutations: {
    addItem(state, item) {
      state.items.push(Object.assign(item, { 
        id: state.nextId,
        status: 'todo',
      }));

      state.nextId += 1;
    },
    updateItems(state, { items, mapsTo }) {
      items.forEach(i => i.status = mapsTo);
    }
  },
  getters: {
    laneItems: (state) => (statuses) => {
      statuses = Array.isArray(statuses) ? statuses : [statuses];
      return state.backlogItems['create-blink-screen'].filter(item => statuses.indexOf(item.status) !== -1);
    },
    backlogs(state) {
      return state.backlogs;
    }
  }
})

export default store