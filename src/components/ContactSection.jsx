"use client";
import React from "react";
import { useLang } from '@/context/LangContext';
import { getComponentData } from '@/lib/dataManager';

const ContactSection = () => {
  const { lang } = useLang();
  const data = getComponentData('ContactSection', lang) || { form: {} };

  return (
    <div className="contacts-screen1 main_contacs_screen black-background section is_view na6 special" id="contact-form" style={{marginTop: '00px', paddingTop: '80px'}}>
		<div className="wrap view fadein">
			<div className="flex-row centered">
				<div className="left">
					<div className="top-block">
						<div className="section-subheading view textslide">{data.subheading}</div>
						<div>
							<h1 className="section-heading">{data.heading}</h1>
						</div>
						<div className="socs-wrap view textslide cwfl">
							<a href={`mailto:${data.email}`}
								className="line-animation email">{data.email}</a>
							<img src="/assets/img/copy.svg" data-text={data.email}
								className="email_to_copy2 copyme" alt=""/>
						</div>
					</div>

					<div className="socs-wrap view textslide">
						<div className="to-copy-email">
							<a href={`mailto:${data.email}`}
								className="line-animation email">{data.email}</a>
							<img src="/assets/img/copy.svg" data-text={data.email}
								className="email_to_copy pc-visible copyme" alt=""/>
						</div>

						<div className="socs view textslide">
							<a target="_blank" rel="noopener noreferrer nofollow" href="https://wa.me/22956141438"
								className="whatsapp wide"><img width="20" height="20" loading="lazy"
									src="/assets/img/s8.svg" alt=""/> <span>{data.whatsapp}</span></a>
						</div>
					</div>
				</div>
				<div className="right">

					<form className="main_contact_form2" action="https://formspree.io/f/mkndvwgg" method="post">
						<div className="inps-wrap">
							<label htmlFor="inpname_2" className="inp-wrap view textslide active viewed">
								<input type="text" id="inpname_2" placeholder=" " name="Nom" required
									autoComplete="off" data-max-length="40" className="required max-length pattern"
									data-pattern="[A-Za-z]"/>
								<span dangerouslySetInnerHTML={{ __html: data.form.name }}></span>
							</label>
							<label htmlFor="inpemail_2" className="inp-wrap view textslide active viewed">
								<input type="email" id="inpemail_2" placeholder=" " name="Email" required
									autoComplete="off" data-max-length="40" className="required max-length pattern"
									data-pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
									data-message-error="Your Email is invalid"/>
								<span dangerouslySetInnerHTML={{ __html: data.form.email }}></span>
							</label>
						</div>

						<label htmlFor="inptext_2" className="inp-wrap view textslide">
							<textarea placeholder=" " id="inptext_2" name="Message"
								data-message-error="Max length 1000 characters" className="max-length"
								data-max-length="1000" required></textarea>
							<span dangerouslySetInnerHTML={{ __html: data.form.project }}></span> <span className="counter" data-max="250">
								<b>0</b>/1000 </span> 
                        </label>



						<button type="submit" className="main-btn arrow white">
							<span>
								<svg fill="none" height="10" viewBox="0 0 9 10" width="9"
									xmlns="https://www.w3.org/2000/svg">
									<path clipRule="evenodd"
										d="m.455752.5h8.544248v8.54425h-1.28906v-6.34368l-6.799434 6.79943-.911506-.91151 6.79943-6.79943h-6.343678z"
										fill="black" fillRule="evenodd"></path>
								</svg>{data.form.submit}
							</span>
						</button>
					</form>

				</div>
			</div>
		</div>
	</div>
  );
};
export default ContactSection;