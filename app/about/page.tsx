'use client'
import Document from '@/app/[room]/page'
import { useAuth } from '@/hooks/useAuth'
import { useDraft } from '@/hooks/useDraft'
import { Button, useDisclosure } from '@nextui-org/react'
import { uniqueId } from 'lodash'

export default function AboutPage() {

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const draft = useDraft()

  return (
    <>
      <div>{draft?.content}</div>
      <Button onPress={onOpen}>asdf</Button>
      <Document room={"serDetail.uid"} isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  )
}
