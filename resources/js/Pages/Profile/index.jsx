import PageLayout from '@/Layouts/PageLayout'
import React from 'react'

function Profile({auth}) {
    return (
        <PageLayout user={auth.user}>
        <div>Profile</div>
        </PageLayout>
    )
}

export default Profile