'use client'
import { withTrpc } from '@mec/web/withTrpc'
import { trpc } from '@mec/web/trpc'
import { useRouter } from 'next/navigation'

export const AcknowledgeOnboardingButton = withTrpc(() => {
  // FIXME useRouter() makes storybook fail
  const router = useRouter()
  const { mutate, isLoading, isSuccess, isError } =
    trpc.user.acknowledgeOnboarding.useMutation({
      onSuccess: () => {
        router.refresh()
      },
    })

  const onClick = () => {
    mutate()
  }
  const disabled = isLoading || isSuccess

  return (
    <>
      {isError ? (
        <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-6v">
          <p>Une erreur est survenue, merci de réessayer</p>
        </div>
      ) : null}
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="fr-btn fr-mb-0"
      >
        Accéder à mon espace
      </button>
    </>
  )
})
