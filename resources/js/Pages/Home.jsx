import PageLayout from '@/Layouts/PageLayout'

export default function Home({ auth }) {

    return (
        <PageLayout user={auth.user}>
            <div className=''>testing</div>
        </PageLayout>
    )
}
