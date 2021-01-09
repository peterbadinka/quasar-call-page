<template>

    <div class="q-pr-md">
      <q-select
				label="Places"
				transition-show="flip-up"
        transition-hide="flip-down"
        filled
        v-model="model2"
        multiple
        :options="options"
        counter
        max-values="2"
        hint=""
        style="width: 400px">
				
				<template v-slot:prepend>
          <q-icon name="place" />
        </template>

      </q-select>
    </div>

</template>

<script>
export default {
  data () {
    return {
      model: null,
      model2: null,

      options: [
        'Zvolen', 'Basnska Bystrica', 'Ziar nad Hronom', 'Apple', 'Oracle'
      ]
    }
  }
}
</script>