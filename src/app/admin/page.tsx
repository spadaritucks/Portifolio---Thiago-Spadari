"use client"
import '@/Assets/css/pages-styles/admin.css'
import Input from '@/components/inputs'
import Modal from '@/components/modal'
import { useEffect, useRef, useState } from 'react'
import { Tecnologies } from './tecnologies'
import Image from 'next/image'
import { createProject, deleteProject, getProjects, updateProject } from '../api/projects/request'
import Link from 'next/link'
import { createUser, deleteUser, getUsers, updateUser } from '../api/users/request'
import { UserProps } from '../api/users/api'



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
    handleInputValueProject?: () => void
    handleInputValueUser?: () => void
}


export default function Admin() {



    const [modalCreateProjectOpen, setModalCreateProjectOpen] = useState<boolean>(false)
    const [modalUpdateProjectOpen, setModalUpdateProjectOpen] = useState<boolean>(false)
    const [modalCreateUserOpen, setModalCreateUserOpen] = useState<boolean>(false)
    const [modalUpdateUserOpen, setModalUpdateUserOpen] = useState<boolean>(false)
    const [modalDescription, setDescription] = useState<boolean>(false)
    const [modalResponse, setModalResponse] = useState<boolean>(false)
    const [projects, setProjects] = useState<ProjectsProps[]>([])
    const [projectId, setProjectId] = useState<number>();
    const [userId, setUserId] = useState<number>();
    const [technologies, setTechnologies] = useState<ProjetosTechnologies[]>([])
    const formRef = useRef<HTMLFormElement>(null)
    const [users, setUsers] = useState<UserProps[]>([])


    const handleCreateProjectModal = () => {
        setModalCreateProjectOpen(true)
        setModalUpdateProjectOpen(false)
    }

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        if (!token) {
            window.location.href = '/login'
        }
    }, [])

    const handleLogout = () => {
        sessionStorage.removeItem('token')
        window.location.href = '/login'
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

    const handleCreateUserModal = () => {
        setModalCreateUserOpen(true)
        setModalUpdateUserOpen(false)
    }

    const handleUpdateUserModal = (id: number) => {
        if (modalCreateUserOpen && userId === id) {
            return;
        }
        setUserId(id)
        setModalUpdateUserOpen(true)
        setModalCreateUserOpen(false)
    }




    const projectDescription = projects.find(project => project.id === projectId) //Responsavel por filtar a descrição para abertura da modal


    useEffect(() => {
        if (projectId && modalUpdateProjectOpen) {
            handleInputValueProject();
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

        const fetchUsers = async () => {
            const response = await getUsers()
            if (response) {
                setUsers(response.users || [])
            } else {
                setUsers([])
            }
        }
        fetchUsers()

    }, [])


    const handleSubmitProject = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (formRef.current) {
            const formdata = new FormData(formRef.current)

            console.log(formdata)
            const response = await createProject(formdata)
            if (response) {
                if (response.status === false) {
                    alert(response.message)
                } else {
                    alert(response.message)
                }
            }

        }
    }

    const handleSubmitUpdateProject = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (projectId) {
            console.log(projectId)
            if (formRef.current) {
                const formdata = new FormData(formRef.current)

                const response = await updateProject(projectId, formdata)
                if (response) {
                    if (response.status === false) {
                        alert(response.message)
                    } else {
                        alert(response.message)
                    }
                }
            }
        }

    }

    const handleInputValueProject = () => {
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


    const handleSubmitDeleteProject = async (id: number) => {

        const response = await deleteProject(id)
        if (response) {
            if (response.status === false) {
                alert(response.message)
            } else {
                alert(response.message)
            }
        }

    }

    const handleSubmitCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if(formRef.current){
            const formdata = new FormData(formRef.current)
            const response = await createUser(formdata)
            if(response){
                if(response.status === false){
                    alert(response.message)
                }else{
                    alert(response.message)
                }
            }
        }
    }

    const handleSubmitUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(userId){
            if(formRef.current){
                const formdata = new FormData(formRef.current)
                const response = await updateUser(userId, formdata)
                if(response){
                    if(response.status === false){
                        alert(response.message)
                    }else{
                        alert(response.message)
                    }
                }
            }
        }
    }  

    const handleSubmitDeleteUser = async (id: number) => {
        const response = await deleteUser(id)
        if(response){
            if(response.status === false){
                alert(response.message)
            }else{
                alert(response.message)
            }
        }
    }

    const handleInputValueUser = () => {
        const form = formRef.current
        const user = users.find(user => user.id === userId)
        if(user && form){
            (form['name'] as unknown as HTMLInputElement).value = user.name.toString();
            (form['email'] as unknown as HTMLInputElement).value = user.email.toString();
        }
    }





    const ProjectForm = ({ functionSubmit, handleInputValueProject }: FormProps) => {


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

    const UserForm = ({ functionSubmit, handleInputValueUser }: FormProps) => {
        if (functionSubmit) {
            return (
                <form onSubmit={functionSubmit} ref={formRef}>
                    <Input label='Nome do Usuario' type='text' name='name' />
                    <Input label='Email do Usuario' type='email' name='email' />
                    <Input label='Senha do Usuario' type='password' name='password' />
                    <button type='submit' style={{ gridColumn: '1 / -1' }}>Enviar</button>
                </form>
            )
        }
    }

    return (
        <section className="main-projetos">
            <h1>Gerenciador de Projetos</h1>
            {modalCreateProjectOpen &&
                <Modal title="Criar Projeto"
                    children={<ProjectForm handleInputValueProject={handleInputValueProject}
                        functionSubmit={handleSubmitProject} />}
                    modalOpen={modalCreateProjectOpen}
                    modalClose={() => setModalCreateProjectOpen(false)} />}

            <div className="project-operations">
                <div className="operation-buttons">
                    <button type='button' onClick={handleCreateProjectModal} disabled={modalUpdateProjectOpen || modalCreateProjectOpen} >Adicionar Projeto</button>
                    <button type='button' onClick={handleLogout}>Sair</button>
                </div>
                {modalUpdateProjectOpen &&
                    <Modal title="Editar Projeto" children={<ProjectForm
                        handleInputValueProject={handleInputValueProject}
                        functionSubmit={(e) => handleSubmitUpdateProject(e)} />}
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
                                {project.project_image ? <td><Image alt='' width={100} height={50} src={project.project_image} /></td> : null}
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
                                    <button onClick={() => handleSubmitDeleteProject(project.id)} disabled={modalUpdateProjectOpen || modalCreateProjectOpen || modalDescription}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>

            <div className='main-users'>
                {modalCreateUserOpen &&
                    <Modal title="Criar Usuario" children={<UserForm handleInputValueUser={handleInputValueUser} functionSubmit={handleSubmitCreateUser} />}
                        modalOpen={modalCreateUserOpen}
                        modalClose={() => setModalCreateUserOpen(false)} />}

                {modalUpdateUserOpen &&
                    <Modal title="Editar Usuario" children={<UserForm handleInputValueUser={handleInputValueUser} functionSubmit={handleSubmitUpdateUser} />}
                        modalOpen={modalUpdateUserOpen}
                        modalClose={() => setModalUpdateUserOpen(false)} />}

                <h2>Painel de Usuarios</h2>
                <table className='users-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome do Usuario</th>
                            <th>Email</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className='action-table-buttons'>
                                    <button onClick={() => handleCreateUserModal()}>Criar</button>
                                    <button onClick={() => handleUpdateUserModal(user.id)} disabled={modalUpdateUserOpen || modalCreateUserOpen ||  modalDescription || modalCreateProjectOpen}>Editar</button>
                                    <button onClick={() => handleSubmitDeleteUser(user.id)} disabled={modalUpdateUserOpen || modalCreateUserOpen || modalDescription || modalCreateProjectOpen }>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </section>
    )
}
