This example uses `nuxt-env-injector` module from npm, so you can use it separately from the module code.

## How to test
1. Run `docker build -t module-test .`
2. Run `docker run -p 3000:3000 -e ENV_TYPE='injected-on-runtime' module-test`
3. Open `http://localhost:3000` and make sure ENV_TYPE has value you passed on the previous step 