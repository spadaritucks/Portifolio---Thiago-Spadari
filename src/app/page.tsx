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
import javascriptIcon from '../../public/JavascriptIcon.png'
import nextJsIcon from '../../public/nextjs.png'
import laravelIcon from '../../public/laravel.png'
import phpIcon from '../../public/php.png'
import reactIcon from '../../public/react.png'
import nodeJs from '../../public/NODEJS.jpg'
import imoogiImage from '../../public/Nova imoogi.png'
import imoogiImageAncient from '../../public/projeto antigo imoogi.png'
import portifolioImage from '../../public/portifolio-image.png'
import { ProjectCard } from "@/components/projectCard";
import { useState } from "react";





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
            <Link href='https://www.linkedin.com/in/thiago-spadari-'><Image src={linkedinIcon} width={60} height={60} className="contact-icon" alt=""></Image></Link>
            <Link href='https://api.whatsapp.com/send/?phone=11960599793&text&type=phone_number&app_absent=0'><Image src={whatsappIcon} width={60} height={60} className="contact-icon" alt=""></Image></Link>
            <Link href='https://github.com/spadaritucks'><Image src={githubIcon} width={60} height={60} className="contact-icon" alt=""></Image></Link>
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
          <ProjectCard projectImage={portifolioImage} technologies={[{ src: typescriptIcon }, { src: nextJsIcon }]} title="Portifolio - Thiago Spadari"
            company="Pessoal - Portifolio Divulgação" description="Meu portifolio foi feito para divulgar o meu trabalho e minhas competencias, más tambem para despertar interesse
              do publico" githubLink1="https://github.com/spadaritucks/Portifolio---Thiago-Spadari" projectLink="https://portifolio-thiago-spadari.vercel.app" />


          <ProjectCard projectImage={imoogiImage} technologies={[{ src: typescriptIcon }, { src: nextJsIcon }, { src: phpIcon },
          { src: laravelIcon }]} title="Site + Sistema de Administração" company=" Empresarial - ACADEMIAS IMOOGI" description=" Responsável por criar e realizar a manutenção do site/sistema de administração da empresa em ambas as vertentes, front-end e back-end utilizando ferramentas como NextJS/TypeScript e PHP/Laravel.
              Com esse projeto, foi possível realizar gerenciamento envolvendo planos, usuários, modalidades, aulas, sistema de agendamento e unidades da empresa, como também um painel do aluno cercado por um sistema de autenticação. No lado não-autenticado, está um site institucional voltado para divulgação da empresa." githubLink1="https://github.com/spadaritucks/ACADEMIAS-IMOOGI---FRONT-END-NEXTJS"
            githubLink2="https://github.com/spadaritucks/ACADEMIAS-IMOOGI---BACK-END---LARAVEL-PHP" projectLink="https://academiasimoogi.com.br"
          />

          <ProjectCard projectImage={imoogiImageAncient} technologies={[{ src: htmlIcon }, { src: cssIcon }, { src: javascriptIcon }, { src: phpIcon }]} title="Site + Sistema de Administração (Versão Antiga)"
            company="Empresarial - ACADEMIAS IMOOGI" description="Esse projeto trata-se da versão antiga do projeto Site + Sistema de Administração das ACADEMIAS IMOOGI, que foi inicialmente
          feito em HTML,CSS E Javascript no front-end e PHP no Back-end bem como o uso do AJAX para fazer as requisições HTTP para o servidor. Esse Projeto sofreu uma migração para as ferramentas
          NextJS/Typescript e PHP/Laravel e uma refatoração em toda sua estrutura, corrigindo problemas da versão anterior, e deixando o codigo mais limpo e pratico para reutilização e 
          manuntenções futuras" githubLink1="https://github.com/spadaritucks/Site-System-AcademiasIMOOGI---Version-1.0" />



        </div>
      </section>
    </MainLayout>
  );
}
