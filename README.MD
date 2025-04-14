# 🧱 Monorepo Backend - Node.js + TypeScript

Este repositorio es un **monorepo multipaquete** para practicar desarrollo backend con **Node.js** y **TypeScript**, organizado con [pnpm](https://pnpm.io/) y estructurado para facilitar la escalabilidad y mantenibilidad del código.

Incluye proyectos con arquitectura **MVC (Modelo-Vista-Controlador)** y otros que siguen el patrón **Repository**, útil para separar responsabilidades y promover buenas prácticas de diseño.


## 🧰 Tecnologías principales

| Tecnología     | Descripción                                                                 |
|----------------|------------------------------------------------------------------------------|
| **Node.js**    | Entorno de ejecución para JavaScript en el servidor                         |
| **TypeScript** | Superset de JavaScript que añade tipado estático                            |
| **pnpm**       | Gestor de paquetes rápido y eficiente, usado aquí para manejar el monorepo  |
| **Express**    | Framework minimalista para crear APIs REST con Node.js                      |
| **Zod**        | Librería para validación de esquemas y datos                                |
| **ESLint**     | Herramienta para encontrar y corregir errores de estilo en el código        |
| **Prettier**   | Formateador de código para mantener un estilo consistente                   |
| **Husky**      | Permite ejecutar scripts en hooks de Git, como pre-commits                  |
| **Commitlint** | Enforce convenciones de mensajes de commit (por ejemplo, Conventional Commits) |

---

## 📁 Estructura del monorepo
```bash
aprendiendo-node/
├── packages/
│   ├── arquitectura_mvc/
│   ├── build-api/
│   └── curso_intensivo_node/
    └── fullstack-backend-ts/
    └── primeros_pasos_javascript/
    └── primeros_pasos_node/
    └── prueba-tecnica/
├── pnpm-workspace.yaml   # Configuración del monorepo para pnpm
├── tsconfig.base.json    # Configuración base de TypeScript
└── README.md
```
---

## 🚀 Primeros pasos

### 1. Clonar el repositorio

```bash
git clone https://github.com/enriqueSFranco/aprendiendo_node.git
cd nombre-del-repo
pnpm install
pnpm --filter project_name dev

```
