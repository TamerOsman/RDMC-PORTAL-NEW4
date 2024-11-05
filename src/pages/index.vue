<!-- eslint-disable vue/script-indent -->
<script lang="ts" setup>

// change theme from dark to light or the opposite
import { useThemeSwitcher } from '@/themes/index'
const { changeTheme } = useThemeSwitcher()
</script>

<template>
  <div>
    <v-container>

      <v-row>
        <v-col class="d-flex flex-column justify-center align-center" style="height: 80vh; margin: auto;">
          <div>
            <h2>Welcome</h2>
            <v-btn color="teal" @click="changeTheme">Switch Theme</v-btn>
          </div>

        </v-col>
      </v-row>
    </v-container>

  </div>
</template>
