---
theme: ./theme
title: "Gems of Nuxt: 8 Features Every Nuxt Developer Should Know!"
website: lichter.io
handle: TheAlexLichter
favicon: https://lichter.io/img/me@2x.jpg
highlighter: shiki
lineNumbers: true
layout: intro
transition: fade
---

---
layout: intro
preload: false
transition: none
---

<h1 class="mt-12 flex justify-center items-center" v-motion :initial="{ x: -500 }" :enter="{ x: 0, transition: { duration: 500 } }">

<logos-nuxt-icon class="text-10xl"/>

</h1>


---
layout: intro
preload: false
clicks: 1
---

<h1 class="mt-12">

<logos-nuxt-icon class="text-10xl transition ease-in-out animate-ping" style="animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite !important"/>

</h1>

---
layout: intro
preload: false
transition: none
---

<h1 class="mt-12 flex justify-center items-center" v-motion :initial="{ y: 0 }" :enter="{ y: -500, transition: { duration: 1000 } }">

<logos-nuxt-icon class="text-10xl"/>

</h1>


---
layout: intro
---

# <noto-gem-stone /> Gems of <span class="text-[#41b883]">Nuxt</span> <noto-gem-stone />

## 8 Features <span class="text-[#41b883] font-semibold">Every Nuxt Developer</span> Should Know!

### vuejs.de Conf 2024

<style>

h2 {
  @apply !mt-16;
}

h3 {
  @apply !mt-32 !text-lg;
}
</style>

---
layout: two-cols
heading: About me
---

<template v-slot:default>
<div class="flex flex-col justify-center items-center h-full">
  <img class="w-75 rounded-full" src="https://lichter.io/img/me@2x.webp" />
  <h2 class="mt-4">Alexander Lichter</h2>
</div>
</template>

<template v-slot:right>
<VClicks class="space-y-2 mt-10 text-xl h-full">

* <mdi-account-check class="dark:text-green-100 text-green-700" /> **Web Engineering Consultant**
* <mdi-microphone /> Speaker &bull; Instructor &bull; Podcast Host
* <logos-nuxt-icon /> Nuxt.js Team
* <mdi-twitter class="text-blue-400" /><mdi-youtube class="text-red-500" /><mdi-twitch class="text-purple-700" /> @TheAlexLichter
* <mdi-web /> [https://lichter.io](https://lichter.io)
* <mdi-github /> [manniL](https://github.com/manniL)

</VClicks>
</template>

---

<img class="w-full h-105" src="https://ychef.files.bbci.co.uk/1280x720/p02ct5b3.jpg" alt="My fake cat (grumpy cat)">

---
layout: intro
---

# Nuxt 4

<noto-drum class="text-10" v-click />

<!--

> Nuxt 4 is out and it's packed with changes!

-->

---

# Nuxt 4

<VClicks>

* Release is still upcoming
* But you can opt-in to the breaking changes today!

</VClicks>

---

# Nuxt 4

* Release is still upcoming
* But you can opt-in to the breaking changes today!

<Code file="nuxt.config.ts">

````md magic-move
```ts
export default defineNuxtConfig({
})
```
```ts
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  }
})
```
````

</Code> 

<!--

TODO: What daniel said

* optimistic (talk description)

* CodeMods  
-->

---
layout: intro
---

<div class="text-4xl!">

`npx nuxi init -t v4-compat`

</div>

<p class="pt-4" v-click>
To start a new project with Nuxt 4 breaking changes.
</p>

---
layout: intro
---

# New folder structure

---

# New folder structure

````md magic-move
```sh
.nuxt/
assets/
components/
composables/
layouts/
middleware/
pages/
utils/
app.vue
router.options.ts
modules/
layers/
node_modules/
public/
server/
  api/
  middleware/
  plugins/
  routes/
  utils/
nuxt.config.ts
```
```sh
.nuxt/
app/
  assets/
  components/
  composables/
  layouts/
  middleware/
  pages/
  utils/
  app.vue
  router.options.ts
modules/
layers/
node_modules/
public/
server/
  api/
  middleware/
  plugins/
  routes/
  utils/
nuxt.config.ts
```
```sh
.nuxt/
app/
modules/
layers/
node_modules/
public/
server/
nuxt.config.ts
```
```sh
.nuxt/
app/
modules/
layers/
node_modules/
public/
server/
shared/
nuxt.config.ts
```
````

---

# `shared` folder

<VClicks>

* <mdi-alert class="text-orange-700" /> Work in progress
* Can be added in userland today
* Ideal for shared code that can be used in both app and server (contextless)
* Import protection so you can't import a Vue component, h3 helper or Nitro utility in the wrong place
* Auto-import for `shared/utils` and `shared/types`
* Follow [this issue](https://github.com/nuxt/nuxt/pull/28682) for implementation

</VClicks>


---
layout: intro
---

# [Nuxt Scripts](https://scripts.nuxt.com/)

<!--
Script bundling even possible
-->

---
layout: intro
---

# `getCachedData`

---

# `getCachedData`

<Code class="overflow-y-scroll max-h-100" file="MyComponent.vue (script setup)">

````md magic-move
```ts
const nuxtApp = useNuxtApp()
const { data } = await useFetch<any>('https://icanhazdadjoke.com/', {
  headers: {
    Accept: 'application/json'
  }
})
```
```ts
const nuxtApp = useNuxtApp()
const { data } = await useFetch<any>('https://icanhazdadjoke.com/', {
  headers: {
    Accept: 'application/json'
  },
  getCachedData(key) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  },
})
```
```ts
const nuxtApp = useNuxtApp()
const { data } = await useFetch<any>('https://icanhazdadjoke.com/', {
  headers: {
    Accept: 'application/json'
  },
  transform(input) {
    return {
      ...input,
      fetchedAt: new Date()
    }
  },
  getCachedData(key) {
    const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    // If data is not fetched yet
    if (!data) {
      // Fetch the first time
      return
    }

    // Is the data too old?
    const expirationDate = new Date(data.fetchedAt)
    expirationDate.setTime(expirationDate.getTime() + 10 * 1000)
    const isExpired = expirationDate.getTime() < Date.now()
    if(isExpired) {
      // Refetch the data
      return
    }

    return data
  },
})
```
````

</Code>


---
layout: intro
---

# Caching + BFF with Nitro

---

# Caching + BFF with Nitro


<VClicks>

* Use Nitro to build a **full-stack** application
* Can wrap your existing backend
* E2E type safety
* Caching on the server easily possible
* Storage and runtime-agnostic

</VClicks>


---
layout: intro
---

# OpenAPI Spec of API routes

---

# OpenAPI Spec of API routes

* Auto-generate OpenAPI spec for routes

<VClicks>

* `nitro.experimental.openAPI` -> `true`

</VClicks>

---
layout: intro
---

# Route Rules

---

# Route Rules

* Change rendering modes per route

<VClicks>

* Apply caching
* Set up redirects
* Define headers
* Proxy requests
* Custom route rules can be set up too to cater your needs

</VClicks>


---
layout: intro
---

# OG Image Generation

---

# OG Image Generation

<VClicks>

* Module by Harlan (check out [nuxtseo.com](nuxtseo.com))
* Generate OG images on the fly or pre-rendered
* All based on Vue components
* Preview in the DevTools
* Screenshots are possible too

</VClicks>

---
layout: intro
---

# Nuxt UI

---

# Nuxt UI

<VClicks>

* Component Library for Nuxt (and Vue!)
* Version 3 Rewrite with Radix-Vue
* Fully themeable
* Pro version for more built-in components
* [Let's check it out](https://ui.nuxt.com)

</VClicks>


---

# `VUEJSDE` for 20% off

<Qrcode url="https://www.lichter.link/nuxt-ui" note="To the Nuxt UI page" />

---
layout: intro
---

## Ready for more? Then <span class="inline-block bg-gradient-to-r from-blue-600 via-red-500 to-green-400 bg-clip-text text-transparent">follow</span> along!

<div class="flex mx-32 gap-8 my-auto justify-around">

<Qrcode v-click class="max-w-xl" url="https://www.youtube.com/@TheAlexLichter/" note="My YouTube Channel @TheAlexLichter" />
<Qrcode v-click class="max-w-xl" url="https://dejavue.fm/?ref=vuejsde2024" note="The DejaVue Podcast &nbsp; dejavue.fm" />

</div>

---
layout: intro
---

# Thanks a lot to my sponsors!
<img src="https://raw.githubusercontent.com/manniL/static/main/sponsors.svg" class="h-80 mx-auto" alt="My GitHub sponsors">

---
layout: two-cols
heading: Thank you for your attention!
---

<template v-slot:default>
<div class="flex flex-col justify-center items-center h-full">
<img
  class="w-75 rounded-full"
  src="https://lichter.io/img/me@2x.webp"
  />
  <h2 class="mt-4">Alexander Lichter</h2>
</div>
</template>

<template v-slot:right>

* <mdi-account-check class="dark:text-green-100 text-green-700" /> **Web Engineering Consultant**
* <mdi-microphone /> Speaker &bull; Instructor &bull; Podcast Host
* <logos-nuxt-icon /> Nuxt.js Team
* <mdi-twitter class="text-blue-400" /><mdi-youtube class="text-red-500" /><mdi-twitch class="text-purple-700" /> @TheAlexLichter
* <mdi-web /> [https://lichter.io](https://lichter.io)
* <mdi-github /> [manniL](https://github.com/manniL)

</template>

<style>
  ul {
    @apply space-y-2 mt-10 text-xl h-full;
  }
</style>

---
layout: intro
---

## Ready for more? Then <span class="inline-block bg-gradient-to-r from-blue-600 via-red-500 to-green-400 bg-clip-text text-transparent">follow</span> along!

<div class="flex mx-32 gap-8 my-auto justify-around">

<Qrcode class="max-w-xl" url="https://www.youtube.com/@TheAlexLichter/" note="My YouTube Channel @TheAlexLichter" />
<Qrcode class="max-w-xl" url="https://dejavue.fm/?ref=vuejsde2024" note="The DejaVue Podcast &nbsp; dejavue.fm" />

</div>
