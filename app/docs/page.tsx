'use client'

import { Card, Image, CardBody, CardFooter } from "@nextui-org/react";

export default function DocsPage() {
  return (
    <Card className="w-full max-w-[520px]" >
      <CardBody className="flex flex-row flex-wrap p-0 sm:flex-nowrap">
        <Image
          removeWrapper
          alt="Acme Creators"
          className="h-auto w-full flex-none object-cover object-top md:w-48"
          src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/hero-card-complete.jpeg"
        />
        <div className="px-4 py-5">
          <h3 className="text-large font-medium">Become an Acme Creator!</h3>
          <div className="flex flex-col gap-3 pt-2 text-small text-default-400">
            <p>
              Visit creators.acme.com to sign up today and start earning credits from your fans and
              followers.
            </p>
            <p>Acme supports YouTube, Twitch, Vimeo and more!</p>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
