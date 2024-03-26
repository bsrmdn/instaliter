import PageLayout from '@/Layouts/PageLayout'
import React from 'react'

function Explore({ auth }) {
    return (
        <PageLayout user={auth.user}>
        <div>Explore</div>
        </PageLayout>
    )
}

export default Explore