import Avatar from '@/Components/Avatar'
import PageLayout from '@/Layouts/PageLayout'
import StoryLayout from '@/Layouts/StoryLayout'
import FeedLayout from '@/Layouts/FeedLayout'

export default function Home({ auth }) {

    return (
        <PageLayout user={auth.user}>
            <div className="flex">
                <div className="max-w-screen-md">
                    <StoryLayout />
                    <FeedLayout />
                </div>

            </div>
        </PageLayout >
    )
}
