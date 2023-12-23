export const AccessLevels = {
    read: 'read', // user can read
    write: 'write', // user can read
    admin: 'admin' // only admin can read&write
} as const

export type AccessLevel = (typeof AccessLevels)[keyof typeof AccessLevels]
