import Avatar from '@/Components/Avatar';
import PageLayout from '@/Layouts/PageLayout'
import React from 'react'

function Profile({ auth }) {
    console.log('auth: ', auth);
    return (
        <PageLayout>
            <div className="flex">
                <Avatar avatar={auth.user.avatar} avatarOnly />
            </div>
        </PageLayout>
    )
}

export default Profile