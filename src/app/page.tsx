'use client'
import Image from "next/image";
import '@/app/home.css'
import { MainLayout } from "@/layouts/mainLayout";
import Link from "next/link";
import foto from '../../public/programador.png'
import linkedinIcon from '../../public/linkedin.png'
import whatsappIcon from '../../public/whatsaap.png'
import githubIcon from '../../public/github.png'
import typescriptIcon from '../../public/typescript.png'
import htmlIcon from '../../public/html.png'
import cssIcon from '../../public/css.png'
import nextJsIcon from '../../public/nextjs.png'
import laravelIcon from '../../public/laravel.png'
import phpIcon from '../../public/php.png'
import reactIcon from '../../public/react.png'
import nodeJs from '../../public/NODEJS.jpg'
import imoogiImage from '../../public/Projeto IMOOGI.png'
import { ProjectCard } from "@/components/projectCard";





export default function Home() {
  return (
    <MainLayout>
      <section className="menu" id="menu">
        <div className="home-presentation">
          <h1 className="home-title">Full Stack Developer</h1>
          <p className="home-text-presentation">
            Ola, me chamo Thiago Spadari, desenvolvedor full-stack, 21 anos, tenho
            experiencia em trabalhar com interfaces agradaveis e responsivas junto com
            aplicações que dão vida e funcionalidades para o seu sistema, aumentando a qualidade
            e produtividade do seu negocio
          </p>
          <div className="contact-area">
            <Link href=''><Image src={linkedinIcon} width={60} height={60} className="contact-icon" alt=""></Image></Link>
            <Link href=''><Image src={whatsappIcon} width={60} height={60} className="contact-icon" alt=""></Image></Link>
            <Link href=''><Image src={githubIcon} width={60} height={60} className="contact-icon" alt=""></Image></Link>
          </div>
        </div>
        <Image src={foto} className="dev-image" alt=""></Image>
      </section>
      <section className="sobre-mim-area" id="sobre-min-area">
        <h1>Sobre mim</h1>
        <div className="descricao-sobre-mim">
          <div className="tecnologias">
            <h2>Tecnologias</h2>
            <div className="tech-container">
              <Image src={typescriptIcon} className="tecnology-icon" alt="" ></Image>
              <Image src={nodeJs} className="tecnology-icon" alt="" ></Image>
              <Image src={reactIcon} className="tecnology-icon" alt="" ></Image>
              <Image src={nextJsIcon} className="tecnology-icon" alt="" ></Image>
              <Image src={phpIcon} className="tecnology-icon" alt="" ></Image>
              <Image src={laravelIcon} className="tecnology-icon" alt="" ></Image>
            </div>
          </div>
          <div className="competencias">
            <h2>Competencias</h2>
            <ul className="competencias-list">
              <li>Cursando Engenharia da Computação 8/10</li>
              <li>Desevolvedor Full-Stack</li>
              <li>Dominio do Ingles - Nivel C1</li>
              <li>Capacidade em aprender novas tecnologias e aplicar-las rapidamente</li>
            </ul>
          </div>
        </div>

      </section>
      <section className="project-section" id="project-section">
        <h1>Meus Projetos</h1>
        <div className="project-container">
          <ProjectCard projectImage={imoogiImage} technologies={[{src: typescriptIcon},{src: nextJsIcon},{src: phpIcon},
            {src: laravelIcon}]} title="Site + Sistema de Administração" company="ACADEMIAS IMOOGI" description=" Responsável por criar e realizar a manutenção do site/sistema de administração da empresa em ambas as vertentes,
              front-end e back-end utilizando ferramentas como NextJS/TypeScript e PHP/Laravel.
              Com esse projeto, foi possível realizar gerenciamento envolvendo planos, usuários, modalidades
              e unidades da empresa cercado por um sistema de autenticação. No lado não-autenticado, está um site institucional
              voltado para divulgação da empresa." githubLink1="https://github.com/spadaritucks/ACADEMIAS-IMOOGI---FRONT-END-NEXTJS"
              githubLink2="https://github.com/spadaritucks/ACADEMIAS-IMOOGI---BACK-END---LARAVEL-PHP" projectLink="https://academiasimoogi.com.br"/>
             
        </div>
      </section>
    </MainLayout>
  );
}
