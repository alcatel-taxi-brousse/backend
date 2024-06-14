import demoController from '../controllers/DemoController.js'

const demoRoutes = [
    {
        path: '/',
        method: 'get',
        func: demoController.get_all,
    },
    {
        path: '/demo',
        method: 'get',
        func: demoController.get_all,
    },
]

export default demoRoutes
