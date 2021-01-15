<template>
	<div class="">
    <div class="q-mt-xs">
      <q-select
          outlined
					use-chips
          v-model="model"
          :options="options"
          label="Produkty"
          multiple
          emit-value
          map-options
					style="width: 100%"
					:value="produkty"
					@input="$emit('updateProducts', model)"
      >
        <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
          <q-item
            v-bind="itemProps"
            v-on="itemEvents"
          >
            <q-item-section>
              <q-item-label v-html="opt.label" ></q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle :value="selected" @input="toggleOption(opt)" />
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </div>
</template>

<script>
export default {
	props: ['produkty'],
  data () {
    return {
      model: [],
      options: [
				{ label: 'Dôchodok - 2. pilier', value: 'Dôchodok - 2. pilier' },{ label: 'Dôchodok - 3. pilier', value: 'Dôchodok - 3. pilier' },{ label: 'Investícia - Podielové fondy', value: 'Investícia - Podielové fondy' },{ label: 'Investícia - Sporiaci účet', value: 'Investícia - Sporiaci účet' },{ label: 'Poistenie - Bytu', value: 'Poistenie - Bytu' },{ label: 'Poistenie - Domácnosti', value: 'Poistenie - Domácnosti' },{ label: 'Poistenie - Domu', value: 'Poistenie - Domu' },{ label: 'Poistenie - Havarijné (HP)', value: 'Poistenie - Havarijné (HP)' },{ label: 'Poistenie - Investičné životné (IŽP)', value: 'Poistenie - Investičné životné (IŽP)' },{ label: 'Poistenie - Kapitalové (KŽP)', value: 'Poistenie - Kapitalové (KŽP)' },{ label: 'Poistenie - Majetku', value: 'Poistenie - Majetku' },{ label: 'Poistenie - Rizikové', value: 'Poistenie - Rizikové' },{ label: 'Poistenie - Úrazové', value: 'Poistenie - Úrazové' },{ label: 'Poistenie - Zákonné (PZP)', value: 'Poistenie - Zákonné (PZP)' },{ label: 'Poistenie - Životné (ŽP)', value: 'Poistenie - Životné (ŽP)' },{ label: 'Úver - Hypotekárny', value: 'Úver - Hypotekárny' },{ label: 'Úver - Leasing', value: 'Úver - Leasing' },{ label: 'Úver - Nebankové pôžičky', value: 'Úver - Nebankové pôžičky' },{ label: 'Úver - Spotrebný', value: 'Úver - Spotrebný' },
      ]
    }
	},
	methods:{

	}
}
</script>

<style>

</style>