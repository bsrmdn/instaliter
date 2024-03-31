import PageLayout from '@/Layouts/PageLayout'
import StoryLayout from '@/Layouts/StoryLayout'
import FeedLayout from '@/Layouts/FeedLayout'

export default function Home({ auth, posts, users }) {

    return (
        <PageLayout>
            <div className="flex">
                <div className="w-8/12">
                    <StoryLayout users={users} />
                    <FeedLayout posts={posts} />
                </div>
                <div className="w-4/12"></div>
            </div>
        </PageLayout>
    )
}
