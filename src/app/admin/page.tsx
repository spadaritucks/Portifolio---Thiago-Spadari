"use client"
import '@/Assets/css/pages-styles/admin.css'
import Input from '@/components/inputs'
import Modal from '@/components/modal'
import { useEffect, useRef, useState } from 'react'
import { Tecnologies } from './tecnologies'
import Image from 'next/image'
import { createProject, deleteProject, getProjects, updateProject } from '../api/projects/request'
import Link from 'next/link'


interface ProjectsProps {
    id: number;
    title: string;
    project_image: string | null;
    company: string;
    description: string;
    git_link_1: string;
    git_link_2: string | null; // Permite null
    project_link: string | null; // Permite null
}

interface ProjetosTechnologies {

    id: number
    project_id: number | null
    technologies: string
}
interface FormProps {
    functionSubmit?: (e: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
    handleValueInput: () => void

}

export default function Admin() {

    const [modalCreateProjectOpen, setModalCreateProjectOpen] = useState<boolean>(false)
    const [modalUpdateProjectOpen, setModalUpdateProjectOpen] = useState<boolean>(false)
    const [modalDescription, setDescription] = useState<boolean>(false)
    const [modalResponse, setModalResponse] = useState<boolean>(false)
    const [projects, setProjects] = useState<ProjectsProps[]>([])
    const [projectId, setProjectId] = useState<number>();
    const [technologies, setTechnologies] = useState<ProjetosTechnologies[]>([])
    const formRef = useRef<HTMLFormElement>(null)

    const handleCreateProjectModal = () => {
        setModalCreateProjectOpen(true)
        setModalUpdateProjectOpen(false)
    }


    const handleUpdateProjectModal = (id: number) => {
        if (modalCreateProjectOpen && projectId === id) {
            return;
        }
        setProjectId(id)
        setModalUpdateProjectOpen(true)
        setModalCreateProjectOpen(false)

        console.log(projectId)
    }

    const handleDescriptionModal = (id: number) => {
        setDescription(true)
        setProjectId(id)
    }


    const ModalResponse = (response: { status: boolean, message: string, project: {} }) => {
        return (
            <Modal title='Mensagem' children={<p>{response.message}</p>} modalOpen={modalResponse} modalClose={() => setModalResponse(false)} />
        )
    }

    const projectDescription = projects.find(project => project.id === projectId) //Responsavel por filtar a descrição para abertura da modal


    useEffect(() => {
        if (projectId && modalUpdateProjectOpen) {
            handleValueInput();
        }
    }, [projectId]);

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await getProjects()
            if (response) {
                setProjects(response.projetos || [])
                setTechnologies(response.technologies || [])
            } else {
                setProjects([])
            }
        }
        fetchProjects()


    }, [])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (formRef.current) {
            const formdata = new FormData(formRef.current)

            console.log(formdata)
            const response = await createProject(formdata)
            setModalResponse(true)
            if (response && response.project) {
                setProjects(prev => [...prev, response.project]);
                if (modalResponse) {
                    ModalResponse({status: response.status, message: response.message, project: response.project})
                }
            }

        }
    }

    const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (projectId) {
            console.log(projectId)
            if (formRef.current) {
                const formdata = new FormData(formRef.current)

                const response = await updateProject(projectId, formdata)
                setModalResponse(true)
                if (response && response.project) {
                    setProjects(prev => [...prev, response.project]);
                    if (modalResponse) {
                        ModalResponse({status: response.status, message: response.message, project: response.project})
                    }
                }
            }
        }

    }

    const handleValueInput = () => {
        const form = formRef.current
        const project = projects.find(project => project.id === projectId)

        if (projectId && project && form) {
            const checkboxes = form['tecnologies[]'] as NodeListOf<HTMLInputElement>; // Corrigido para NodeListOf
            const projectTechnologies = technologies.filter(tech => tech.project_id === projectId).map(tech => tech.technologies);

            checkboxes.forEach(checkbox => {
                checkbox.checked = projectTechnologies.includes(checkbox.value)
            });
            (form['title'] as unknown as HTMLInputElement).value = project.title.toString();
            (form['company'] as unknown as HTMLInputElement).value = project.company.toString();
            (form['description'] as unknown as HTMLInputElement).value = project.description.toString();
            (form['git_link_1'] as unknown as HTMLInputElement).value = project.git_link_1.toString();
            project.git_link_2 ? (form['git_link_2'] as unknown as HTMLInputElement).value = project.git_link_2.toString() : ""
            project.project_link ? (form['project_link'] as unknown as HTMLInputElement).value = project.project_link.toString() : ""

        }
    }


    const handleDeleteSubmit = async (id: number) => {

        const response = await deleteProject(id)
        if (response && response.project) {
            setProjects(prev => [...prev, response.project]);
        }

    }





    const ProjectForm = ({ functionSubmit, handleValueInput }: FormProps) => {


        if (functionSubmit) {

            return (
                <form onSubmit={functionSubmit} ref={formRef}>
                    <div className='checkboxes-content' style={{ gridColumn: '1 / -1' }}>
                        {Tecnologies.map(tech => (
                            <Input label={tech.tecnologia} type='checkbox' value={tech.filename.src} name='tecnologies[]' />
                        ))}
                    </div>
                    <Input label='Imagem do Projeto' type='file' name='project_image' />
                    <Input label='Titulo do Projeto' type='text' name='title' />
                    <Input label='Cliente' type='text' name='company' />
                    <Input label='Descrição do Projeto' type='text' name='description' />
                    <Input label='Link Repositorio GIT' type='text' name='git_link_1' />
                    <Input label='Link Repositorio GIT 2 (Opcional)' type='text' name='git_link_2' />
                    <Input label='Link do Projeto (Opcional)' type='text' name='project_link' />

                    <button type='submit' style={{ gridColumn: '1 / -1' }}>Criar</button>
                </form>
            )
        }
    }

    return (
        <section className="main-projetos">
            <h1>Gerenciador de Projetos</h1>
            {modalCreateProjectOpen &&
                <Modal title="Criar Projeto"
                    children={<ProjectForm handleValueInput={handleValueInput}
                        functionSubmit={handleSubmit} />}
                    modalOpen={modalCreateProjectOpen}
                    modalClose={() => setModalCreateProjectOpen(false)} />}

            <div className="project-operations">
                <button type='button' onClick={handleCreateProjectModal} disabled={modalUpdateProjectOpen || modalCreateProjectOpen} >Adicionar Projeto</button>
                {modalUpdateProjectOpen &&
                    <Modal title="Editar Projeto" children={<ProjectForm
                        handleValueInput={handleValueInput}
                        functionSubmit={(e) => handleUpdateSubmit(e)} />}
                        modalOpen={modalUpdateProjectOpen}
                        modalClose={() => setModalUpdateProjectOpen(false)} />}

                <table className='project-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Imagem do Projeto</th>
                            <th>Technologies</th>
                            <th>Title</th>
                            <th>Company</th>
                            <th>Description</th>
                            <th>Git_Link_1</th>
                            <th>Git_Link_2</th>
                            <th>Project_Link</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>

                        {projects.map(project => (

                            <tr key={project.id}>

                                <td>{project.id}</td>
                                {project.project_image ? <td><Image alt='' width={150} height={50} src={project.project_image} /></td> : null}
                                <td>
                                    {technologies.filter(tech => tech.project_id === project.id).map(tech => (
                                        <Image alt='' width={30} height={30} src={tech.technologies}></Image>
                                    ))}
                                </td>
                                <td>{project.title}</td>
                                <td>{project.company}</td>
                                <td ><button onClick={() => handleDescriptionModal(project.id)} disabled={modalDescription}>Exibir Descrição</button>
                                    {modalDescription && <Modal title="Descrição" children={<p>{projectDescription?.description}</p>}
                                        modalOpen={modalDescription}
                                        modalClose={() => setDescription(false)} />}
                                </td>
                                <td><Link href={project.git_link_1} className='table-links'>Link Repositorio GIT</Link></td>
                                <td>{project.git_link_2 ? <Link href={project.git_link_2} className='table-links'>Link Repositorio GIT(2)</Link> : <p>N/A</p>}</td>
                                <td>{project.project_link ? <Link href={project.project_link} className='table-links'>Link Projeto</Link> : <p>N/A</p>}</td>
                                <td className='action-table-buttons'>
                                    <button onClick={() => handleUpdateProjectModal(project.id)} disabled={modalUpdateProjectOpen || modalCreateProjectOpen || modalDescription}>Editar</button>
                                    <button onClick={() => handleDeleteSubmit(project.id)} disabled={modalUpdateProjectOpen || modalCreateProjectOpen || modalDescription}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </section>
    )
}
