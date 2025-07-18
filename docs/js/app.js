
    const schema = {
  "asyncapi": "2.6.0",
  "info": {
    "title": "Lockity - Comunicación MQTT",
    "version": "1.0.0",
    "description": "Comunicación MQTT para controlar cajones inteligentes. Topics con estructura: <ubicacion>/<id_locker>/<categoria>/<tipo>/[valor]. Funciones disponibles: abrir cajón, encender alarma, tomar foto, cambiar estado.\n"
  },
  "channels": {
    "{serial_number}/command/config": {
      "publish": {
        "summary": "Topic para configurar el locker",
        "description": "Topic para mandar la senal para que el locker realize la peticon de configuracion para el usuario\n",
        "message": {
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "value"
            ],
            "properties": {
              "value": {
                "type": "integer",
                "enum": [
                  1
                ],
                "description": "Valor fijo para dar la senal de request",
                "x-parser-schema-id": "<anonymous-schema-2>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-1>"
          },
          "x-parser-message-name": "<anonymous-message-1>"
        }
      }
    },
    "{serial_number}/command/toggle": {
      "publish": {
        "summary": "Comando para abrir el cajón",
        "description": "Este tópico recibe mensajes para abrir un cajón específico.  El mensaje debe contener el ID del usuario que realiza la solicitud y un valor fijo '1' que indica la acción de apertura. No requiere parámetros adicionales en el tópico. Ejemplo de uso: un usuario autorizado envía un comando para desbloquear y abrir el cajón.\n",
        "message": {
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "id_usuario",
              "id_drawer",
              "valor"
            ],
            "properties": {
              "id_usuario": {
                "type": "string",
                "description": "Identificador único del usuario que solicita abrir el cajón.",
                "x-parser-schema-id": "<anonymous-schema-4>"
              },
              "id_drawer": {
                "type": "string",
                "description": "Numero de compartimiento que se desea abrir.",
                "x-parser-schema-id": "<anonymous-schema-5>"
              },
              "valor": {
                "type": "integer",
                "enum": [
                  1,
                  0
                ],
                "description": "Valor fijo que indica la acción de abrir el cajón (1 = abrir).",
                "x-parser-schema-id": "<anonymous-schema-6>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-3>"
          },
          "x-parser-message-name": "<anonymous-message-2>"
        }
      }
    },
    "{serial_number}/command/fingerprint": {
      "publish": {
        "summary": "Comunicación de huella digital (inicio y respuesta)",
        "description": "Este tópico se utiliza tanto para iniciar la configuración de la huella desde el dispositivo móvil,  como para que el firmware embebido responda con las etapas del proceso. Se usa un único tópico para ambos tipos de mensajes, que se diferencian por su estructura.\n- El cliente móvil envía `config: 1` y `user_id` para iniciar. - El dispositivo embebido responde con `stage`, `status`, `message`.\n",
        "message": {
          "contentType": "application/json",
          "payload": {
            "oneOf": [
              {
                "type": "object",
                "title": "Mensaje de inicio (desde móvil)",
                "required": [
                  "config",
                  "user_id"
                ],
                "properties": {
                  "config": {
                    "type": "integer",
                    "enum": [
                      1
                    ],
                    "description": "Indica el inicio del proceso de registro de huella.",
                    "x-parser-schema-id": "<anonymous-schema-9>"
                  },
                  "user_id": {
                    "type": "string",
                    "description": "Identificador único del usuario.",
                    "x-parser-schema-id": "<anonymous-schema-10>"
                  }
                },
                "x-parser-schema-id": "<anonymous-schema-8>"
              },
              {
                "type": "object",
                "title": "Mensaje de respuesta (desde embebido)",
                "required": [
                  "stage",
                  "status",
                  "message"
                ],
                "properties": {
                  "stage": {
                    "type": "string",
                    "enum": [
                      "put",
                      "remove",
                      "confirm"
                    ],
                    "description": "Etapa del proceso de configuración.",
                    "x-parser-schema-id": "<anonymous-schema-12>"
                  },
                  "status": {
                    "type": "string",
                    "enum": [
                      "waiting",
                      "success",
                      "fail"
                    ],
                    "description": "Estado de la etapa.",
                    "x-parser-schema-id": "<anonymous-schema-13>"
                  },
                  "message": {
                    "type": "string",
                    "description": "Instrucción o mensaje de estado.",
                    "x-parser-schema-id": "<anonymous-schema-14>"
                  }
                },
                "x-parser-schema-id": "<anonymous-schema-11>"
              }
            ],
            "x-parser-schema-id": "<anonymous-schema-7>"
          },
          "x-parser-message-name": "<anonymous-message-3>"
        }
      }
    },
    "{serial_number}/command/alarm": {
      "publish": {
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
                "x-parser-schema-id": "<anonymous-schema-16>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-15>"
          },
          "x-parser-message-name": "<anonymous-message-4>"
        }
      }
    },
    "{serial_number}/command/picture": {
      "publish": {
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
                "x-parser-schema-id": "<anonymous-schema-18>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-17>"
          },
          "x-parser-message-name": "<anonymous-message-5>"
        }
      }
    },
    "{serial_number}/command/change": {
      "publish": {
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
                "x-parser-schema-id": "<anonymous-schema-20>"
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
                "x-parser-schema-id": "<anonymous-schema-21>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-19>"
          },
          "x-parser-message-name": "<anonymous-message-6>"
        }
      }
    },
    "{serial_number}/action/change": {
      "subscribe": {
        "summary": "Avisa la accion de estado de un cajon",
        "description": "Topic ideal para realizar las notificaciones push para avisar al usuario si se abrio su cajon\n",
        "message": {
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "id_drawer",
              "id_user",
              "status"
            ],
            "properties": {
              "id_drawer": {
                "type": "string",
                "description": "Identificador único del cajón cuyo estado cambio.",
                "x-parser-schema-id": "<anonymous-schema-23>"
              },
              "id_user": {
                "type": "string",
                "description": "usuario al que pertenece el cajon.",
                "x-parser-schema-id": "<anonymous-schema-24>"
              },
              "status": {
                "type": "string",
                "enum": [
                  "open",
                  "closed"
                ],
                "description": "Estado actual del cajon.",
                "x-parser-schema-id": "<anonymous-schema-25>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-22>"
          },
          "x-parser-message-name": "<anonymous-message-7>"
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
  