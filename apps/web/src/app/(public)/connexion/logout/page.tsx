'use client'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { AuthCard } from '@mec/web/app/(public)/connexion/AuthCard'
import { useState } from 'react'
import { Breadcrumbs } from '@mec/web/ui/Breadcrumbs'

const SignoutPage = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const onConfirm = () => {
    setIsLoading(true)
    signOut()
      .catch(() => {
        // TODO Sentry
      })
      .finally(() => {
        router.replace('/')
      })
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
      </AuthCard>
    </>
  )
}

export default SignoutPage
