'use client'
import { signOut } from 'next-auth/react'
import { AuthCard } from '@mec/web/app/(public)/connexion/AuthCard'
import { useState } from 'react'
import { Breadcrumbs } from '@mec/web/ui/Breadcrumbs'
import Link from 'next/link'
import { Routes } from '@mec/web/app/routing'

const SignoutPage = () => {
  const [isLoading, setIsLoading] = useState(false)

  const onConfirm = () => {
    setIsLoading(true)
    signOut({ redirect: true, callbackUrl: '/' })
  }

  return (
    <>
      <Breadcrumbs currentPage="Déconnexion" />
      <AuthCard>
        <h2>Déconnexion</h2>
        <p>Êtes-vous sur de vouloir vous déconnecter&nbsp;?</p>
        <ul className="fr-btns-group">
          <li>
            <button
              type="button"
              className="fr-btn"
              disabled={isLoading}
              onClick={onConfirm}
            >
              Se déconnecter
            </button>
          </li>
        </ul>
        <div className="fr-grid-row fr-grid-row--center">
          <Link href={Routes.MonEspace.Index}>Retour à mon espace</Link>
        </div>
      </AuthCard>
    </>
  )
}

export default SignoutPage
