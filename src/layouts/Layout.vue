<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
				
        <q-toolbar-title>
          {{ activeLabel }}
        </q-toolbar-title>

        <div>v1.0.4</div>
      </q-toolbar>
    </q-header>

		<q-footer>
			<q-tabs>
        <q-route-tab 	
					v-for="nav in navs"	
					:key="nav.to"			
					:to="nav.to"
					:icon="nav.icon" 
					:label="nav.label" 
					style="display:none"
					@click="activeLabel = nav.label" />
      </q-tabs>
		</q-footer>

    <q-drawer
			:width="250"	
      v-model="leftDrawerOpen"
      hide-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>

				<q-item-label header>Navigation</q-item-label>

				<q-item 
					v-for="nav in navs" 
					:key="nav.to"
					:to="nav.to"
					exact
					@click="activeLabel = nav.label"
					clickable>
					<q-item-section avatar>
						<q-icon :name="nav.icon" />
					</q-item-section>
					<q-item-section>
						<q-item-label>{{nav.label}}</q-item-label>
					</q-item-section>
				</q-item>
        
      </q-list>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
			leftDrawerOpen: true,
			activeLabel: 'Call-Page',
			navs: [				
				{ label: 'Call-Page', icon: 'call', to: '/', },
				{ label: 'Call-Page (VIP)', icon: 'phone_locked', to: '/call-page-vip', },
				// { label: 'Databáza (Lite)', icon: 'folder_shared', to: '/databaza', },
				// { label: 'Contact', icon: 'contact_support', to: '/contact', },	
				// { label: 'Todo App', icon: 'list', to: '/todo', },
				// { label: 'Settings', icon: 'settings', to: '/settings', },				
				// { label: 'Test', icon: 'extension', to: '/test', },
			]			
    }
  }
}
</script>

<style lang="scss">
	// @media screen and (min-width: 768px) {
	// 	.q-footer {
	// 		display: none;
	// 	}
	// }
</style>