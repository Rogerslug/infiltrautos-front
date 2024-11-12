// Este componente de React recupera la información del filtro de aire para autos mostrado en showDetails para pasarle la información al modelo de lenguaje de ejecución local 'https://localhost:5000/api/testRag POST' con el json requerido:
/* 
    {
        "message": "Necesito que me des una recomendación detallada del filtro de aire para auto",
        "temperature": "temperature_very_strict",
        "system": "system_infiltrautos",
        "token": "max_tokens_small",
        "model": "model_local_llama",
        "endpoint": "endpoint_LLM_local",
        "api_key": "api_key_local"
    } 

Json esperado: 
{
    "code": 200,
    "data": {
        "choices": [
            {
                "finish_reason": "stop",
                "index": 0,
                "logprobs": null,
                "message": {
                    "content": "¡Claro! Aquí te dejo una recomendación detallada del filtro de aire STP ST8040:\n\n**Nombre:** Filtro de Aire STP ST8040\n**Material:** Fibra Sintetica\n**Stock:** 100 unidades disponibles\n**Precio:** $109.00\n\nEste filtro de aire es ideal para automóviles con sistemas de combustible a gasolina o diesel, ya que proporciona una buena calidad del aire en el interior del vehículo. La fibra sintética es un material resistente y duradero, lo que garantiza que el filtro mantenga su eficacia durante mucho tiempo.\n\n**Características adicionales:**\n\n* Filtro de alta calidad para automóviles\n* Proporciona una buena calidad del aire en el interior del vehículo\n* Resistente a la corrosión y el desgaste\n* Compatible con sistemas de combustible a gasolina o diesel\n\nRecuerda que siempre es importante verificar la compatibilidad del filtro con tu modelo específico de auto antes de comprar. ¡Espero que esta información te sea útil!",
                    "role": "assistant"
                }
            }
        ],
        "created": 1728263038,
        "id": "chatcmpl-gtsdtizr7vjnuou4z1oq8",
        "model": "NikolayKozloff/Llama-3.2-1B-Instruct-Q8_0-GGUF/llama-3.2-1b-instruct-q8_0.gguf",
        "object": "chat.completion",
        "system_fingerprint": "NikolayKozloff/Llama-3.2-1B-Instruct-Q8_0-GGUF/llama-3.2-1b-instruct-q8_0.gguf",
        "usage": {
            "completion_tokens": 233,
            "prompt_tokens": 435,
            "total_tokens": 668
        }
    },
    "message": "Respuesta exitosa",
    "ok": true
}
*/
// rag.component.tsx

import React, { useState } from "react"
import IAirFilterRecomm from "../interfaces/AirFilterRecomm.interface"


// Componente para la recomendación del filtro de aire
const RAG = ({ ShowDetails }: any) => { // Cambiado 'showDetails' a 'product'
  const [responseMessage, setResponseMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const getRecommendation = async () => {
    setLoading(true)
    setError("")

    const message = "Da una recomendación personalizada al usuario del e-commerce basado en la siguiente información: Nombre: " + ShowDetails.name + ", Descripción: " + ShowDetails.description + ", Precio: " + ShowDetails.price  + "mxn, Tipo: " + ShowDetails.type + ", Material: " + ShowDetails.material + " Stock: " + ShowDetails.stock

    const requestBody = {
      "message": message,
    }

    try {
      const response = await fetch("http://localhost:5000/api/testGpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody)
      })

      console.log("response", response)

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: any = await response.json()
/*       console.log("data", data)
      console.log("data.data", data.data)
      console.log("data.data.data", data.data.data)
      console.log("data.data.data.choices[0].message.content", data.data.data.choices[0].message.content)
 */
      if (data && data.ok) {
        const messageContent = data.data.data.choices[0].message.content
        setResponseMessage(messageContent)
      } else {
        setError("No se pudo obtener una recomendación.");
      }
    } catch (err: any) {
      setError(`Error de conexión: ${err.message}`)
      console.log(err)
    }
    setLoading(false)
  }

  return (
    <div>
      <h2>Recomendación del Filtro de Aire</h2>
      {loading ? (
        <p>Cargando recomendación...</p>
      ) : responseMessage ? (

        <button onClick={getRecommendation}>
          <p>{responseMessage}</p>
        </button>
      ) : error ? (
        <div>
          <p style={{ color: "red" }}>Error al obtener la recomendación: </p>
          <p style={{ color: "red" }}>{error}</p>
        </div>
      ) : (
        <button onClick={getRecommendation}>
          Haga clic para obtener una recomendación del filtro de aire para {ShowDetails.name}        </button>
      )}
    </div>
  );
}

export default RAG