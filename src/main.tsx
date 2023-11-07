import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Model, createServer } from 'miragejs'
//main é o nosso backend
createServer({
    models: {
        tarefas: Model
    },
    routes() {// rora chamada pelo get, quando for chamada retorna todos os atributos da tarefas
        this.get('/api/tarefas', () => {
            return this.schema.all('tarefas')
        })
        // inserir no banco de dados
        this.post('/api/tarefas', (schema, request) => {
            const data = JSON.parse(request.requestBody)
            return schema.db.tarefas.insert(data)
        })
        this.put('/api/tarefas', (schema, request) => {
            const data = JSON.parse(request.requestBody)

            return schema.db.tarefas.update(data.id, data)
        })
        //fazer o delete aqui mudando os parametros
    }
})


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
