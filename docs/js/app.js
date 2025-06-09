
    const schema = {
  "asyncapi": "2.6.0",
  "info": {
    "title": "Lockity - Comunicación MQTT",
    "version": "1.0.0",
    "description": "Comunicación MQTT para controlar cajones inteligentes. Topics con estructura: <ubicacion>/<id_locker>/<categoria>/<tipo>/[valor]. Funciones disponibles: abrir cajón, encender alarma, tomar foto, cambiar estado.\n"
  },
  "channels": {
    "{ubicacion}/{id_locker}/comand/toggle": {
      "subscribe": {
        "summary": "Comando para abrir el cajón",
        "description": "Este tópico recibe mensajes para abrir un cajón específico.  El mensaje debe contener el ID del usuario que realiza la solicitud y un valor fijo '1' que indica la acción de apertura. No requiere parámetros adicionales en el tópico. Ejemplo de uso: un usuario autorizado envía un comando para desbloquear y abrir el cajón.\n",
        "message": {
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "id_usuario",
              "valor"
            ],
            "properties": {
              "id_usuario": {
                "type": "string",
                "description": "Identificador único del usuario que solicita abrir el cajón.",
                "x-parser-schema-id": "<anonymous-schema-2>"
              },
              "valor": {
                "type": "integer",
                "enum": [
                  1
                ],
                "description": "Valor fijo que indica la acción de abrir el cajón (1 = abrir).",
                "x-parser-schema-id": "<anonymous-schema-3>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-1>"
          },
          "x-parser-message-name": "<anonymous-message-1>"
        }
      }
    },
    "{ubicacion}/{id_locker}/comand/alarm": {
      "subscribe": {
        "summary": "Comando para activar la alarma del cajón",
        "description": "Este tópico se utiliza para encender la alarma del cajón en caso de situaciones de seguridad o emergencia. El mensaje solo requiere un valor fijo '1' que indica activar la alarma. No se requieren parámetros adicionales ni en el tópico ni en el payload.\n",
        "message": {
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "value"
            ],
            "properties": {
              "value": {
                "type": "boolean",
                "description": "Valor boleano para dar la señal.",
                "x-parser-schema-id": "<anonymous-schema-5>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-4>"
          },
          "x-parser-message-name": "<anonymous-message-2>"
        }
      }
    },
    "{ubicacion}/{id_locker}/comand/picture": {
      "subscribe": {
        "summary": "Comando para tomar una foto",
        "description": "En este tópico se reciben comandos para activar la cámara integrada y tomar una fotografía del cajón o su entorno. El payload es un valor fijo '1' que activa la acción. Esta función puede utilizarse para auditoría o control visual remoto.\n",
        "message": {
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "value"
            ],
            "properties": {
              "value": {
                "type": "boolean",
                "description": "Valor boleano para dar la señal.",
                "x-parser-schema-id": "<anonymous-schema-7>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-6>"
          },
          "x-parser-message-name": "<anonymous-message-3>"
        }
      }
    },
    "{ubicacion}/{id_locker}/comand/change": {
      "subscribe": {
        "summary": "Comando para cambiar el estado del cajón",
        "description": "Este tópico recibe mensajes para modificar el estado operativo del cajón. El mensaje debe incluir el identificador del cajón y el nuevo estado, que puede ser uno de: 'open' (abierto), 'closed' (cerrado), 'error' (error), o 'maintense' (en mantenimiento). No se usan parámetros adicionales en el tópico.\n",
        "message": {
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "id_cajon",
              "estado"
            ],
            "properties": {
              "id_cajon": {
                "type": "string",
                "description": "Identificador único del cajón cuyo estado se desea cambiar.",
                "x-parser-schema-id": "<anonymous-schema-9>"
              },
              "estado": {
                "type": "string",
                "enum": [
                  "open",
                  "closed",
                  "error",
                  "maintense"
                ],
                "description": "Nuevo estado asignado al cajón.",
                "x-parser-schema-id": "<anonymous-schema-10>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-8>"
          },
          "x-parser-message-name": "<anonymous-message-4>"
        }
      }
    }
  },
  "x-parser-spec-parsed": true,
  "x-parser-api-version": 3,
  "x-parser-spec-stringified": true
};
    const config = {"show":{"sidebar":true},"sidebar":{"showOperations":"byDefault"}};
    const appRoot = document.getElementById('root');
    AsyncApiStandalone.render(
        { schema, config, }, appRoot
    );
  