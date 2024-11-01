'use client'
import { signIn, useSession } from 'next-auth/react'
import { MapTrifold } from '@phosphor-icons/react/dist/ssr'

import { Logo } from '../header'
import { XSearchMinimal } from '@/components/search/XSearch'
import { NavMenuItem, NavMenuItemProps } from '@/components/ui/NavMenuButton'
import GitHubStars from '@/components/GitHubStars'
import AuthenticatedProfileNavButton from '../../../components/AuthenticatedProfileNavButton'
import Link from 'next/link'

export const DesktopHeader: React.FC = () => {
  const { status } = useSession()

  const navListDefault: NavMenuItemProps[] = [
    {
      to: 'https://community.openbeta.io',
      label: 'Forums'
    },
    {
      to: '/about',
      label: 'About'
    },
    {
      to: 'https://opencollective.com/openbeta/contribute/t-shirt-31745',
      label: 'T-shirts'
    },
    {
      to: '/partner-with-us',
      label: 'Become a Partner'
    },
    {
      to: 'https://docs.openbeta.io',
      label: 'Docs'
    },
    {
      onClick: () => { void signIn('auth0', { callbackUrl: '/api/user/me' }) },
      label: 'Login',
      type: 'rounded-btn border bg-accent ring-0 border-b-2 border-b-neutral'
    }
  ]

  const unauthenticatedMenu = navListDefault.map(
    ({ onClick, label, to, type }: NavMenuItemProps, index) => (
      <NavMenuItem
        key={index}
        onClick={onClick}
        type={type}
        label={label}
        to={to}
      />)
  )

  unauthenticatedMenu.unshift(
    <GitHubStars key='gh-button' />
  )

  let nav
  switch (status) {
    case 'authenticated':
      nav = <AuthenticatedProfileNavButton isMobile={false} />
      break
    case 'loading':
      nav = (
        <>
          <div className='rounded-full bg-base-200 opacity-10 w-32 h-10' />
        </>
      )
      break
    default:
      nav = unauthenticatedMenu
  }

  return (
    <header className='hidden lg:flex items-center justify-between h-14'>
      <div className='flex items-center gap-6'>
        <Logo />
        <XSearchMinimal />
        <span className='text-secondary/80'>|</span>
        <Link href='/maps' className='flex items-center gap-1.5 whitespace-nowrap hover:underline hover:decoration-1 font-semibold'><MapTrifold size={20} />Maps</Link>
      </div>
      <div className='menu menu-horizontal rounded-box gap-2 px-0'>{nav}</div>
    </header>
  )
}
