'use client'
import React from 'react';
import Image, { StaticImageData } from 'next/image';
import '@/Assets/css/component-styles/projectCard.css'
import linkIcon from '../../public/linkIcon.jpg'
import githubIcon from '../../public/github.png'
import Link from 'next/link';

interface ProjectCardProps {
    projectImage: string | null;
    technologies: { src: string; }[];
    title: string;
    company: string;
    description: string;
    githubLink1: string;
    githubLink2?: string | null;
    projectLink?: string | null;
}



export const ProjectCard: React.FC<ProjectCardProps> = ({ projectImage, technologies, title, company, description, githubLink1,githubLink2, projectLink }) => {
    return <div className="project-card">
        {projectImage ? <Image src={projectImage} alt="" className="project-image" width={400} height={200}></Image> : null}
        <div className="project-tecnology">
            {technologies.map((tech, index) => (
                <Image key={index} src={tech.src} className="project-tech-icon" alt='' width={40} height={40} />
            ))}
        </div>
        <h2 className="project-title">{title}</h2>
        <h3 className="project-company">Tipo de Projeto : {company}</h3>
        <p className="project-text">{description}</p>

        <div className='links-project'>
            <Link href= {githubLink1}><Image src={githubIcon} width={50} height={50} className="contact-icon" alt=""></Image></Link>
            {githubLink2 ? <Link href= {githubLink2}><Image src={githubIcon} width={50} height={50} className="contact-icon" alt=""></Image></Link> : ''}
            {projectLink ? <Link href= {projectLink}><Image src={linkIcon} width={50} height={50} className="contact-icon" alt=""></Image></Link> : ''}
        </div>
    </div>;
}