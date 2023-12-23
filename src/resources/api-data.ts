import { AccessLevel } from '../types'

export type RenderTree = {
    id: string
    name: string
    parentIds: string[]
    children?: RenderTree[]
    access: AccessLevel
}

export const mockApiData: RenderTree = {
    id: '0',
    name: 'Root Folder',
    parentIds: [],
    access: 'write',
    children: [
        {
            id: '1',
            name: 'Folder 1',
            parentIds: ['0'],
            access: 'write',
            children: [
                {
                    id: '2',
                    name: 'Subfolder 1 (Admin)',
                    parentIds: ['0', '1'],
                    access: 'admin',
                    children: [
                        { id: '101', name: 'File 1.1', parentIds: ['0', '1', '2'], access: 'admin', children: [] },
                        { id: '102', name: 'File 1.2', parentIds: ['0', '1', '2'], access: 'admin', children: [] }
                    ]
                },
                { id: '201', name: 'File 1 (Read only)', parentIds: ['0', '1'], access: 'read', children: [] },
                { id: '202', name: 'File 2 (Write)', parentIds: ['0', '1'], access: 'write', children: [] }
            ]
        },
        {
            id: '3',
            name: 'Empty Folder',
            parentIds: ['0'],
            access: 'read',
            children: []
        },
        {
            id: '4',
            name: 'Folder 2',
            parentIds: ['0'],
            access: 'read',
            children: [
                {
                    id: '5',
                    name: 'Subfolder 2',
                    parentIds: ['0', '4'],
                    access: 'read',
                    children: [
                        {
                            id: '6',
                            name: 'Sub-subfolder 2 (Admin)',
                            parentIds: ['0', '4', '5'],
                            access: 'admin',
                            children: [
                                { id: '301', name: 'File 2.1', parentIds: ['0', '4', '5', '6'], access: 'read', children: [] },
                                { id: '302', name: 'File 2.2', parentIds: ['0', '4', '5', '6'], access: 'read', children: [] }
                            ]
                        },
                        { id: '401', name: 'File 3.1', parentIds: ['0', '4', '5'], access: 'read', children: [] },
                        { id: '402', name: 'File 3.2', parentIds: ['0', '4', '5'], access: 'read', children: [] }
                    ]
                },
                { id: '501', name: 'File 4', parentIds: ['0', '4'], access: 'read', children: [] },
                { id: '502', name: 'File 5 (Admin)', parentIds: ['0', '4'], access: 'admin', children: [] } // Only admin can see this file
            ]
        },
        {
            id: '7',
            name: 'Main File',
            parentIds: ['0'],
            access: 'read',
            children: []
        },
        {
            id: '8',
            name: 'Main File 2 (Only Admin can see this)',
            parentIds: ['0'],
            access: 'admin',
            children: []
        }
    ]
}
