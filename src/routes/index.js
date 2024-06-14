import fs from 'fs'

const routes = (app) => {
    // Read the files of the current directory
    fs.readdirSync(new URL('.', import.meta.url))
        .filter((filename) => filename !== 'index.js')
        .forEach((filename) => {
            import('./' + filename).then((module) => {
                module.default.forEach((r) => {
                    app[r.method](r.path, r.func)
                })
            })
        })
}

export default routes
