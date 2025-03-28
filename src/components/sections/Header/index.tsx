import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { Link, Action, Social } from '../../atoms';
import ImageBlock from '../../molecules/ImageBlock';
import CloseIcon from '../../svgs/close';
import MenuIcon from '../../svgs/menu';

export default function Header(props) {
    const { headerVariant, isSticky, title, isTitleVisible, logo, primaryLinks = [], socialLinks = [], webAppLinks = [], styles = {} } = props;
    const headerWidth = styles.self?.width ?? 'narrow';
    return (
        <header className={classNames('sb-component', 'sb-component-header', isSticky ? 'sticky top-0 z-10' : 'relative', 'border-b', 'border-current')}>
            <div
                className={classNames('mx-auto', mapMaxWidthStyles(headerWidth), {
                    'xl:border-l xl:border-r border-current': headerWidth === 'narrow',
                    '2xl:border-l 2xl:border-r border-current': headerWidth === 'wide'
                })}
            >
                <Link href="#main" className="sr-only">
                    Skip to main content
                </Link>
                <HeaderVariants
                    variant={headerVariant}
                    title={title}
                    isTitleVisible={isTitleVisible}
                    logo={logo}
                    primaryLinks={primaryLinks}
                    socialLinks={socialLinks}
                    webAppLinks={webAppLinks}
                />
            </div>
        </header>
    );
}

function HeaderVariants(props) {
    const { variant = 'variant-a', ...rest } = props;
    switch (variant) {
        case 'variant-a':
            return <HeaderVariantA {...rest} />;
        case 'variant-b':
            return <HeaderVariantB {...rest} />;
        case 'variant-c':
            return <HeaderVariantC {...rest} />;
        default:
            return null;
    }
}

function HeaderVariantA(props) {
    const { primaryLinks = [], socialLinks = [], webAppLinks = [], ...logoProps } = props;
    return (
        <div className="flex items-stretch relative">
            <SiteLogoLink {...logoProps} />
            {primaryLinks.length > 0 && (
                <ul className="hidden lg:flex divide-x divide-current border-r border-current">
                    <ListOfLinks links={primaryLinks} inMobileMenu={false} webAppLinks={webAppLinks} />
                </ul>
            )}
            {socialLinks.length > 0 && (
                <ul className="hidden lg:flex border-l border-current ml-auto">
                    <ListOfSocialLinks links={socialLinks} inMobileMenu={false} />
                </ul>
            )}
            {(primaryLinks.length > 0 || socialLinks.length > 0) && <MobileMenu {...props} />}
        </div>
    );
}

function HeaderVariantB(props) {
    const { primaryLinks = [], socialLinks = [], webAppLinks = [], ...logoProps } = props;
    return (
        <div className="flex items-stretch relative">
            <SiteLogoLink {...logoProps} />
            {primaryLinks.length > 0 && (
                <ul className="hidden lg:flex border-l border-current divide-x divide-current ml-auto">
                    <ListOfLinks links={primaryLinks} inMobileMenu={false} webAppLinks={webAppLinks} />
                </ul>
            )}
            {socialLinks.length > 0 && (
                <ul
                    className={classNames('hidden', 'lg:flex', 'border-l', 'border-current', {
                        'ml-auto': primaryLinks.length === 0
                    })}
                >
                    <ListOfSocialLinks links={socialLinks} inMobileMenu={false} />
                </ul>
            )}
            {(primaryLinks.length > 0 || socialLinks.length > 0) && <MobileMenu {...props} />}
        </div>
    );
}

function HeaderVariantC(props) {
    const { primaryLinks = [], socialLinks = [], webAppLinks = [], ...logoProps } = props;
    return (
        <div className="flex items-stretch relative">
            <SiteLogoLink {...logoProps} />
            {socialLinks.length > 0 && (
                <ul className="hidden lg:flex border-l border-current ml-auto">
                    <ListOfSocialLinks links={socialLinks} inMobileMenu={false} />
                </ul>
            )}
            {primaryLinks.length > 0 && (
                <ul
                    className={classNames('hidden', 'lg:flex', 'border-l', 'border-current', 'divide-x', 'divide-current', {
                        'ml-auto': primaryLinks.length === 0
                    })}
                >
                    <ListOfLinks links={primaryLinks} inMobileMenu={false} webAppLinks={webAppLinks} />
                </ul>
            )}
            {(primaryLinks.length > 0 || socialLinks.length > 0) && <MobileMenu {...props} />}
        </div>
    );
}

function MobileMenu(props) {
    const { primaryLinks = [], socialLinks = [], webAppLinks = [], ...logoProps } = props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = () => {
            setIsMenuOpen(false);
        };
        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router.events]);

    return (
        <div className="ml-auto lg:hidden">
            <button aria-label="Open Menu" className="border-l border-current h-10 min-h-full p-4 focus:outline-none" onClick={() => setIsMenuOpen(true)}>
                <span className="sr-only">Open Menu</span>
                <MenuIcon className="fill-current h-6 w-6" />
            </button>
            <div className={classNames('sb-header-overlay', 'fixed', 'inset-0', 'overflow-y-auto', 'z-20', isMenuOpen ? 'block' : 'hidden')}>
                <div className="flex flex-col min-h-full">
                    <div className="border-b border-current flex items-stretch justify-between">
                        <SiteLogoLink {...logoProps} />
                        <div className="border-l border-current">
                            <button aria-label="Close Menu" className="h-10 min-h-full p-4 focus:outline-none" onClick={() => setIsMenuOpen(false)}>
                                <CloseIcon className="fill-current h-6 w-6" />
                            </button>
                        </div>
                    </div>
                    {(primaryLinks.length > 0 || socialLinks.length > 0) && (
                        <div className="flex flex-col justify-center grow px-4 py-20 space-y-12">
                            {primaryLinks.length > 0 && (
                                <ul className="space-y-6">
                                    <ListOfLinks links={primaryLinks} inMobileMenu={true} webAppLinks={webAppLinks} />
                                </ul>
                            )}
                            {socialLinks.length > 0 && (
                                <ul className="flex flex-wrap justify-center">
                                    <ListOfSocialLinks links={socialLinks} inMobileMenu={true} />
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function SiteLogoLink({ title, isTitleVisible, logo }) {
    if (!(logo || (title && isTitleVisible))) {
        return null;
    }
    return (
        <div className="border-r border-current flex items-center">
            <Link href="/" className="sb-header-logo flex items-center h-full p-4">
                {logo && <ImageBlock {...logo} className={classNames('max-h-12', { 'mr-2': isTitleVisible })} />}
                {title && isTitleVisible && <span className="text-base tracking-widest uppercase">{title}</span>}
            </Link>
        </div>
    );
}

function ListOfLinks({ links, inMobileMenu, webAppLinks = [] }) {
    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRefs = useRef({});

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (openDropdown !== null && dropdownRefs.current[openDropdown] && !dropdownRefs.current[openDropdown].contains(event.target)) {
                setOpenDropdown(null);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openDropdown]);

    // Handler for dropdown toggle
    const toggleDropdown = (index) => {
        if (openDropdown === index) {
            setOpenDropdown(null);
        } else {
            setOpenDropdown(index);
        }
    };

    return links.map((link, index) => {
        // Check if this link has a dropdown
        const hasDropdown = link.hasDropdown && webAppLinks && webAppLinks.length > 0;

        if (hasDropdown) {
            return (
                <li 
                    key={index} 
                    className={classNames(
                        inMobileMenu ? 'text-center w-full' : 'inline-flex items-stretch relative',
                        'dropdown-container'
                    )}
                    ref={el => { if (el) dropdownRefs.current[index] = el; return; }}
                >
                    <div 
                        className={classNames(
                            inMobileMenu ? 'text-xl cursor-pointer' : 'sb-component-link-fill p-4 cursor-pointer', 
                            'font-normal', 
                            'text-base', 
                            'tracking-widest', 
                            'uppercase'
                        )}
                        onClick={() => toggleDropdown(index)}
                    >
                        {link.label}
                    </div>
                    
                    {/* Desktop dropdown */}
                    {!inMobileMenu && openDropdown === index && (
                        <div className="absolute top-full left-0 bg-black text-white border border-current shadow-lg z-10 min-w-[280px] px-3">
                            {webAppLinks.map((app, appIndex) => (
                                <Link
                                    key={appIndex}
                                    href={app.url}
                                    target={app.target}
                                    className="block py-3 px-3 hover:bg-gray-800 whitespace-nowrap text-sm"
                                >
                                    {app.label}
                                </Link>
                            ))}
                        </div>
                    )}
                    
                    {/* Mobile dropdown content */}
                    {inMobileMenu && openDropdown === index && (
                        <div className="mt-4 space-y-4 bg-gray-800 p-4 rounded">
                            {webAppLinks.map((app, appIndex) => (
                                <div key={appIndex} className="px-4">
                                    <Link
                                        href={app.url}
                                        target={app.target}
                                        className="block py-2 text-sm font-normal tracking-wide text-white"
                                    >
                                        {app.label}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </li>
            );
        }

        // Regular link without dropdown
        return (
            <li key={index} className={classNames(inMobileMenu ? 'text-center w-full' : 'inline-flex items-stretch')}>
                <Action
                    {...link}
                    className={classNames(
                        inMobileMenu ? 'text-xl' : 'sb-component-link-fill p-4', 
                        'font-normal', 
                        'text-base', 
                        'tracking-widest', 
                        'uppercase'
                    )}
                />
            </li>
        );
    });
}

function ListOfSocialLinks({ links, inMobileMenu = false }) {
    return links.map((link, index) => (
        <li key={index} className={classNames(inMobileMenu ? 'border border-current -ml-px -mt-px' : 'inline-flex items-stretch')}>
            <Social {...link} className={classNames('sb-component-social-fill', 'text-base', inMobileMenu ? 'p-5' : 'p-4')} />
        </li>
    ));
}

function mapMaxWidthStyles(width) {
    switch (width) {
        case 'narrow':
            return 'max-w-7xl';
        case 'wide':
            return 'max-w-screen-2xl';
        case 'full':
            return 'max-w-full';
        default:
            return null;
    }
}