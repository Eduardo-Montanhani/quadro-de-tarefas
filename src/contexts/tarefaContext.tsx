import axios from "axios";
import {
    ReactNode,
    createContext,
    useState,
    useEffect
} from "react";
// antes do banco
interface Tarefas {
    titulo: string;
    descricao: string;
}
//depois do banco
interface TarefasWithID {
    id: string;
    titulo: string;
    descricao: string;
}
//feito para editar tarefa
interface DataEditarTarefa {
    editar: boolean;
    tarefa: TarefasWithID | null;
}
// função para omitir os atributos que não quer utilizar
//type TarefaExample = Omit<TarefasWithID, 'id'>

interface PropsTarefaContext {
    tarefas: Array<TarefasWithID>;
    //exemplo de fazer delete
    updateTarefa: (tarefas: TarefasWithID)=> Promise<void>
    createTarefa: (tarefas: Tarefas) => Promise<void>;
    funEditarTarefa: (tarefas: DataEditarTarefa) => void;
    funSetTarefasDefault: () => void;
    editarTarefa: DataEditarTarefa;

}
export const TarefaContext = createContext(
    {} as PropsTarefaContext
)

interface PropsTarefaProvider {
    children: ReactNode
}
// export function TarefasProvider(props: PropsTarefaProvider) {
export function TarefasProvider({ children }: PropsTarefaProvider) {

    const [tarefas, setTarefas] = useState([])

    const [editarTarefa, setEditarTarefas] = useState<DataEditarTarefa>({editar:false, tarefa:null})

    useEffect(() => {
        axios.get('/api/tarefas')
            .then((res) => {
                console.log(res.data)
                setTarefas(res.data.tarefas)
            })
    }, [])

    async function createTarefa(data: Tarefas) {

        const resposta = await axios.post('/api/tarefas', data)

        axios.get('/api/tarefas')//5min
            .then((res) => {
                setTarefas(res.data.tarefas)
            })
    }
    async function updateTarefa(data: TarefasWithID) {
        //para atualiar utiliza put
        const resposta = await axios.put('/api/tarefas', data)

        axios.get('/api/tarefas')//5min
            .then((res) => {
                setTarefas(res.data.tarefas)
            })
    }
    //volta por padrão vazio
    function  funSetTarefasDefault (){
        setEditarTarefas({editar:false, tarefa:null})
    }

    //seta a tarefa que vem do editar tarefa
    function  funEditarTarefa (data: DataEditarTarefa){
        setEditarTarefas(data)
    }




    return (
        <TarefaContext.Provider value={{
            tarefas,
            createTarefa,
            editarTarefa,
            funEditarTarefa,
            funSetTarefasDefault,
            updateTarefa

        }}>
            {children}
        </TarefaContext.Provider>
    )
}
