import Avatar from '@/Components/Avatar'
import PageLayout from '@/Layouts/PageLayout'
import StoryLayout from '@/Layouts/StoryLayout'

export default function Home({ auth }) {

    return (
        <PageLayout user={auth.user}>
            <div className="max-w-screen-md" style={{ scrollbars: false }}>
                <StoryLayout />
            </div>
        </PageLayout >
    )
}
