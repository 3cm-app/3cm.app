<script setup>
import Icon from '@/components/Icon.vue'
import { ref } from "vue";
// https://en.wikipedia.org/wiki/Bopomofo_(Unicode_block)
// https://www.unicode.org/charts/PDF/U3100.pdf
const rfc = `
3105 ㄅ BOPOMOFO LETTER B
3106 ㄆ BOPOMOFO LETTER P
3107 ㄇ BOPOMOFO LETTER M
3108 ㄈ BOPOMOFO LETTER F
3109 ㄉ BOPOMOFO LETTER D
310A ㄊ BOPOMOFO LETTER T
310B ㄋ BOPOMOFO LETTER N
310C ㄌ BOPOMOFO LETTER L
310D ㄍ BOPOMOFO LETTER G
310E ㄎ BOPOMOFO LETTER K
310F ㄏ BOPOMOFO LETTER H
3110 ㄐ BOPOMOFO LETTER J
3111 ㄑ BOPOMOFO LETTER Q
3112 ㄒ BOPOMOFO LETTER X
3113 ㄓ BOPOMOFO LETTER ZH
3114 ㄔ BOPOMOFO LETTER CH
3115 ㄕ BOPOMOFO LETTER SH
3116 ㄖ BOPOMOFO LETTER R
3117 ㄗ BOPOMOFO LETTER Z
3118 ㄘ BOPOMOFO LETTER C
3119 ㄙ BOPOMOFO LETTER S
311A ㄚ BOPOMOFO LETTER A
311B ㄛ BOPOMOFO LETTER O
311C ㄜ BOPOMOFO LETTER E
311D ㄝ BOPOMOFO LETTER EH
311E ㄞ BOPOMOFO LETTER AI
311F ㄟ BOPOMOFO LETTER EI
3120 ㄠ BOPOMOFO LETTER AU
3121 ㄡ BOPOMOFO LETTER OU
3122 ㄢ BOPOMOFO LETTER AN
3123 ㄣ BOPOMOFO LETTER EN
3124 ㄤ BOPOMOFO LETTER ANG
3125 ㄥ BOPOMOFO LETTER ENG
3126 ㄦ BOPOMOFO LETTER ER
3127 ㄧ BOPOMOFO LETTER I
3128 ㄨ BOPOMOFO LETTER U
3129 ㄩ BOPOMOFO LETTER IU
`.split('\n').map(line => line.split(' ').filter(s => !!s || !s.match(/\s+/)))
// chatgpt: list Zhuyin characters on the keyboard, column by column, ignore the tone, without the pinyin, output csv format and trim empty
const ordered = `
ㄅ,ㄆ,ㄇ,ㄈ
ㄉ,ㄊ,ㄋ,ㄌ
ㄍ,ㄎ,ㄏ
ㄐ,ㄑ,ㄒ
ㄓ,ㄔ,ㄕ,ㄖ
ㄗ,ㄘ,ㄙ
ㄧ,ㄨ,ㄩ
ㄚ,ㄛ,ㄜ,ㄝ
ㄞ,ㄟ,ㄠ,ㄡ
ㄢ,ㄣ,ㄤ,ㄥ
ㄦ
`.split('\n').map(line => line.split(',').filter(s => !!s)).filter(row => row.length > 0)
function buildSubItems(i) {
  let list = []
  if (typeof i === 'string') {
    const itemsPerCell = 7
    list = i.split('').map(s => ({label: s}))
      .reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / itemsPerCell)
        if(!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = { list: []}
        }
        resultArray[chunkIndex].list.push(item)
        return resultArray
      }, [])
  } else {
    // ordered by keyboard
    list = ordered.map(row => {
      return {
        list: row.map(char => ({
          label: rfc.find(row => row[1] === char)[i]
        }))
      }
    })
    // ordered by rfc
    // const itemsPerCell = 4
    // list = rfc.map(row => row.map(r => ({label: row[i]})))
    //   .reduce((resultArray, item, index) => {
    //     const chunkIndex = Math.floor(index / itemsPerCell)
    //     if(!resultArray[chunkIndex]) {
    //       resultArray[chunkIndex] = { list: []}
    //     }
    //     resultArray[chunkIndex].list.push(item)
    //     return resultArray
    //   }, [])
  }
  const itemsPerColumn = 3
  return list.reduce((resultArray, item, index) => {
      const columnIndex = Math.floor(index / itemsPerColumn)
      if(!resultArray[columnIndex]) {
        resultArray[columnIndex] = [{ items: []}]
      }
      resultArray[columnIndex][0].items.push(item)
      return resultArray
    }, [])
  // const itemsPerChunk = 4
  // return list.reduce((resultArray, item, index) => {
  //     const columnIndex = index % itemsPerChunk
  //     if(!resultArray[columnIndex]) {
  //       resultArray[columnIndex] = [{ items: []}]
  //     }
  //     resultArray[columnIndex][0].items.push(item)
  //     return resultArray
  //   }, [])
}
const items = ref([
    // {
    //     label: 'example',
    //     root: true,
    //     items: [ // vertical columns
    //       [ // max limit for vertical columns is 4: one row have max 4 cells
    //         { // every vertical column can have many objects, it will add placeholder between each object
    //           items: [ // there is no placeholder between each item
    //             { label: '...' },
    //             { ... },
    //           ]
    //         },
    //         { ... },
    //       ],
    //       [ ... ],
    //     ],
    // },
    {
        label: '注音',
        root: true,
        items: buildSubItems(1),
    },
    {
        label: '拼音',
        root: true,
        items: buildSubItems(4)
    },
    {
        label: 'A-Z',
        root: true,
        items: buildSubItems('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    },
    {
        label: '#Tag',
        root: true,
    }
])
</script>
<template>
  
  <div class="card">
      <MegaMenu :model="items">
          <template #start>
            <Icon class="navbar-logo" name="logo" />
            <h3 class="navbar-name">{{ name }}</h3>
          </template>
          <template #item="{ item }">
              <a v-if="item.root" v-ripple class="flex items-center cursor-pointer px-4 py-2 overflow-hidden relative font-semibold text-lg uppercase" style="border-radius: 2rem">
                  <span :class="item.icon" />
                  <span class="ml-2">{{ item.label }}</span>
                  <i v-if="item.items" :class="['pi pi-angle-down ml-2']"></i>
              </a>
              <div v-else class="flex items-center justify-center">
                <div v-if="item.list">
                  <Button v-for="row in item.list" rounded :label="row.label" @click="search(row.label)" />
                </div>
              </div>
          </template>
          <template #end>
              <div class="flex items-center">
                  <InputText placeholder="Search" type="text" class="navbar-search" />
                  <!-- <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" /> -->
              </div>
          </template>
      </MegaMenu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '台典',
    }
  },
  methods: {
    search(s) {
      console.log(s)
    }
  }
}
</script>

<style scoped>
.navbar-logo {
  @apply w-8 fill-blue-500 mr-[10px];
}
.navbar-name {
  @apply text-lg font-bold;
}
.navbar-search {
  @apply w-auto sm:w-[25rem];
}
</style>
