import '../CSSContents/ContactUs.css'

function ContactUs() {

    return (
        <div className="ContactUs-background">
            <div className='main' >
                <img className='ContactUs-pic'
                    src='images/ContactUs.png' height={360} width={500}
                    alt='ContactUs'
                />

                <div className='ContactUs-content'>
                    <h1>Clean Energy For Business!</h1>
                    <p>
                        At Clean Energy For Business (CEFB), we are committed to helping businesses
                        become more environmentally friendly. Our aim is to not only benefit the environment but
                        also to help businesses save money on their utilities, while attracting more customers
                        who value sustainability. At CEFB, we take pride in our mission and are here to assist
                        you on your journey towards a cleaner future. Our dedicated team is always ready to help
                        you overcome any challenges or roadblocks you may encounter.

                    </p>
                    <p>
                        Please feel free to contact us via <a
                            className='a-tag' href="mailto:CEFB-Grop26@gmail.co.uk">
                            Email
                        </a> if you have any questions, concerns, or just want to chat about your
                        sustainability goals. We are here to support you every step of the way!



                    </p>
                </div>
            </div>
        </div >
    )
}

export default ContactUs;


/*
<div>
         <a href="mailto:cleanenergyforbusiness@service.com">
             <h2 className='footer-links-title' >Contact Us</h2>
         </a>
     </div>
 */