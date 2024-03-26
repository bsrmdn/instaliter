import PageLayout from '@/Layouts/PageLayout'
import React from 'react'

function Reels({ auth }) {
    return (
        <PageLayout user={auth.user}>
        <div>Reels</div>
        </PageLayout>
    )
}

export default Reels