export type RenderTree = {
    id: string
    name: string
    parentIds: string[]
    children?: readonly RenderTree[]
}

export const mockApiData: RenderTree = {
    id: '0',
    name: 'Root Folder',
    parentIds: [],
    children: [
        {
            id: '1',
            name: 'Folder 1',
            parentIds: ['0'],
            children: [
                {
                    id: '2',
                    name: 'Subfolder 1',
                    parentIds: ['0', '1'],
                    children: [
                        { id: '101', name: 'File 1.1', parentIds: ['0', '1', '2'], children: [] },
                        { id: '102', name: 'File 1.2', parentIds: ['0', '1', '2'], children: [] }
                    ]
                },
                { id: '201', name: 'File 1', parentIds: ['0', '1'], children: [] },
                { id: '202', name: 'File 2', parentIds: ['0', '1'], children: [] }
            ]
        },
        {
            id: '3',
            name: 'Empty Folder',
            parentIds: ['0'],
            children: []
        },
        {
            id: '4',
            name: 'Folder 2',
            parentIds: ['0'],
            children: [
                {
                    id: '5',
                    name: 'Subfolder 2',
                    parentIds: ['0', '4'],
                    children: [
                        {
                            id: '6',
                            name: 'Sub-subfolder 2',
                            parentIds: ['0', '4', '5'],
                            children: [
                                { id: '301', name: 'File 2.1', parentIds: ['0', '4', '5', '6'], children: [] },
                                { id: '302', name: 'File 2.2', parentIds: ['0', '4', '5', '6'], children: [] }
                            ]
                        },
                        { id: '401', name: 'File 3.1', parentIds: ['0', '4', '5'], children: [] },
                        { id: '402', name: 'File 3.2', parentIds: ['0', '4', '5'], children: [] }
                    ]
                },
                { id: '501', name: 'File 4', parentIds: ['0', '4'], children: [] },
                { id: '502', name: 'File 5', parentIds: ['0', '4'], children: [] }
            ]
        },
        {
            id: '7',
            name: 'Main File',
            parentIds: ['0'],
            children: []
        },
        {
            id: '8',
            name: 'Main File 2',
            parentIds: ['0'],
            children: []
        }
    ]
}
