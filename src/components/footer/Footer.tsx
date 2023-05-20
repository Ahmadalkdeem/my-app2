import React from 'react';
import Topnav2 from '../Navbar2/TopNav/Topnav2';
import css from './css.module.scss';
import { Link } from 'react-router-dom';
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

function Footer() {
    return (
        <>
            <MDBFooter dir='ltr' className={`text-center text-lg-start text-muted ${css.footer}`}>
                <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
                    <div className='me-5 d-none d-lg-block'>
                        <span className={css.color}>Get connected with us on social networks:</span>
                    </div>


                    <Topnav2 />

                </section>

                <section className=''>
                    <MDBContainer className='text-center mt-5'>
                        <MDBRow className='mt-3'>
                            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                                <h6 className={`text-uppercase text-center fw-bold mb-4 ${css.color}`}>
                                    MTBRANDS
                                </h6>
                                <p className={`text-center ${css.color}`}>
                                    MTBrands היא רשת חנויות בגדים מובילה שמתמקדת באיכות הבגדים ומציעה ללקוחותיה את המוצרים הטובים ביותר
                                </p>
                            </MDBCol>

                            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                                <h6 className={`text-uppercase text-center fw-bold mb-4 ${css.color}`} >Products</h6>
                                <p className={`text-center ${css.color}`}>
                                    <Link to='/about' className='text-reset'>
                                        אודות
                                    </Link>
                                </p>
                                <p className={`text-center ${css.color}`}>
                                    <Link to='/connection/login' className='text-reset'>
                                        התחברות
                                    </Link>
                                </p>
                                <p className={`text-center ${css.color}`}>
                                    <Link to='/Mycard' className='text-reset'>
                                        סל קניות
                                    </Link>
                                </p>
                                <p className={`text-center ${css.color}`}>
                                    <Link to='' className='text-reset'>
                                        בית
                                    </Link>
                                </p>
                            </MDBCol>



                            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0'>
                                <h6 className={`text-uppercase fw-bold mb-4 text-center ${css.color}`} >Contact</h6>
                                <p className={`text-center ${css.color}`}>
                                    New York, NY 10012, US
                                </p>
                                <p className={`text-center ${css.color}`}>
                                    info@example.com
                                </p>
                                <p className={`text-center ${css.color}`}>
                                    <a href="tel:054-610-7875" className='text-reset'>
                                        054-610-7875
                                    </a>
                                </p>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>

                <div className={`text-center p-2 ${css.color} ${css.size}`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                    © 2021 Copyright:
                    <a className={`text-reset fw-bold ${css.color} ${css.size}`} href='https://mdbootstrap.com/'>
                        MDBootstrap.com
                    </a>
                </div>
            </MDBFooter>

        </>
    );
}

export default Footer;
