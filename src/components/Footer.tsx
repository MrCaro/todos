import Image from "next/image"
import githubIcon from '../../public/github.svg'
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-secondary mt-12 py-8">
      <div className="container mx-auto p-4 flex flex-wrap justify-between items-center"> 
        <p className="text-xs">
          © copyright 2023. All rights reserved
        </p>
        <Link href="https://github.com/MrCaro/todos/tree/main" target="_blank" rel="noopener noferrer">
          <Image src={githubIcon} width={24} height={24} loading="lazy" alt="get the code" />
        </Link>
      </div>
    </footer>
  )
}