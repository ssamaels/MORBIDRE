import styled from "styled-components";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";

export default function Portfolio() {
  return (
    <>
      <Header />
      <div>
        <Link href="/portfolio/morbidre_illustrations">
          MORBIDRE ILLUSTRATIONS
        </Link>
        <div>
          <Image src="/ahflas/nx" alt="" width={20} height={20} />
          <Image src="/ahflas/nx" alt="" width={20} height={20} />
          <Image src="/ahflas/nx" alt="" width={20} height={20} />
        </div>
        <Link href="/portfolio/morbidre_designs">MORBIDRE DESIGN</Link>
        <div>
          <Image src="/ahflas/nx" alt="" width={20} height={20} />
          <Image src="/ahflas/nx" alt="" width={20} height={20} />
          <Image src="/ahflas/nx" alt="" width={20} height={20} />
        </div>
        <Link href="/portfolio/kidlit_illustrations">KIDLIT ILLUSTRATIONS</Link>
        <div>
          <Image src="/ahflas/nx" alt="" width={20} height={20} />
          <Image src="/ahflas/nx" alt="" width={20} height={20} />
          <Image src="/ahflas/nx" alt="" width={20} height={20} />
        </div>
        <Link href="/portfolio/collections">COLLECTIONS</Link>
        <div>
          <Image src="/ahflas/nx" alt="" width={20} height={20} />
          <Image src="/ahflas/nx" alt="" width={20} height={20} />
          <Image src="/ahflas/nx" alt="" width={20} height={20} />
        </div>
      </div>
    </>
  );
}
