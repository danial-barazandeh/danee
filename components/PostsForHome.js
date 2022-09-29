import useSWR from 'swr'
import ScrollContainer from 'react-indiana-drag-scroll'
import Link from 'next/link'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const PostsForHome = () => {
    const { data, error } = useSWR('/api/posts?limit=4&&page=0', fetcher)
    if (error) return <div>An error occured.</div>
    if (!data) return <div>Loading ...</div>

    console.log(data)
    return (

        <div className='bg-gradient-to-r from-primary to-secondary '>

            <h1 className='mx-8 pt-8 text-white text-2xl'>پست ها</h1>
            <ScrollContainer className="scroll-container">
                <div className='flex space-x-4 space-x-reverse py-8'>
                    {data.data.map(post => (
                        post.published === true ? (
                            <Link href={'/post/'+post.id}>
                                <div className='relative w-90 mr-6 hover:scale-105 transition-all duration-300 ease-linear flex justify-end cursor-pointer' key={post.id}>
                                    <div className='relative post-card w-80 ml-4 mb-4 select-text'>
                                        <img src={post.image.url} alt={post.image.url} className='object-fill w-80 h-[200px] z-0'></img>
                                        <div className='absolute bottom-0 w-[100%] flex justify-center backdrop-blur-sm bg-white/30'>
                                            <h3 className='text-tcolor m-4 z-1 text-center' > {post.title} </h3>
                                        </div>
                                    </div>
                                    <div className='absolute bg bottom-0 w-[60%] flex justify-end items-center group'>

                                        <div className='text-center bg-gray-900 rounded-2xl px-4 py-2 mx-2 scale-0 group-hover:scale-100 transition-all duration-300 ease-linear'>
                                            <h5 className=' text-white'>{post.author.firstName + " " + post.author.familyName}</h5>
                                        </div>

                                        <img src={post.author.image.url} alt={post.author.firstName + " " + post.author.familyName}
                                            className="author-avatar group-hover:author-avatar-hover transition-all duration-300 ease-linear"></img>

                                    </div>
                                </div>
                            </Link>) : <></>
                    ))}
                </div>
            </ScrollContainer>
        </div>

    )
}

export default PostsForHome