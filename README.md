### What problem does it solve
It only helps to have better Docker images for better CI/CD. 

Let's imagine you want to build a Docker image and deploy it to two different environments: qa-env and staging-env.
You don't want to build Nuxt twice for that (because of security, integrity, CI-performance, etc.), so Docker image should already have buildDir (.nuxt) inside. 
The thing is, almost all environmental variables you pass to such image on `docker run`, won't be applied, since they already hardcoded by Webpack into nuxt bundle.
You only need to install this module to solve this issue.

### Why other solutions don't work
If you make a [research](https://github.com/nuxt/nuxt.js/issues/5100), there are basically three solutions:
1. Use Vuex to store the variables. Or use [nuxt-env](https://github.com/samtgarson/nuxt-env) module that stores variables in nuxt context `this.$env`. In most cases, you need your variables outside of nuxt context, for example baseURL for http-client, so it doesn't work well.
2. Use [regex-powered script](https://github.com/nuxt/nuxt.js/issues/5100#issuecomment-476032241) that replaces variables on every nuxt-server start. It works, but you'll have to store your variables keys both in script-file and docker-file to make it work. Not perfect.
3. Use `window.__CONFIG__ = {}` object hardcoded into page template. This only works for SPA-projects.

### How does it work
Basically it is the second solution I mentioned above (marker-replacer-script), but this time you don't need to think about implementation, it just works*.
1. Before Nuxt started building its bundle, the module iterates every variable you mentioned in `env` option of `nuxt.config.js` and replaces it with a special marker: `%%INJECTED_VARKEY%%`
2. Nuxt builds a bundle that has markers instead of actual variables values, for example `baseURL: '%%INJECTED_VARKEY%%'`. At this point the bundle will be saved inside of Docker image.
3. You are trying to start the Docker image I mentioned above. Before Nuxt starts, the module iterates though every .js file inside of `.nuxt` dir and replaces markers with actual variables you passed to your Docker image.
4. Voilà. You have your Nuxt-app running only with variables that you used for `docker run` command (or in your CD config).

### How to use
WIP. Check `/example/README.md` for now.

### Caveats ⚠️ ⚠️ ⚠️ 
Don't use with `NODE_ENV` or flag-variables. Doesn't work with variables that are used in head section of nuxt.config. You need all your env vars to be passed to `docker run`, values assigned on build-time will be ereased. Module logic is not ideal, it is ⚠️ Work In Progress ⚠️.
