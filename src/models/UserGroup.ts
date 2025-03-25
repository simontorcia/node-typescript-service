export interface UserGroup {
    user_id: number;
    group_id: number;
    joined_at: Date;
}

/** 
Assegnare uno o più gruppi a un utente - POST - /users/:id/groups
Ottenere i gruppi di un utente - GET - /users/:id/groups
Ottenere gli utenti di un gruppo - GET - /groups/:id/users
Rimuovere un utente da un gruppo - DELETE - /users/:id/groups/:groupId
 */