import '../CSSContents/AboutUs.css'
function AboutUs() {
    return (
        <div className="Aboutus-background">
            <div className='main' >
                <img className='AboutUs-pic'
                    src='images/AboutUs.PNG' height={350} width={500}
                    alt='About Us'
                />

                <div className='AboutUs-content'>
                    <h1>Clean Energy For Business!</h1>
                    <p>
                        We are a business that offers assistance to other businesses looking to cut their carbon
                        footprints. By supporting sustainable practises and minimising the environmental effect
                        of enterprises, we hope to improve the world. To assist our clients in lowering their carbon
                        footprints and adopting more environmentally friendly practises, we provide a variety of
                        services and solutions.
                    </p>
                    <p>
                        Every business has the potential to have a good influence, and we are committed to giving
                        them the tools and resources they need to do so. We are here to assist you in minimising your
                        environmental footprint and elevating your company to the forefront of sustainable business
                        practices, whether you are a tiny startup or a major enterprise.
                    </p>
                </div>
            </div>
        </div >
    )
}

export default AboutUs;