import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './footer.css';
import {
	TiSocialFacebook,
	TiSocialInstagram,
	TiMail,
	TiPhoneOutline,
	TiSocialTwitter,
	TiSocialLinkedin,
} from 'react-icons/ti';
import { getDataMethod } from '../../Services/publicApiService';
import logoLocal from '../../assets/LOGO-SOMOS MAS.png';

const Footer = () => {
	const [data, setData] = useState([]);

	const getData = async () => {
		const info = await getDataMethod('organization');

		setData(info.data.data);
	};
	useEffect(() => {
		getData();
	}, []);

	const links = [
		{ text: 'INICIO', link: '/' },
		{ text: 'NOSOTROS', link: '/nosotros' },
		{ text: 'CONTACTO', link: '/contact' },
	];
	const linksCampaigns = [
		{ text: 'Campaña en Escuela', link: '/school-campaign' },
		{ text: 'Campaña de Juguetes', link: '/toys-campaign' },
	];

	const socialMedia = [
		{
			img: <TiMail />,
			text: 'E-mail',
			link: 'mailto:somosfundacionmas@gmail.com',
		},
		{
			img: <TiSocialInstagram />,
			text: 'Instagram',
			link: data.instagram_url || 'https://www.instagram.com/SomosMás/',
		},
		{
			img: <TiSocialFacebook />,
			text: 'Facebook',
			link: data.facebook_url || 'https://www.facebook.com/Somos_Más',
		},
		{
			img: <TiSocialTwitter />,
			text: 'Twitter',
			link: data.twitter_url || 'https://www.twitter.com/Somos_Más',
		},
		{
			img: <TiSocialLinkedin />,
			text: 'LinkedIn',
			link: data.linkedin_url || 'https://www.linkedin.com/Somos_Más',
		},
		{
			img: <TiPhoneOutline />,
			text: 'Telefono',
			link: `tel:${data.phone}` || 'tel:1160112988',
		},
	];

	return (
		<footer className='footer-public-cam'>
			<nav className='nav-footer-cam'>
				<Link className='nav-footer-logo-cam' to='/'>
					<img
						src={logoLocal || data.logo}
						alt={data.name}
						title={data.name}
					></img>
				</Link>

				<ul className='nav-footer-links-cam'>
					{links.map((li, index) => {
						return (
							<li key={`${li.text}${index}footer`} className='footer-link-cam'>
								<NavLink to={li.link}>{li.text}</NavLink>
							</li>
						);
					})}
				</ul>
				<ul id='links__campaigns-cam' className=' nav-footer-links-cam'>
					{linksCampaigns.map((li, index) => {
						return (
							<li key={`${li.text}${index}footer`} className='footer-link-cam'>
								<NavLink
									className={({ isActive }) =>
										isActive ? 'link__active-cam' : ''
									}
									to={li.link}
								>
									{li.text}
								</NavLink>
							</li>
						);
					})}
				</ul>

				<ul className='nav-footer-socialMedia-cam'>
					{socialMedia.map((li, index) => {
						return (
							<li key={`${li.text}${index}`} className='footer-socialMedia-cam'>
								<a
									href={li.link}
									title={li.text}
									target='_blank'
									rel='noreferrer'
								>
									{li.img}
									<p className='socialMedia-text-cam'>{li.text}</p>
								</a>
							</li>
						);
					})}
				</ul>
			</nav>
			<span className='footer-address-cam'>{data.address}</span>
		</footer>
	);
};

export default Footer;
