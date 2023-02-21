import './Channel.css'
function HeaderChannel({ channel }) {
    console.log("LAS PROPS-----------------", channel)
    return (
        <section className='info-channel'>
            <div className='details'>
                <div className='header-img-section'>
                    <img src={channel.snippet.thumbnails.default.url} alt={channel.snippet.title} />
                </div>
                <div className='header-channel-section'>
                    <h2>{channel.snippet.title}</h2>
                    <h3>{channel.snippet.customUrl}</h3>
                    {/* <ModalInfo description={channel.snippet.description}></ModalInfo> */}

                </div>
            </div>
            <div className='header-description-section'>
                <p>{channel.snippet.description}</p>
            </div>
        </section>
    )
}

export default HeaderChannel