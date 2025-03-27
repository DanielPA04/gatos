import { IBreed } from "./breed.interface"

export interface ICatImg {
    id: string
    url: string
    width: number
    height: number
    breeds?: IBreed[]
  }