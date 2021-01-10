<template>

    <div class="q-gutter-md row items-start">
	      <q-input 
					filled bottom-slots v-model="text" 
					label="Search (poznamka/produkt)"
					:dense="dense"
					style="width: 400px">

					<template v-slot:prepend>
						<q-icon name="search" />
					</template>
					<template v-slot:append>
						<q-icon name="close" @click="text = ''" class="cursor-pointer" />
					</template>
      </q-input>
		</div>

</template>

<script>
export default {
  data () {
    return {
      text: '',
      ph: '',

      dense: false
    }
  }
}
</script>