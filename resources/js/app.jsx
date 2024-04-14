import './bootstrap'
import '../css/app.css'

import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import PageLayout from './Layouts/PageLayout'

const appName = import.meta.env.VITE_APP_NAME || 'Instaliter'

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: name => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx', { eager: true })),
    // resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, {
    //     const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    //     let page = pages[`./Pages/${name}.jsx`]
    //     page.default.layout = page.default.layout || (page => <Layout children={page} />)
    //     return page
    // },),
    setup({ el, App, props }) {
        const root = createRoot(el)

        root.render(<App {...props} />)
    },
    progress: {
        color: '#4B5563',
    },
})
