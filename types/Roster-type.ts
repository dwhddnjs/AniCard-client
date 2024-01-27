import { PlayerTypes } from "./Player-type"

export type SelectedPlayerTypes = Pick<PlayerTypes, "nickname" | "img"> & {
  id: number
  position: string
}

export type RosterTypes = {
  id: number
  title: string
  userId: string
  players: Array<SelectedPlayerTypes>
}
