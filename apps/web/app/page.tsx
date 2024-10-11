import { Header } from "../components/Header"
import React from "react"
import { ComponentsListMainPage } from "../components/ComponentsListMainPage"
import { Metadata } from "next"
import Head from "next/head"

export const metadata: Metadata = {
  title: "Home | Component Community",
  description: "Discover and share code components with the community.",
}

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Home | Component Community</title>
      </Head>
      <Header />
      <div className="container mx-auto mt-20">
        <ComponentsListMainPage />
      </div>
    </>
  )
}
