# urlshortener-production-grade
erDiagram
    USERS {
        id INTEGER PRIMARY KEY,
        useremail VARCHAR(255) UNIQUE,
        password VARCHAR(255)
    }
    URL {
        id INTEGER PRIMARY KEY,
        shorturl VARCHAR(255) NOT NULL,
        longurl VARCHAR(255) NOT NULL,
        urlexpiration VARCHAR(255),
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES USERS(id)
    }
    ROLES {
        id INTEGER PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL
    }
    USER_ROLES {
        user_id INTEGER NOT NULL REFERENCES USERS (id),
        role_id INTEGER NOT NULL REFERENCES ROLES (id),
        PRIMARY KEY (user_id, role_id)
    }

    USERS ||--o{ URL
    USERS ||--o{ USER_ROLES
    ROLES ||--o{ USER_ROLES
