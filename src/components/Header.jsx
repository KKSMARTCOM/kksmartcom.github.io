"use client";
import { useLang } from '@/context/LangContext';
import { getComponentData } from '@/lib/dataManager';

export default function Header() {
  const { lang, handleLangChange } = useLang();
  const data = getComponentData('Header', lang) || { nav: { services: { subMenu: { columns: [] } }, projects: { subMenu: { columns: [] } }, company: { subMenu: { columns: [] } } }, contactModal: { form: {} }, ctaButton: {}, mobileMenu: {} };

  return (
    <>
		<div className="header-wrap">
			<div className="header viewed fadein" id="header">
				<div className="wrap">    	
					<div className="flex-row">
						<a href="/" className="logo">
							{/* SVG logo kept as-is */}
							<svg id="Calque_1" data-name="Calque 1" height="35" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1511.51 402.54">
								<defs>
									<style>{`.cls-1{fill:#4385f3}.cls-2{fill:#fe0162}.cls-3{fill:#fabb07}.cls-4{fill:#434244}`}</style>
								</defs>

								{/* truncated long SVG paths for brevity - kept full in original file if needed */}
                            <path className="cls-4"
								d="M204.2,51.6c56.99-.48,102.69,21.33,133.04,69.45,32.1,50.89,32.47,104.17,2.53,156.37-27.66,48.23-82.56,76.93-135.57,72.8V51.6Zm20.81,133.7c2.17-2.28,3.55-3.68,4.88-5.12,14.77-16.02,29.52-32.05,44.32-48.04,1.2-1.3,2.13-3.32,4.11-3.37,7.01-.14,14.02-.06,21.97-.06-18.66,20.38-36.47,39.82-54.32,59.31,22.52,21.89,44.64,43.4,67.68,65.79-7.89,0-14.48-.14-21.07,.06-2.91,.09-4.89-.89-6.95-2.9-18.81-18.36-37.73-36.61-56.66-54.83-1.06-1.02-1.91-2.62-4.1-2.68v60.17c-2.03,.14-3.79,.26-5.73,.39v80.92c60.83-1.47,126.71-53.95,126.68-133.83-.03-80.07-66.12-132.37-126.57-133.76v60.84c2,1,3.99-.19,5.77,1.2,0,18.2,0,36.45,0,55.91Z" />
							<path className="cls-4"
								d="M508.08,122.86c8.43,0,16.57,.1,24.7-.06,2.25-.04,3.23,1.26,4.42,2.63,11.44,13.19,22.9,26.37,34.36,39.55,1.08,1.24,2.21,2.43,3.57,3.91,12.33-14.29,24.52-28.28,36.52-42.44,2.25-2.66,4.53-3.8,8.05-3.67,7.45,.27,14.92,.08,22.67,.08v125.03c-10.24,.63-20.58,.31-31.24,.16v-76.15c-2.07-.43-2.41,1.21-3.15,2.06-9.39,10.79-18.71,21.64-28.07,32.45-3.58,4.13-6.01,4.11-9.66-.09-8.94-10.29-17.86-20.61-26.79-30.92-1.17-1.35-2.39-2.66-4.29-4.77v77.26h-31.09V122.86Z" />
							<path className="cls-4"
								d="M813.9,122.71c22.07,.9,43.93-1.63,65.57,1.27,21.13,2.83,34.43,22.35,30.2,42.75-1.79,8.64-6.96,14.92-14.19,19.67-1.63,1.07-3.35,2.03-5.53,3.34,9.99,7,14.41,17.37,19.05,27.62,4.56,10.05,9.25,20.05,14.23,30.84-11.39,0-21.98-.01-32.56,.01-2.49,0-2.77-2.1-3.49-3.65-3.9-8.43-7.67-16.92-11.59-25.34-1.4-3.01-3.08-5.88-4.62-8.82-5.45-10.43-13.83-14.83-26.11-12.19v49.73h-30.98c.02-41.56,.02-83.02,.02-125.23Zm31.18,51.59c7.43-.16,14.55,.64,21.61-.57,7.09-1.22,11.23-6.11,11.51-12.97,.29-7.07-3.12-12.11-9.78-13.68-7.64-1.81-15.41-1.04-23.33-.92-.01,9.41-.01,18.34-.01,28.14Z" />
							<path className="cls-1"
								d="M65.25,122.17c-13.9-5.57-27.42-10.98-40.98-16.41C61.17,36.17,137.06-4.81,213.72,.45V44.12c-30.1-1.52-58.68,3.71-85.36,17.8-26.54,14.03-47.32,34.1-63.11,60.25Z" />
							<path className="cls-4"
								d="M799.11,248.2c-11.11,0-21.38-.06-31.66,.04-2.49,.02-2.95-1.69-3.65-3.35-2.5-5.97-5.08-11.9-7.41-17.93-.9-2.32-2.02-3.33-4.67-3.31-16.48,.13-32.96,.12-49.44,0-2.61-.02-3.76,.84-4.6,3.27-2.11,6.11-4.57,12.1-6.82,18.16-.67,1.79-1.23,3.21-3.69,3.17-9.97-.13-19.94-.05-30.91-.05,17.02-42.13,33.82-83.69,50.65-125.35,11.36,0,22.51,.07,33.66-.06,2.17-.02,3.27,.67,4.13,2.6,17.98,40.66,36,81.29,54.41,122.81Zm-73.85-94.01c-6.01,15.92-11.84,31.39-17.81,47.22h37.51c-.86-4.22-16.85-42.67-19.7-47.22Z" />
							<path className="cls-4"
								d="M81.34,253.83c18.89-22.64,36.99-44.32,55.36-66.35-13.47-19.42-26.86-38.72-40.79-58.79,11.61,0,22.35,.03,33.09-.02,2.55-.01,3.21,2.02,4.31,3.59,11.99,16.94,23.96,33.89,36.77,52.01v-55.3h31.56v124.59h-31.28v-56.97c-2.6,1.08-3.6,3.04-4.88,4.55-13.57,15.97-27.17,31.93-40.56,48.05-2.76,3.33-5.55,4.91-10.04,4.76-10.77-.36-21.57-.12-33.54-.12Z" />
							<path className="cls-2"
								d="M213.7,402.46c-75.84,1.84-135.52-27.97-180.38-89.32,12.2-8.88,23.95-17.43,35.89-26.11,35.34,50.03,83.52,73.43,144.49,71.45v43.98Z" />
							<path className="cls-3"
								d="M65.49,281.49c-.89,.73-1.62,1.4-2.41,1.97-10.88,7.9-21.77,15.79-32.66,23.68C-5.13,255.14-11.22,175.25,21.21,111.59c13.42,5.35,26.9,10.72,40.56,16.17-24.45,51.99-24.38,102.97,3.72,153.73Z" />
							<path className="cls-4"
								d="M481.73,155.3c-3.77-1.45-6.95-2.73-10.17-3.91-11.28-4.13-22.61-7.95-34.93-6.67-7.28,.76-12.55,4.08-13.43,8.54-.84,4.25,2.43,8.43,9.87,11.64,9.76,4.21,19.79,7.8,29.49,12.13,10.99,4.91,19.97,12.13,23.4,24.32,6.3,22.39-7.36,42.61-32.03,47.18-20.19,3.74-39.38,.13-57.62-9.01-1.48-.74-2.94-1.45-2.93-3.58,.06-8.1,.03-16.2,.03-24.85,6.03,3.32,11.39,6.54,16.98,9.3,11,5.42,22.56,7.89,34.82,5.41,4.91-.99,8.79-3.31,9.66-8.69,.88-5.45-2.35-8.79-6.6-11.23-8.41-4.82-17.87-7.16-26.71-10.97-5.96-2.56-11.86-5.16-17.11-9.1-19.56-14.68-19.56-48.64,8.54-59.99,14.75-5.96,29.89-5.7,45.15-2.6,7.01,1.42,13.82,3.61,20.46,6.33,1.76,.72,3.25,1.27,3.2,3.72-.16,7.1-.07,14.21-.07,22.03Z" />
							<path className="cls-4"
								d="M1408.6,152.5v95.44h-17.92V122.87c5.26,0,10.39,.1,15.5-.05,2.32-.07,3.11,1.6,4.21,2.97,12.83,15.93,25.64,31.87,38.83,48.27,7.04-8.72,13.92-17.2,20.76-25.72,5.83-7.26,11.69-14.51,17.39-21.87,1.97-2.55,4.03-3.99,7.48-3.68,3.94,.35,7.94,.08,12.21,.08v125.07h-17.75v-96.69c-4.1,5.11-7.28,9.03-10.42,12.98-8.49,10.67-16.96,21.37-25.47,32.03-3.44,4.31-4.98,4.27-8.43-.03-11.06-13.74-22.11-27.48-33.2-41.2-.77-.95-1.21-2.38-3.19-2.53Z" />
							<path className="cls-4"
								d="M1300.88,249.84c-32.25-.01-58.1-18.47-64.8-46.92-11.02-46.8,22.55-84.16,69.07-81.74,22.25,1.15,40.58,10.09,53.27,28.72,22.41,32.91,10.83,88.25-42.96,98.78-5.09,.99-10.23,1.27-14.58,1.16Zm.9-111.45c-28.37-.06-49.3,20.33-49.12,47.83,.18,26.84,20.81,46.85,48.39,46.94,27.94,.09,49.12-20.27,49.22-47.31,.1-26.84-20.92-47.41-48.49-47.46Z" />
							<path className="cls-4"
								d="M963.31,146.13h-45.33v-22.92h121.78v22.7h-45.07v101.95h-31.38c0-33.77,0-67.58,0-101.73Z" />
							<path className="cls-4"
								d="M1217.68,219.16c0,6.51-.06,12.13,.03,17.74,.03,1.75-.62,2.73-2.17,3.44-24.17,11.08-49.05,13.97-73.93,3.62-24.74-10.3-39.63-37.49-36.71-63.94,3.16-28.58,23.29-51.2,50.71-57.11,20.56-4.43,39.9-.01,58.86,7.68,1.47,.6,2.08,1.34,2.06,2.89-.05,5.6-.02,11.21-.02,17.35-8.75-4.42-17.11-8.38-26.23-10.38-16.12-3.53-31.78-3.21-46.03,6.31-17.72,11.84-24.93,33.02-18.7,54.03,5.64,19.01,23.81,31.86,45.53,32.39,16.68,.4,31.68-4.77,46.6-14.02Z" />
							<path className="cls-2"
								d="M1464.22,300.32c.02-13.3,9.95-23.2,23.31-23.25,13.41-.04,23.92,10.2,23.98,23.39,.06,13.22-10.32,23.17-24.08,23.09-13.46-.08-23.24-9.87-23.21-23.23Z" />
							<path className="cls-1"
								d="M1337.45,300.25c.05,13.41-10.08,23.32-23.82,23.3-13.36-.02-23.81-10.14-23.76-23.01,.05-13,10.42-23.42,23.45-23.55,13.36-.14,24.08,10.2,24.13,23.26Z" />
							<path className="cls-3"
								d="M1424.4,300.84c-.06,13.03-10.28,22.76-23.86,22.71-13.41-.05-23.66-10.08-23.61-23.1,.05-13.25,10.65-23.61,23.95-23.41,13.45,.2,23.58,10.46,23.52,23.8Z" />
						
							</svg>
						</a>

						<nav className="main-menu-wrap">
							<ul>
								<li className="menu-item-has-children">
                                    <a className="" href={data.nav.services.href} target="_self">{data.nav.services.text}</a>
                                    <svg width="8" height="3" viewBox="0 0 8 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.5 0H7.5L4 3L0.5 0Z" fill="#1F2122" />
                                    </svg>
                                    <div className="sub-menu white-background">
                                        <div className="menu-inner wrap">
                                            <a href={data.nav.services.href} className="circle-btn lime">
                                                <span>
                                                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.5 0L11 5.5L5.5 11L4.67022 10.1702L8.7537 6H0V5H8.7537L4.67022 0.829781L5.5 0Z" fill="#1F2122"></path>
                                                    </svg>
                                                    {data.nav.services.subMenu.cta}
                                                </span>
                                            </a>
                                            <div className="col">
                                                <div className="menu-title section-title small">{data.nav.services.subMenu.columns[0].title}</div>
                                                <ul>
                                                    <li><a href={data.nav.services.subMenu.columns[0].items[0].href} target="_self">{data.nav.services.subMenu.columns[0].items[0].text}</a></li>
                                                    <li><a href={data.nav.services.subMenu.columns[0].items[1].href} target="_self">{data.nav.services.subMenu.columns[0].items[1].text}</a></li>
                                                    <li><a href={data.nav.services.subMenu.columns[0].items[2].href} target="_self">{data.nav.services.subMenu.columns[0].items[2].text}</a></li>
                                                    <li><a href={data.nav.services.subMenu.columns[0].items[3].href} target="_self">{data.nav.services.subMenu.columns[0].items[3].text}</a></li>
                                                    <li><a href={data.nav.services.subMenu.columns[0].items[4].href} target="_self">{data.nav.services.subMenu.columns[0].items[4].text}</a></li>
                                                </ul>
                                            </div>
                                            <div className="col">
                                                <div className="menu-title section-title small">{data.nav.services.subMenu.columns[1].title}</div>
                                                <ul>
                                                    <li><a href={data.nav.services.subMenu.columns[1].items[0].href} target="_self">{data.nav.services.subMenu.columns[1].items[0].text}</a></li>
                                                    <li><a href={data.nav.services.subMenu.columns[1].items[1].href} target="_self">{data.nav.services.subMenu.columns[1].items[1].text}</a></li>
                                                    <li><a href={data.nav.services.subMenu.columns[1].items[2].href} target="_self">{data.nav.services.subMenu.columns[1].items[2].text}</a></li>
                                                </ul>
                                            </div>
                                            <div className="col">
                                                <div className="menu-title section-title small">{data.nav.services.subMenu.columns[2].title}</div>
                                                <ul>
                                                    <li><a href={data.nav.services.subMenu.columns[2].items[0].href} target="_self">{data.nav.services.subMenu.columns[2].items[0].text}</a></li>
                                                    <li><a href={data.nav.services.subMenu.columns[2].items[1].href} target="_self">{data.nav.services.subMenu.columns[2].items[1].text}</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>

								<li className="menu-item-has-children">
                                    <a href={data.nav.projects.href} target="_self">{data.nav.projects.text}</a>
                                    <svg width="8" height="3" viewBox="0 0 8 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.5 0H7.5L4 3L0.5 0Z" fill="#1F2122" />
                                    </svg>
                                    <div className="sub-menu white-background">
                                        <div className="menu-inner wrap">
                                            <a href="#" className="circle-btn lime"><span>{data.nav.projects.subMenu.cta}</span></a>
                                            <div className="col" style={{marginRight:'auto'}}>
                                                <div className="menu-title section-title small">{data.nav.projects.subMenu.columns[0].title}</div>
                                                <ul>
                                                    <li><a href="#" target="_self">{data.nav.projects.subMenu.columns[0].items[0].text}</a></li>
                                                    <li><a href="#" target="_self">{data.nav.projects.subMenu.columns[0].items[1].text}</a></li>
                                                    <li><a href="#" target="_self">{data.nav.projects.subMenu.columns[0].items[2].text}</a></li>
                                                    <li><a href="#" target="_self">{data.nav.projects.subMenu.columns[0].items[3].text}</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>

								<li className="menu-item-has-children">
                                    <a href={data.nav.company.href} target="_self">{data.nav.company.text}</a>
                                    <svg width="8" height="3" viewBox="0 0 8 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.5 0H7.5L4 3L0.5 0Z" fill="#1F2122" />
                                    </svg>
                                    <div className="sub-menu white-background">
                                        <div className="menu-inner wrap">
                                            <a href="#" className="circle-btn lime"><span>{data.nav.company.subMenu.cta}</span></a>
                                            <div className="col" style={{marginRight:'auto'}}>
                                                <div className="menu-title section-title small">{data.nav.company.subMenu.columns[0].title}</div>
                                                <ul>
                                                    <li><a href={data.nav.company.subMenu.columns[0].items[0].href} target="_self">{data.nav.company.subMenu.columns[0].items[0].text}</a></li>
                                                    <li><a href={data.nav.company.subMenu.columns[0].items[1].href} target="_self">{data.nav.company.subMenu.columns[0].items[1].text}</a></li>
                                                    <li><a href={data.nav.company.subMenu.columns[0].items[2].href} target="_self">{data.nav.company.subMenu.columns[0].items[2].text}</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>
							</ul>
						</nav>

						<div className="header-arr-wrap">
							<div className="langs-wrap main-menu-wrap">
								<ul id="menu-langs-menu" className="menu">
									<li id="menu-item-10096" className="pll-parent-menu-item menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-10096">
                                        <a href="#pll_switcher">{lang.toUpperCase()}</a>
                                        <svg width="8" height="3" viewBox="0 0 8 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.5 0H7.5L4 3L0.5 0Z" fill="#1F2122" />
                                        </svg>
                                        <ul className="sub-menu">
                                            <li><a href="#" onClick={(e) => { e.preventDefault(); handleLangChange('fr'); }}>FRA</a></li>
                                            <li><a href="#" onClick={(e) => { e.preventDefault(); handleLangChange('en'); }}>ENG</a></li>
                                        </ul>
                                    </li>
								</ul>
							</div>

							<div className="main-modal-wrap form-modal">
								<div className="modal-closer wrap black-background">
									<div className="mob-visible">
										<a href="index.html" className="logo">
											<svg id="Calque_1" data-name="Calque 1" height="35"
												xmlns="https://www.w3.org/2000/svg" viewBox="0 0 1511.51 402.54">
												<defs>
													<style>{`.cls-1{fill:#4385f3}.cls-2{fill:#fe0162}.cls-3{fill:#fabb07}.cls-4{fill:#434244}`}</style>
												</defs>
												<path className="cls-4"
													d="M204.2,51.6c56.99-.48,102.69,21.33,133.04,69.45,32.1,50.89,32.47,104.17,2.53,156.37-27.66,48.23-82.56,76.93-135.57,72.8V51.6Zm20.81,133.7c2.17-2.28,3.55-3.68,4.88-5.12,14.77-16.02,29.52-32.05,44.32-48.04,1.2-1.3,2.13-3.32,4.11-3.37,7.01-.14,14.02-.06,21.97-.06-18.66,20.38-36.47,39.82-54.32,59.31,22.52,21.89,44.64,43.4,67.68,65.79-7.89,0-14.48-.14-21.07,.06-2.91,.09-4.89-.89-6.95-2.9-18.81-18.36-37.73-36.61-56.66-54.83-1.06-1.02-1.91-2.62-4.1-2.68v60.17c-2.03,.14-3.79,.26-5.73,.39v80.92c60.83-1.47,126.71-53.95,126.68-133.83-.03-80.07-66.12-132.37-126.57-133.76v60.84c2,1,3.99-.19,5.77,1.2,0,18.2,0,36.45,0,55.91Z" />
												<path className="cls-4"
													d="M508.08,122.86c8.43,0,16.57,.1,24.7-.06,2.25-.04,3.23,1.26,4.42,2.63,11.44,13.19,22.9,26.37,34.36,39.55,1.08,1.24,2.21,2.43,3.57,3.91,12.33-14.29,24.52-28.28,36.52-42.44,2.25-2.66,4.53-3.8,8.05-3.67,7.45,.27,14.92,.08,22.67,.08v125.03c-10.24,.63-20.58,.31-31.24,.16v-76.15c-2.07-.43-2.41,1.21-3.15,2.06-9.39,10.79-18.71,21.64-28.07,32.45-3.58,4.13-6.01,4.11-9.66-.09-8.94-10.29-17.86-20.61-26.79-30.92-1.17-1.35-2.39-2.66-4.29-4.77v77.26h-31.09V122.86Z" />
												<path className="cls-4"
													d="M813.9,122.71c22.07,.9,43.93-1.63,65.57,1.27,21.13,2.83,34.43,22.35,30.2,42.75-1.79,8.64-6.96,14.92-14.19,19.67-1.63,1.07-3.35,2.03-5.53,3.34,9.99,7,14.41,17.37,19.05,27.62,4.56,10.05,9.25,20.05,14.23,30.84-11.39,0-21.98-.01-32.56,.01-2.49,0-2.77-2.1-3.49-3.65-3.9-8.43-7.67-16.92-11.59-25.34-1.4-3.01-3.08-5.88-4.62-8.82-5.45-10.43-13.83-14.83-26.11-12.19v49.73h-30.98c.02-41.56,.02-83.02,.02-125.23Zm31.18,51.59c7.43-.16,14.55,.64,21.61-.57,7.09-1.22,11.23-6.11,11.51-12.97,.29-7.07-3.12-12.11-9.78-13.68-7.64-1.81-15.41-1.04-23.33-.92-.01,9.41-.01,18.34-.01,28.14Z" />
												<path className="cls-1"
													d="M65.25,122.17c-13.9-5.57-27.42-10.98-40.98-16.41C61.17,36.17,137.06-4.81,213.72,.45V44.12c-30.1-1.52-58.68,3.71-85.36,17.8-26.54,14.03-47.32,34.1-63.11,60.25Z" />
												<path className="cls-4"
													d="M799.11,248.2c-11.11,0-21.38-.06-31.66,.04-2.49,.02-2.95-1.69-3.65-3.35-2.5-5.97-5.08-11.9-7.41-17.93-.9-2.32-2.02-3.33-4.67-3.31-16.48,.13-32.96,.12-49.44,0-2.61-.02-3.76,.84-4.6,3.27-2.11,6.11-4.57,12.1-6.82,18.16-.67,1.79-1.23,3.21-3.69,3.17-9.97-.13-19.94-.05-30.91-.05,17.02-42.13,33.82-83.69,50.65-125.35,11.36,0,22.51,.07,33.66-.06,2.17-.02,3.27,.67,4.13,2.6,17.98,40.66,36,81.29,54.41,122.81Zm-73.85-94.01c-6.01,15.92-11.84,31.39-17.81,47.22h37.51c-.86-4.22-16.85-42.67-19.7-47.22Z" />
												<path className="cls-4"
													d="M81.34,253.83c18.89-22.64,36.99-44.32,55.36-66.35-13.47-19.42-26.86-38.72-40.79-58.79,11.61,0,22.35,.03,33.09-.02,2.55-.01,3.21,2.02,4.31,3.59,11.99,16.94,23.96,33.89,36.77,52.01v-55.3h31.56v124.59h-31.28v-56.97c-2.6,1.08-3.6,3.04-4.88,4.55-13.57,15.97-27.17,31.93-40.56,48.05-2.76,3.33-5.55,4.91-10.04,4.76-10.77-.36-21.57-.12-33.54-.12Z" />
												<path className="cls-2"
													d="M213.7,402.46c-75.84,1.84-135.52-27.97-180.38-89.32,12.2-8.88,23.95-17.43,35.89-26.11,35.34,50.03,83.52,73.43,144.49,71.45v43.98Z" />
												<path className="cls-3"
													d="M65.49,281.49c-.89,.73-1.62,1.4-2.41,1.97-10.88,7.9-21.77,15.79-32.66,23.68C-5.13,255.14-11.22,175.25,21.21,111.59c13.42,5.35,26.9,10.72,40.56,16.17-24.45,51.99-24.38,102.97,3.72,153.73Z" />
												<path className="cls-4"
													d="M481.73,155.3c-3.77-1.45-6.95-2.73-10.17-3.91-11.28-4.13-22.61-7.95-34.93-6.67-7.28,.76-12.55,4.08-13.43,8.54-.84,4.25,2.43,8.43,9.87,11.64,9.76,4.21,19.79,7.8,29.49,12.13,10.99,4.91,19.97,12.13,23.4,24.32,6.3,22.39-7.36,42.61-32.03,47.18-20.19,3.74-39.38,.13-57.62-9.01-1.48-.74-2.94-1.45-2.93-3.58,.06-8.1,.03-16.2,.03-24.85,6.03,3.32,11.39,6.54,16.98,9.3,11,5.42,22.56,7.89,34.82,5.41,4.91-.99,8.79-3.31,9.66-8.69,.88-5.45-2.35-8.79-6.6-11.23-8.41-4.82-17.87-7.16-26.71-10.97-5.96-2.56-11.86-5.16-17.11-9.1-19.56-14.68-19.56-48.64,8.54-59.99,14.75-5.96,29.89-5.7,45.15-2.6,7.01,1.42,13.82,3.61,20.46,6.33,1.76,.72,3.25,1.27,3.2,3.72-.16,7.1-.07,14.21-.07,22.03Z" />
												<path className="cls-4"
													d="M1408.6,152.5v95.44h-17.92V122.87c5.26,0,10.39,.1,15.5-.05,2.32-.07,3.11,1.6,4.21,2.97,12.83,15.93,25.64,31.87,38.83,48.27,7.04-8.72,13.92-17.2,20.76-25.72,5.83-7.26,11.69-14.51,17.39-21.87,1.97-2.55,4.03-3.99,7.48-3.68,3.94,.35,7.94,.08,12.21,.08v125.07h-17.75v-96.69c-4.1,5.11-7.28,9.03-10.42,12.98-8.49,10.67-16.96,21.37-25.47,32.03-3.44,4.31-4.98,4.27-8.43-.03-11.06-13.74-22.11-27.48-33.2-41.2-.77-.95-1.21-2.38-3.19-2.53Z" />
												<path className="cls-4"
													d="M1300.88,249.84c-32.25-.01-58.1-18.47-64.8-46.92-11.02-46.8,22.55-84.16,69.07-81.74,22.25,1.15,40.58,10.09,53.27,28.72,22.41,32.91,10.83,88.25-42.96,98.78-5.09,.99-10.23,1.27-14.58,1.16Zm.9-111.45c-28.37-.06-49.3,20.33-49.12,47.83,.18,26.84,20.81,46.85,48.39,46.94,27.94,.09,49.12-20.27,49.22-47.31,.1-26.84-20.92-47.41-48.49-47.46Z" />
												<path className="cls-4"
													d="M963.31,146.13h-45.33v-22.92h121.78v22.7h-45.07v101.95h-31.38c0-33.77,0-67.58,0-101.73Z" />
												<path className="cls-4"
													d="M1217.68,219.16c0,6.51-.06,12.13,.03,17.74,.03,1.75-.62,2.73-2.17,3.44-24.17,11.08-49.05,13.97-73.93,3.62-24.74-10.3-39.63-37.49-36.71-63.94,3.16-28.58,23.29-51.2,50.71-57.11,20.56-4.43,39.9-.01,58.86,7.68,1.47,.6,2.08,1.34,2.06,2.89-.05,5.6-.02,11.21-.02,17.35-8.75-4.42-17.11-8.38-26.23-10.38-16.12-3.53-31.78-3.21-46.03,6.31-17.72,11.84-24.93,33.02-18.7,54.03,5.64,19.01,23.81,31.86,45.53,32.39,16.68,.4,31.68-4.77,46.6-14.02Z" />
												<path className="cls-2"
													d="M1464.22,300.32c.02-13.3,9.95-23.2,23.31-23.25,13.41-.04,23.92,10.2,23.98,23.39,.06,13.22-10.32,23.17-24.08,23.09-13.46-.08-23.24-9.87-23.21-23.23Z" />
												<path className="cls-1"
													d="M1337.45,300.25c.05,13.41-10.08,23.32-23.82,23.3-13.36-.02-23.81-10.14-23.76-23.01,.05-13,10.42-23.42,23.45-23.55,13.36-.14,24.08,10.2,24.13,23.26Z" />
												<path className="cls-3"
													d="M1424.4,300.84c-.06,13.03-10.28,22.76-23.86,22.71-13.41-.05-23.66-10.08-23.61-23.1,.05-13.25,10.65-23.61,23.95-23.41,13.45,.2,23.58,10.46,23.52,23.8Z" />
											</svg>
										</a>
									</div>
									<span><img src="/assets/img/x.svg" alt=""/></span>
								</div>
								<div className="modal-wrap">
									<div className="modal-close"></div>
									<div className="modal wrap">
										<div className="flex-modal-wrap">
											<div className="left black-background">
												<div className="top view textslide">
													<div className="section-title medium">{data.contactModal.title}</div>
                                                    <div className="l-wrap"> <a href={`mailto:${data.contactModal.email}`}
                                                            className="line-animation email">{data.contactModal.email}</a> <b
                                                            className="copyme_wrap">
                                                            <img style={{marginLeft:"0!important"}}
                                                                src="/assets/img/copy.svg"
                                                                data-text={data.contactModal.email} className="copyme" alt=""/> </b>
                                                    </div>
                                                </div>
                                                <div className="bottom socs-wrap">
                                                    <div className="socs view textslide">
                                                        <a target="_blank" rel="noopener noreferrer nofollow"
                                                            href={data.contactModal.whatsappLink} className="whatsapp wide"><img
                                                                width="20" height="20" loading="lazy"
                                                                src="/assets/img/s8.svg" alt=""/>
                                                            <span>{data.contactModal.whatsapp}</span>
                                                        </a>				
													</div>
												</div>

												<div className="socs-wrap view textslide">

												</div>
											</div>

											<div className="right black-background">
												<form action="https://formspree.io/f/mkndvwgg" method="post"
													autoComplete="off" className="main_contact_form">
													<label htmlFor="inpname_1" className="inp-wrap view textslide active viewed">
														<input type="text" id="inpname_1" placeholder=" " name="Nom"
                                                            required="" autoComplete="on" data-max-length="40"
                                                            className="required max-length pattern" data-pattern="[A-Za-z]"/>
                                                        <span>{data.contactModal.form.name}</span>
													</label>
													<label htmlFor="inpemail_1" className="inp-wrap view textslide active viewed">
														<input type="email" id="inpemail_1" placeholder=" " name="Email"
                                                            required="" autoComplete="on" data-max-length="40"
                                                            className="required max-length pattern"
                                                            data-pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                                            data-message-error="Your Email is invalid"/>
                                                        <span>{data.contactModal.form.email}</span>
													</label>
													<label htmlFor="inptext_1" className="inp-wrap view textslide">
														<textarea placeholder=" " required id="inptext_1" name="Message"
                                                            data-message-error="Max length 1000 characters"
                                                            className="max-length" data-max-length="1000">
                                                        </textarea>
                                                        <span>{data.contactModal.form.project}</span> <span
															className="counter" data-max="250"> <b>0</b>/1000 </span> 
													</label>


													<div className="trms-wrap">
														<button type="submit" className="main-btn arrow white">
															<span>
																<svg fill="none" height="10" viewBox="0 0 9 10" width="9"
                                                                    xmlns="https://www.w3.org/2000/svg">
                                                                    <path clipRule="evenodd"
                                                                        d="m.455752.5h8.544248v8.54425h-1.28906v-6.34368l-6.799434 6.79943-.911506-.91151 6.79943-6.79943h-6.343678z"
                                                                        fill="black" fillRule="evenodd"></path>
                                                                </svg>{data.contactModal.form.submit}
															</span>
														</button>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>

                            <a href={data.ctaButton.href} className="arrow-btn" ><span></span>{data.ctaButton.text}</a>
							
						</div>
						<div className="gam"></div>
					</div>
				</div>
				<div className="progress-wrap gray-background">
					<div className="progress"></div>
				</div>
        </div>
      </div>
      <div className="mobile-menu-wrap black-background passive">
		<div className="mobile-menu wrap">
			<ul id="menu-mobile-menu" className="menu">
				<li id="menu-item-7141"
					className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-7141">
					<a href={data.nav.services.href}><span className="a-line"><span>{data.nav.services.text}</span></span></a>
					<ul className="sub-menu">
						<li id="menu-item-10396"
							className="menu-item menu-item-type-post_type menu-item-object-page menu-item-10396"><a href={data.nav.services.subMenu.columns[0].items[0].href}><span className="a-line"><span>{data.nav.services.subMenu.columns[0].items[0].text}</span></span></a></li>
						<li id="menu-item-10294"
							className="menu-item menu-item-type-post_type menu-item-object-service menu-item-10294"><a href={data.nav.services.subMenu.columns[0].items[1].href}><span className="a-line"><span>{data.nav.services.subMenu.columns[0].items[1].text}</span></span></a></li>
						<li id="menu-item-10295"
							className="menu-item menu-item-type-post_type menu-item-object-service menu-item-10295"><a href={data.nav.services.subMenu.columns[0].items[2].href}><span className="a-line"><span>{data.nav.services.subMenu.columns[0].items[2].text}</span></span></a></li>
						<li id="menu-item-10298"
							className="menu-item menu-item-type-post_type menu-item-object-service menu-item-10298"><a href={data.nav.services.subMenu.columns[0].items[3].href}><span className="a-line"><span>{data.nav.services.subMenu.columns[0].items[3].text}</span></span></a></li>
						<li id="menu-item-10296"
							className="menu-item menu-item-type-post_type menu-item-object-service menu-item-10296"><a href={data.nav.services.subMenu.columns[0].items[4].href}><span className="a-line"><span>{data.nav.services.subMenu.columns[0].items[4].text}</span></span></a></li>
						<li id="menu-item-10297"
							className="menu-item menu-item-type-post_type menu-item-object-service menu-item-10297"><a href={data.nav.services.subMenu.columns[1].items[0].href}><span className="a-line"><span>{data.nav.services.subMenu.columns[1].items[0].text}</span></span></a></li>
						<li id="menu-item-10299"
							className="menu-item menu-item-type-post_type menu-item-object-service menu-item-10299"><a href={data.nav.services.subMenu.columns[1].items[1].href}><span className="a-line"><span>{data.nav.services.subMenu.columns[1].items[1].text}</span></span></a></li>
						<li id="menu-item-10300"
							className="menu-item menu-item-type-post_type menu-item-object-service menu-item-10300"><a href={data.nav.services.subMenu.columns[1].items[2].href}><span className="a-line"><span>{data.nav.services.subMenu.columns[1].items[2].text}</span></span></a></li>
						<li id="menu-item-10301"
							className="menu-item menu-item-type-post_type menu-item-object-service menu-item-10301"><a href={data.nav.services.subMenu.columns[2].items[0].href}><span className="a-line"><span>{data.nav.services.subMenu.columns[2].items[0].text}</span></span></a></li>
						<li id="menu-item-10302"
							className="menu-item menu-item-type-post_type menu-item-object-service menu-item-10302"><a href={data.nav.services.subMenu.columns[2].items[1].href}><span className="a-line"><span>{data.nav.services.subMenu.columns[2].items[1].text}</span></span></a></li>
					</ul><span className="sub-menu-opener"></span>
				</li>
				<li id="menu-item-150" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-150"><a href={data.nav.projects.href}>{data.nav.projects.text}</a></li>

				<li id="menu-item-7141"
					className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-7141">
					<a href={data.nav.company.href}><span className="a-line"><span>{data.nav.company.text}</span></span></a>
					<ul className="sub-menu">
						<li id="menu-item-10396"
							className="menu-item menu-item-type-post_type menu-item-object-page menu-item-10396"><a href={data.nav.company.subMenu.columns[0].items[0].href}><span className="a-line"><span>{data.nav.company.subMenu.columns[0].items[0].text}</span></span></a></li>
						<li id="menu-item-10294"
							className="menu-item menu-item-type-post_type menu-item-object-service menu-item-10294"><a href={data.nav.company.subMenu.columns[0].items[1].href}><span className="a-line"><span>{data.nav.company.subMenu.columns[0].items[1].text}</span></span></a></li>
						<li id="menu-item-10295"
							className="menu-item menu-item-type-post_type menu-item-object-service menu-item-10295"><a href={data.nav.company.subMenu.columns[0].items[2].href}><span className="a-line"><span>{data.nav.company.subMenu.columns[0].items[2].text}</span></span></a></li>
					</ul><span className="sub-menu-opener"></span>
				</li>
				<li id="menu-item-10097" className="pll-parent-menu-item menu-item menu-item-type-custom menu-item-object-custom current-menu-parent menu-item-has-children menu-item-10097 current_page_item">
                    <a href="#"><span className="a-line"><span>{lang.toUpperCase()}</span></span></a>
                    <ul className="sub-menu" style={{display: "none", boxSizing: "border-box"}}>
                        <li id="menu-item-10097-fr">
                            <a href="#" onClick={(e) => { e.preventDefault(); handleLangChange('fr'); }}><span className="a-line"><span>FRA</span></span></a>
                        </li>
                        <li id="menu-item-10097-it">
                            <a href="#" onClick={(e) => { e.preventDefault(); handleLangChange('en'); }}><span className="a-line"><span>ENG</span></span></a>
                        </li>
                    </ul><span className="sub-menu-opener"></span>
                </li>
			</ul>
			<a href="#contact-form" className="circle-btn lime play_video sldttp">
				<span>
					<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="https://www.w3.org/2000/svg">
						<path fillRule="evenodd" clipRule="evenodd"
							d="M5.5 0L11 5.5L5.5 11L4.67022 10.1702L8.7537 6H0V5H8.7537L4.67022 0.829781L5.5 0Z"
							fill="#1F2122" />
					</svg>{data.mobileMenu.cta}
				</span>
			</a>
			<div className="mobile-socs">
				<div className="socs-wrap">
					<div className="socs"><a target="_blank" rel="noopener noreferrer nofollow"
							href={data.contactModal.whatsappLink} className="whatsapp wide"><img src="/assets/img/s8.svg" width="20" height="20" loading="lazy" alt="" />
							<span>{data.mobileMenu.whatsapp}</span></a> </div>
				</div>
			</div>
		</div>
		</div>
	</>
	);
}
