const replace = require('replace-in-file')

module.exports = async function main(moduleOptions) { 
  const { buildDir } = this.nuxt.options
  // const options = Object.assign({}, this.options.injector, moduleOptions)
  // const injectableVars = options.env
  
  const isRuntime = process.env.BUILD_SAGE === 'runtime'
  const isBuildtime = process.env.BUILD_SAGE === 'buildtime'
  if (!isBuildtime && !isRuntime) console.info('nuxt-env-injector is not inside of a container, skipping...')

  if (isBuildtime) this.nuxt.hook('build:before', async () => {
    const vars = this.nuxt.options.env

    Object.keys(vars).forEach(key => {
      this.nuxt.options.env[key] = `%%INJECTED_${key}%%`
    })
  })

  if (isRuntime) try {
    const files = [
      '/*.js', '/**/*.js', '/**/**/*.js', '/**/**/**/*.js' 
    ].map(file => buildDir + file)

    const keys = Object.keys(this.nuxt.options.env)
    const values = Object.values(this.nuxt.options.env)
    const markers = keys.map(key => `%%INJECTED_${key}%%`)

    const emptyVars = keys.filter((key, i) => !values[i])
    if (emptyVars.length) throw new Error(`fill your env. variables: ${emptyVars.join(', ')}`)

    const results = await replace({ files, from: markers, to: values })

    console.log('Variables injected to:', results.filter(r => r.hasChanged).map(r => r.file));
  }
  catch (error) {
    console.error('Env. injector:', error);
  }
}