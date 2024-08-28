'use client'
import Image from "next/image";
import '@/app/home.css'
import { MainLayout } from "@/layouts/mainLayout";
import Link from "next/link";
import foto from '../../public/foto_perfil.jpg'


export default function Home() {
  return (
    <MainLayout>
      <section className="menu">
        <div className="home-presentation">
          <h1 className="home-title">Full Stack Developer</h1>
          <p className="home-text-presentation">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic non odit nemo numquam incidunt
            maiores vitae eius accusantium.
            Obcaecati ipsum sequi id quis dicta quod. Consequuntur expedita alias corporis placeat!
          </p>
          <button className="contact-button"><Link href = ''>Contact me</Link></button>
        </div>
        <div className="home-image">
          <div className="circle">
            <Image src = {foto} className="dev-image" alt="" width={300} height={300}></Image>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
