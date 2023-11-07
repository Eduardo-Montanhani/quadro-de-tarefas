import { useContext } from 'react'
import { Container } from "./styles";
import { TarefaContext } from '../../contexts/tarefaContext';
import axios from 'axios';

//para realizar a tipagem
interface PropsListTarefas {
    abrirModal: () => void;
}

export function ListTarefas(props: PropsListTarefas) {
    //chamou o funEditarTarefa do Context
    const { tarefas, funEditarTarefa } = useContext(TarefaContext)



    return (
        <>
            <Container>
                <ul>
                    <h3>
                        Quadro 1
                    </h3>

                    {
                        tarefas.map((tarefa, index) => {
                            return (
                                <li
                                    key={index}
                                >
                                    <div>
                                        <h4>
                                            {tarefa.titulo}
                                        </h4>
                                        <p>{tarefa.descricao}</p>
                                    </div>
                                    <div>
                                        <button type='button'
                                            onClick={() => {
                                                //o editar é para ajuste tecnico
                                                funEditarTarefa({ editar: true, tarefa: tarefa })
                                                props.abrirModal();
                                            }}
                                        >
                                            Editar
                                        </button>
                                    </div>

                                </li>
                            )
                        })
                    }

                </ul>
            </Container>
        </>
    )
}
