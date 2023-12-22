export type TFolder = {
    id: number
    name: string
    folders: TFolder[]
    files: TFile[]
}

export type TFile = {
    id: number
    name: string
}
