const {
  ENV_TYPE = 'injected-at-build-time'
} = process.env

console.log('running with ENV_TYPE=' + ENV_TYPE)

export default {
  env: {
    ENV_TYPE
  },
  modules: [
    'nuxt-env-injector'
  ]
}