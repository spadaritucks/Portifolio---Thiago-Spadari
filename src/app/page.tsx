'use server'
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
import javaIcon from '@/../public/JavaIcon.png';
import angularIcon from '@/../public/AngularIcon.png';
import postgresIcon from '@/../public/postgreSQLIcon.png';
import mysqlIcon from '@/../public/mysql-logo.svg';
import prismaIcon from '@/../public/prismaIcon.png';
import imoogiImage from '../../public/Nova imoogi.png'
import imoogiImageAncient from '../../public/projeto antigo imoogi.png'
import portifolioImage from '../../public/portifolio-image.png'
import { ProjectCard } from "@/components/projectCard";
import { useState } from "react";
import { getProjects } from "./api/projects/request";





export default async function Home() {

  const response = await getProjects();
  const projects = response.projetos || [];
  const technologies = response.technologies || [];

  const projectOrder = projects.sort((a, b) => {
    if (a.company === 'Empresarial' && b.company !== 'Empresarial') return -1; // 'a' vem primeiro
    if (a.company !== 'Empresarial' && b.company === 'Empresarial') return 1;  // 'b' vem primeiro
    return 0; // mantém a ordem original se ambos forem iguais
  });





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
              <Image src={javaIcon} className="tecnology-icon" alt="" ></Image>
              <Image src={angularIcon} className="tecnology-icon" alt="" ></Image>
              <Image src={postgresIcon} className="tecnology-icon" alt="" ></Image>
              <Image src={mysqlIcon} className="tecnology-icon" alt="" ></Image>
              <Image src={prismaIcon} className="tecnology-icon" alt="" ></Image>
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
          {projectOrder.map((project) => {
            const technologiesFilter = technologies.filter(tech => tech.project_id === project.id);
            return (
              <ProjectCard 
                projectImage={project.project_image} 
                technologies={technologiesFilter.map(tech => ({ src: tech.technologies }))} 
                title={project.title} 
                company={project.company} 
                description={project.description} 
                githubLink1={project.git_link_1 || ''}
                githubLink2={project.git_link_2 || ''} 
                projectLink={project.project_link}
              />
            )
          })}
        </div>
      </section>
    </MainLayout>
  );
}
