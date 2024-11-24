'use client'
import { Button, useDisclosure } from '@nextui-org/react'

import Document from '@/app/[room]/page'
import { useAuth } from '@/hooks/useAuth'

export default function AboutPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const currentUser = useAuth()

  if (!currentUser) return null

  return (
    <>
      <Button onPress={onOpen}>asdf</Button>
      <Document isOpen={isOpen} room={currentUser.uid} onOpenChange={onOpenChange} />
    </>
  )
}
