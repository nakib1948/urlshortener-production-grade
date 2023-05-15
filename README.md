
# Project Name

urlshortener-production-grade

## Database Schema

The following diagram shows the schema of the project's database:

erDiagram 
USERS{
    integer id PK
    varchar email
    varchar password
}

 URL {
        integer id PK,
        varchar shorturl 
        varchar longurl
        varchar urlexpiration
        integer user_id FK
      }
  ROLES {
        integer id PK
        varchar name 
    }
USER_ROLES {
        integer user_id FK
        integer role_id FK
    }




USERS|o--o{ URL:creates
USER_ROLES||--||ROLES :has
USER_ROLES||--||USERS :has
